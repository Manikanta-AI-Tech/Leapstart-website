import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, CheckCircle2, Clock } from "lucide-react";
import { questions } from "@shared/testQuestions";

type Answer = {
  questionId: string;
  selectedOption: number;
};

export default function TestPage() {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [testDetails, setTestDetails] = useState<any>(null);
  const [testSubmitted, setTestSubmitted] = useState(false);

  useEffect(() => {
    // Get test details from sessionStorage
    const details = sessionStorage.getItem("testDetails");
    if (!details) {
      // Redirect to form if no details
      setLocation("/test-details");
      return;
    }
    setTestDetails(JSON.parse(details));
  }, [setLocation]);

  // Flatten all questions into a single array with category
  const allQuestions = [
    ...questions.maths.map((q) => ({ ...q, category: "Maths" })),
    ...questions.english.map((q) => ({ ...q, category: "English" })),
    ...questions.tech.map((q) => ({ ...q, category: "Tech" })),
  ];

  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;

  const handleAnswer = (optionIndex: number) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: optionIndex,
    };

    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (a) => a.questionId === currentQuestion.id
    );

    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!testDetails || testSubmitted) return; // Prevent duplicate submissions
    
    // Get userId from sessionStorage
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("User information not found. Please complete the form again.");
      setLocation("/test-details");
      return;
    }
    
    setTestSubmitted(true); // Set immediately to prevent multiple clicks
    
    // Calculate score
    let correctAnswers = 0;
    allQuestions.forEach((q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      if (answer && answer.selectedOption === q.correct) {
        correctAnswers++;
      }
    });
    const score = `${correctAnswers}/${totalQuestions}`;

    try {
      // Save test details with userId
      const response = await fetch("/api/test-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(userId, 10),
          answers: answers,
          score: score,
        }),
      });

      if (response.ok) {
        // Store answers in sessionStorage as backup
        sessionStorage.setItem("testAnswers", JSON.stringify(answers));
        setShowResultDialog(true);
      } else {
        const errorData = await response.json().catch(() => ({ message: "Failed to save test details" }));
        console.error("Failed to save test details:", errorData);
        const errorMessage = errorData.message || "Failed to save test details. Please try again.";
        alert(`Error: ${errorMessage}`);
        
        // If test already submitted, redirect to home
        if (response.status === 409) {
          setTimeout(() => setLocation("/"), 2000);
        } else {
          setTestSubmitted(false); // Allow retry for other errors
        }
      }
    } catch (error) {
      console.error("Error saving test details:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Failed to save test details. Please try again."}`);
      setTestSubmitted(false); // Allow retry
    }
  };

  const handleCallTeam = () => {
    window.location.href = "tel:+918328409387";
  };

  const getSelectedAnswer = () => {
    const answer = answers.find((a) => a.questionId === currentQuestion.id);
    return answer?.selectedOption ?? null;
  };

  const isAnswered = (questionId: string) => {
    return answers.some((a) => a.questionId === questionId);
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Test Instructions
                </h1>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Total Questions</h3>
                    <p className="text-slate-600">You will answer 15 questions: 5 Maths, 5 English, and 5 Tech MCQs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Time Limit</h3>
                    <p className="text-slate-600">Take your time to answer each question carefully</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Navigation</h3>
                    <p className="text-slate-600">You can navigate between questions using Previous/Next buttons</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Submission</h3>
                    <p className="text-slate-600">Review all answers before submitting. Once submitted, you cannot change your answers.</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setShowInstructions(false)}
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white"
              >
                Start Test
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="min-h-screen px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-sm font-medium text-slate-400">
                {currentQuestion.category}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200 mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = getSelectedAnswer() === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 text-slate-900"
                        : "border-slate-200 hover:border-primary/50 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-slate-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="flex-1 h-12"
            >
              Previous
            </Button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button
                onClick={handleNext}
                className="flex-1 h-12 bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={testSubmitted}
                className="flex-1 h-12 bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                {testSubmitted ? "Submitting..." : "Submit Test"}
              </Button>
            )}
          </div>

          {/* Question Navigation Dots */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {allQuestions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  index === currentQuestionIndex
                    ? "border-primary bg-primary text-white"
                    : isAnswered(q.id)
                    ? "border-green-500 bg-green-500/20 text-green-700"
                    : "border-slate-300 text-slate-600 hover:border-primary/50"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Result Dialog */}
      <Dialog 
        open={showResultDialog} 
        onOpenChange={(open) => {
          if (!open) {
            // When dialog is closed (X button or outside click), navigate to home
            setShowResultDialog(false);
            setTimeout(() => {
              setLocation("/");
            }, 300);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-4">
              Test Submitted Successfully! ✅
            </DialogTitle>
            <DialogDescription className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg text-slate-700 mb-2 font-semibold">
                We will share your results shortly.
              </p>
              <p className="text-slate-600 mb-6">
                Our team will review your test and get back to you soon.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleCallTeam}
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to Our Team
                </Button>
                <Button
                  onClick={() => {
                    setShowResultDialog(false);
                    setTimeout(() => setLocation("/"), 300);
                  }}
                  variant="outline"
                  className="w-full h-12 text-lg font-semibold"
                >
                  Go to Home
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}
