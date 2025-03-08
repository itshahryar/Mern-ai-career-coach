"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Uses Google Generative AI to get industry insights in JSON format.
// Extracts useful data like salary ranges, top skills, trends, demand, etc.
// Ensures the AI response is in clean JSON format before returning.
export const generateAIInsights = async (industry) => {

// The prompt in generateAIInsights asks the AI to analyze a given industry and return insights in JSON format. The requested insights include:
// Salary Ranges – Common roles, salary min/max/median, and location.
// Growth Rate – A percentage showing industry growth.
// Demand Level – Whether demand is High, Medium, or Low.
// Top Skills – Important skills for the industry.
// Market Outlook – Whether the industry’s future is Positive, Neutral, or Negative.
// Key Trends – Major trends shaping the industry.
// Recommended Skills – Additional skills useful for the industry.
  const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

  const result = await model.generateContent(prompt); // Generating AI-based content using the prompt.
  const response = result.response; // Getting the AI response.
  const text = response.text(); // Extracting the text output.
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim(); //It removes extra formatting (like ```json) from the AI response to keep only the JSON data.

  return JSON.parse(cleanedText); // Parsing the cleaned JSON string into an object and returning it.
};

export async function getIndustryInsights() {
  const { userId } = await auth(); // Getting the logged-in user's ID. auth() is from Clerk, a user authentication service.
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId }, // Finding the user in the database based on their Clerk ID.
    include: {
      industryInsight: true, // Also fetch their industry insight data (if exists).
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry); // Generate insights based on the user's industry.

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry, // Save the industry name.
        ...insights, // Save the generated insights data.
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight; // Return the newly generated insights.
  }

  return user.industryInsight; // If insights already exist, return the stored insights from the database.
}
