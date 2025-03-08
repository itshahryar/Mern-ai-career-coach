"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

// 1. Fetches quiz questions when the user starts the quiz.
// 2. Tracks the user's answers and stores them in answers state.
// 3. Allows users to move through questions using "Next Question" and "Show Explanation".
// 4. Calculates score at the end and saves it using saveQuizResultFn.
// 5. Handles loading states (while generating or saving the quiz).
// 6. Shows quiz results at the end and lets users start a new quiz.

export default function Quiz() {
    // State to track current question number
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // State to store selected answers
  const [answers, setAnswers] = useState([]);
   // State to show/hide explanation
  const [showExplanation, setShowExplanation] = useState(false);

  // Fetch quiz data when starting quiz
  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  // Save quiz result when completed
  const {
    loading: savingResult,
    fn: saveassesmentsFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  // When quizData is received, create an empty answer array
  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  // Handle user selecting an answer
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  // Move to next question or finish quiz
  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false); // Hide explanation when moving to next question
    } else {
      finishQuiz(); // Finish quiz when all questions are answered
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100; // Score in percentage
  };

  // Save quiz results
  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveassesmentsFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  // Start a new quiz
  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  // Show loading bar while quiz is generating
  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  // Show results if quiz is completed
  // If quiz is finished, show result component
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  // If no quiz data, show start button
  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Get current question data
  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-2"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>

           {/* Show explanation when user clicks "Show Explanation" */}
        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Show Explanation button (disabled if no answer selected) */}
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}
         {/* Next or Finish button */}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {savingResult && (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
          )}
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
