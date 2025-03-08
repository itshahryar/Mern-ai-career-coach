// Enable "use server" directive for server-side execution.
"use server";

// Import the Prisma database instance for database operations.
import { db } from "@/lib/prisma";

// Import authentication functions from Clerk to manage user authentication.
import { auth } from "@clerk/nextjs/server";

// Import Google Generative AI SDK to interact with the Gemini AI model.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI instance using the API key stored in environment variables.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get a specific AI model from Google Generative AI (Gemini 1.5 Flash).
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Function to generate a professional cover letter using AI.
 * @param {Object} data - Contains jobTitle, companyName, and jobDescription.
 * @returns {Object} - Generated cover letter stored in the database.
 */
export async function generateCoverLetter(data) {
  // Authenticate the user and get their user ID.
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized"); // If no user is authenticated, throw an error.

  // Fetch user details from the database using the Clerk user ID.
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found"); // If the user does not exist in the database, throw an error.

  // Define the AI prompt with dynamic values from the user and job data.
  const prompt = `
    Write a professional cover letter for a ${data.jobTitle} position at ${
    data.companyName
  }.
    
    About the candidate:
    - Industry: ${user.industry}
    - Years of Experience: ${user.experience}
    - Skills: ${user.skills?.join(", ")}
    - Professional Background: ${user.bio}
    
    Job Description:
    ${data.jobDescription}
    
    Requirements:
    1. Use a professional, enthusiastic tone
    2. Highlight relevant skills and experience
    3. Show understanding of the company's needs
    4. Keep it concise (max 400 words)
    5. Use proper business letter formatting in markdown
    6. Include specific examples of achievements
    7. Relate candidate's background to job requirements
    
    Format the letter in markdown.
  `;

  try {
    // Send the prompt to the AI model and generate the cover letter content.
    const result = await model.generateContent(prompt);
    
    // Extract and trim the AI-generated text response.
    const content = result.response.text().trim();

    // Store the generated cover letter in the database.
    const coverLetter = await db.coverLetter.create({
      data: {
        content, // Store AI-generated content
        jobDescription: data.jobDescription, // Store job description
        companyName: data.companyName, // Store company name
        jobTitle: data.jobTitle, // Store job title
        status: "completed", // Mark status as completed
        userId: user.id, // Link the cover letter to the user
      },
    });

    return coverLetter; // Return the newly created cover letter object.
  } catch (error) {
    console.error("Error generating cover letter:", error.message); // Log any errors.
    throw new Error("Failed to generate cover letter"); // Throw an error if AI generation fails.
  }
}

/**
 * Function to fetch all cover letters of the authenticated user.
 * @returns {Array} - List of cover letters.
 */
export async function getCoverLetters() {
  // Authenticate the user and get their user ID.
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized"); // If no user is authenticated, throw an error.

  // Fetch user details from the database.
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found"); // If the user does not exist, throw an error.

  // Retrieve all cover letters linked to the authenticated user, sorted by creation date (newest first).
  return await db.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Function to retrieve a single cover letter by ID.
 * @param {string} id - Cover letter ID.
 * @returns {Object} - The requested cover letter.
 */
export async function getCoverLetter(id) {
  // Authenticate the user.
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized"); // If no user is authenticated, throw an error.

  // Fetch user details from the database.
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found"); // If the user does not exist, throw an error.

  // Retrieve the cover letter by ID and ensure it belongs to the authenticated user.
  return await db.coverLetter.findUnique({
    where: {
      id, // Find by cover letter ID
      userId: user.id, // Ensure it belongs to the user
    },
  });
}

/**
 * Function to delete a specific cover letter.
 * @param {string} id - Cover letter ID.
 * @returns {Object} - Deleted cover letter.
 */
export async function deleteCoverLetter(id) {
  // Authenticate the user.
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized"); // If no user is authenticated, throw an error.

  // Fetch user details from the database.
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found"); // If the user does not exist, throw an error.

  // Delete the cover letter by ID, ensuring it belongs to the authenticated user.
  return await db.coverLetter.delete({
    where: {
      id, // Find by cover letter ID
      userId: user.id, // Ensure it belongs to the user
    },
  });
}

