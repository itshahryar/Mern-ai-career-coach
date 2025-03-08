import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Displays ***3*** key quiz statistics/boxes: and ***3*** functions for calcualtions for:
// i. Average Score (Trophy Icon)
// ii. Total Questions Practiced (Brain Icon)
// iii. Latest Quiz Score (Target Icon)

// assessments is a prop (property) passed to the StatsCards component from a parent component.
export default function StatsCards({ assessments }) {

  const getAverageScore = () => {
    if (!assessments?.length) return 0; // Return 0 (Used when the function's result is expected to be a number.)
    // if there are no assessments.
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    ); // Summing up all quiz scores.
    return (total / assessments.length).toFixed(1); // average
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null; // Return null (return null; → Use when no valid data exists (e.g., latest assessment is missing))
    // if no assessments exist.
    return assessments[0]; // Return the first (most recent) assessment.
  };

    // Calculates the total number of questions answered across all assessments.
  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    ); // Summing up all questions from each assessment.
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getAverageScore()}%</div>
          <p className="text-xs text-muted-foreground">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Practiced
          </CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getTotalQuestions()}</div>
          <p className="text-xs text-muted-foreground">Total questions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-muted-foreground">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}