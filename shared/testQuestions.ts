// Test Questions Data - Shared between TestPage and AdminTestDetails
export const questions = {
  maths: [
    {
      id: "m1",
      question: "What is the value of 2³ × 3²?",
      options: ["72", "54", "36", "18"],
      correct: 0,
      category: "Maths",
    },
    {
      id: "m2",
      question: "If x + 5 = 12, what is the value of x?",
      options: ["5", "7", "12", "17"],
      correct: 1,
      category: "Maths",
    },
    {
      id: "m3",
      question: "What is the square root of 144?",
      options: ["10", "12", "14", "16"],
      correct: 1,
      category: "Maths",
    },
    {
      id: "m4",
      question: "If a triangle has angles of 60°, 60°, and 60°, what type of triangle is it?",
      options: ["Right triangle", "Equilateral triangle", "Isosceles triangle", "Scalene triangle"],
      correct: 1,
      category: "Maths",
    },
    {
      id: "m5",
      question: "What is 15% of 200?",
      options: ["25", "30", "35", "40"],
      correct: 1,
      category: "Maths",
    },
  ],
  english: [
    {
      id: "e1",
      question: "Choose the correct sentence:",
      options: [
        "She don't like pizza.",
        "She doesn't like pizza.",
        "She doesn't likes pizza.",
        "She don't likes pizza.",
      ],
      correct: 1,
      category: "English",
    },
    {
      id: "e2",
      question: "What is the synonym of 'Benevolent'?",
      options: ["Cruel", "Kind", "Angry", "Sad"],
      correct: 1,
      category: "English",
    },
    {
      id: "e3",
      question: "Choose the correct form: 'I have _____ to the store yesterday.'",
      options: ["went", "go", "gone", "going"],
      correct: 0,
      category: "English",
    },
    {
      id: "e4",
      question: "What does 'Procrastinate' mean?",
      options: ["To do immediately", "To delay", "To complete", "To start"],
      correct: 1,
      category: "English",
    },
    {
      id: "e5",
      question: "Identify the error: 'The team are playing well.'",
      options: [
        "No error",
        "'are' should be 'is'",
        "'playing' should be 'play'",
        "'well' should be 'good'",
      ],
      correct: 1,
      category: "English",
    },
  ],
  tech: [
    {
      id: "t1",
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "High-level Text Markup Language",
        "Hyperlink and Text Markup Language",
        "Home Tool Markup Language",
      ],
      correct: 0,
      category: "Tech",
    },
    {
      id: "t2",
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correct: 2,
      category: "Tech",
    },
    {
      id: "t3",
      question: "What is the output of: console.log(2 + '2')?",
      options: ["4", "22", "Error", "undefined"],
      correct: 1,
      category: "Tech",
    },
    {
      id: "t4",
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets",
      ],
      correct: 2,
      category: "Tech",
    },
    {
      id: "t5",
      question: "Which data structure follows LIFO (Last In First Out) principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correct: 1,
      category: "Tech",
    },
  ],
};

// Flatten all questions into a single array for easy lookup
export const allQuestions = [
  ...questions.maths,
  ...questions.english,
  ...questions.tech,
];

// Helper function to get question by ID
export function getQuestionById(questionId: string) {
  return allQuestions.find((q) => q.id === questionId);
}
