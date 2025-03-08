"use server";

// @@@@ WRITE API'S @@@@

// This code handles user profile updates and onboarding
// status in a Next.js app using Prisma and Clerk for authentication.

// 💡 Key Points:
// Transactions (db.$transaction()) → Ensures both user update & industry creation succeed together.
// AI Insights (generateAIInsights()) → Generates industry insights if they don’t exist.
// Authentication (auth()) → Fetches the logged-in user from Clerk.
// Caching (revalidatePath("/")) → Refreshes page data after an update.
// Onboarding Check (getUserOnboardingStatus()) → Determines if a user has set their industry.

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

// Function to update user profile and industry insights
export async function updateUser(data) {
  const { userId } = await auth();    // Get logged-in user ID
  if (!userId) throw new Error("Unauthorized");   // If no user, throw an error

  // Find the user in the database using Clerk's user ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");   // If user doesn't exist, throw an error

  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,    // Search industry based on user input
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          // Create a new industry insight in the database
          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry, // Save
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next update in 7 days
            },
          });
        }

        // Update the user's profile with new data
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight }; // Return updated user and industry details
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    revalidatePath("/"); // Refresh the page cache so updates reflect immediately
    return result.user;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

// Function to check if a user has completed onboarding
export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Find the user in the database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Check if the user has set an industry
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,  // Find user by Clerk ID
      },
      select: {
        industry: true,   // Only fetch the industry field
      },
    });

    return {
      isOnboarded: !!user?.industry,  // Convert industry value to boolean (true if exists, false otherwise)
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
