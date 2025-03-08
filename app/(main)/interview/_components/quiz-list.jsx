"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";

// 1. Renders a list of past quizzes (assessments).
// 2. Each quiz card is clickable—when clicked, it opens a modal (Dialog) with detailed quiz results.
// 3. Uses format from date-fns to format timestamps in MMMM dd, yyyy HH:mm format.
// 4. Displays improvement tips if available.
// 5. Users can start a new quiz by clicking the "Start New Quiz" button.
// *****Uses useState to track the selected quiz and show the modal.

export default function QuizList({ assessments }) {
  const router = useRouter(); // Router instance for navigation.
  const [selectedQuiz, setSelectedQuiz] = useState(null); // State to store the selected quiz for modal display.

  return (
    <>
    {/* Main Card Wrapper */}
      <Card>
         {/* Header Section with Title and "Start New Quiz" Button */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl"> {/* Title of the section */}
                Recent Quizzes
              </CardTitle>
              <CardDescription> {/* Subtitle */}
                Review your past quiz performance
              </CardDescription>
            </div>
            {/* Button to start a new quiz, redirects user to the quiz page */}
            <Button onClick={() => router.push("/interview/mock")}>
              Start New Quiz
            </Button>
          </div>
        </CardHeader>

        {/* Quiz List Section */}
        <CardContent>
          <div className="space-y-4">
            {/* Looping through the quizzes and displaying each as a Card */}
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id} // Unique key for each quiz.
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedQuiz(assessment)} // Open modal on click.
              >
                <CardHeader>
                    {/* Display quiz number dynamically */}
                  <CardTitle className="gradient-title text-2xl">
                    Quiz {i + 1}
                  </CardTitle>

                  {/* Display the quiz score */}
                  <CardDescription className="flex justify-between w-full">
                    <div>Score: {assessment.quizScore.toFixed(1)}%</div>

                    {/* Formatting the quiz completion date */}
                    <div>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>

                </CardHeader>

                {/* Display improvement tip if available */}
                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

       {/* Modal (Dialog) to Show Detailed Quiz Result */}
      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          {/* Display quiz results ******COMPONENT****** inside modal */}
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")} // Clicking "Start New Quiz" in the modal redirects to quiz page.
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

