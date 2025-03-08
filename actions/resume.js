"use server"; // Ensures functions run only on the backend.

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache"; // Import cache revalidation for updating data

// Initialize Google Gemini AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to save or update the user's resume
export async function saveResume(content) {
  const { userId } = await auth(); // Get logged-in user's ID
  if (!userId) throw new Error("Unauthorized"); // If no user, stop execution

  // Find user in the database using Clerk ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Save or update resume in the database
  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,    // Check if resume exists for this user
      },
      update: {
        content,    // Update resume content if it exists
      },
      create: {
        userId: user.id,        // Create a new resume if none exists
        content,
      },
    });

    revalidatePath("/resume");      // Clear the cache to update the UI
    return resume;                  // Return saved resume
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

// Function to get the user's resume
export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

    // Fetch and return the resume for the user
  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

// Function to improve resume content using AI
export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Find user in the database and include industry insight
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // Create an AI prompt to improve the resume
  // current represents the existing resume content that the user wants to improve.
  // type refers to the section of the resume being improved (e.g., "Work Experience", "Skills", "Education").
  // It helps the AI understand what part of the resume it needs to enhance.
  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    // Generate improved content using AI
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}
