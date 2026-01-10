import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Download, Database, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { allQuestions, getQuestionById } from "@shared/testQuestions";

type TestDetail = {
  id: number;
  userId: number;
  answers: any;
  score: string | null;
  createdAt: string;
  user: {
    id: number;
    name: string;
    parentName: string;
    collegeName: string;
    mobileNumber: string;
    email: string;
    createdAt: string;
  };
};

export default function AdminTestDetails() {
  const [tests, setTests] = useState<TestDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/test-details");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to fetch test details" }));
        throw new Error(errorData.message || `Failed to fetch test details (${response.status})`);
      }
      const data = await response.json();
      setTests(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching test details";
      setError(errorMessage);
      console.error("Error fetching tests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Parent Name", "College", "Mobile", "Email", "Score", "Date"];
    const rows = tests.map((test) => [
      test.id,
      test.user.name,
      test.user.parentName,
      test.user.collegeName,
      test.user.mobileNumber,
      test.user.email,
      test.score || "N/A",
      new Date(test.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `test-details-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Test Details Admin
              </h1>
              <p className="text-slate-400">
                View all test submissions and user details
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={fetchTests}
                variant="outline"
                disabled={loading}
                className="border-white/10 text-white hover:bg-white/5"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={exportToCSV}
                variant="outline"
                disabled={tests.length === 0}
                className="border-white/10 text-white hover:bg-white/5"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
            <p className="text-slate-400">Loading test details...</p>
          </div>
        ) : tests.length === 0 ? (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Database className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                <p className="text-slate-400">No test submissions found</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-slate-800 border-slate-700 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white mb-1">{test.user.name}</CardTitle>
                        <CardDescription className="text-slate-400">
                          Submitted: {new Date(test.createdAt).toLocaleString()}
                        </CardDescription>
                      </div>
                      {test.score && (
                        <div className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-bold">
                          Score: {test.score}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Parent Name</p>
                        <p className="text-white font-medium">{test.user.parentName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 mb-1">College</p>
                        <p className="text-white font-medium">{test.user.collegeName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Mobile</p>
                        <p className="text-white font-medium">
                          <a href={`tel:${test.user.mobileNumber}`} className="hover:text-primary">
                            {test.user.mobileNumber}
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Email</p>
                        <p className="text-white font-medium">
                          <a href={`mailto:${test.user.email}`} className="hover:text-primary">
                            {test.user.email}
                          </a>
                        </p>
                      </div>
                    </div>
                    {test.answers && Array.isArray(test.answers) && test.answers.length > 0 && (
                      <details className="mt-4">
                        <summary className="cursor-pointer text-sm font-medium text-slate-300 hover:text-primary flex items-center gap-2 py-2">
                          <span>📋 View Test Answers</span>
                          <span className="text-xs text-slate-500">({test.answers.length} questions answered)</span>
                        </summary>
                        <div className="mt-4 p-5 bg-slate-900 rounded-lg space-y-4 max-h-96 overflow-y-auto">
                          {test.answers.map((answer: any, idx: number) => {
                            const question = getQuestionById(answer.questionId);
                            const questionNumber = idx + 1;
                            const selectedOptionIndex = answer.selectedOption;
                            const isCorrect = question && selectedOptionIndex === question.correct;
                            
                            return (
                              <div key={answer.questionId || idx} className="border border-slate-700 rounded-lg p-4 bg-slate-800/50">
                                <div className="flex items-start gap-3 mb-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                                    isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                  }`}>
                                    {questionNumber}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                                        {question?.category || 'Unknown'}
                                      </span>
                                      {isCorrect ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <XCircle className="w-4 h-4 text-red-400" />
                                      )}
                                    </div>
                                    <p className="text-white font-medium mb-2">
                                      {question?.question || `Question ID: ${answer.questionId}`}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="ml-11 space-y-2">
                                  {question?.options.map((option: string, optIdx: number) => {
                                    const isSelected = optIdx === selectedOptionIndex;
                                    const isCorrectAnswer = optIdx === question.correct;
                                    
                                    return (
                                      <div
                                        key={optIdx}
                                        className={`p-2 rounded text-sm ${
                                          isCorrectAnswer
                                            ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                                            : isSelected
                                            ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                                            : 'bg-slate-700/50 text-slate-400'
                                        }`}
                                      >
                                        <span className="font-medium">
                                          {String.fromCharCode(65 + optIdx)}. {option}
                                        </span>
                                        {isCorrectAnswer && (
                                          <span className="ml-2 text-xs text-green-400">✓ Correct Answer</span>
                                        )}
                                        {isSelected && !isCorrectAnswer && (
                                          <span className="ml-2 text-xs text-red-400">✗ Selected</span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </details>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-slate-400 text-sm">
          Total Submissions: <span className="text-primary font-bold">{tests.length}</span>
        </div>
      </section>
    </div>
  );
}
