'use client'
import React, { useState, KeyboardEvent } from "react";
import dynamic from 'next/dynamic';


// const LottieAnimation = dynamic(() => import("@/app/Components/LottieAnimation"), {
//   ssr: false, // disables server-side rendering for this component
// });

// import ParticleBackground from "@/app/Components/Particles";
const ParticleBackground = dynamic(() => import("@/app/_components/Particles"), {
  ssr: false, // disables server-side rendering for this component
});
const LottieAnimation = dynamic(() => import("@/app/_components/LottieAnimation"), {
  ssr: false, // disables server-side rendering for this component
});



// Question definition
type QuestionType = "input" | "multiple-choice";

interface Question {
  id: string;
  prompt: string;
  type: QuestionType;
  options?: string[];
}

// Practice questions
const practiceQuestions: Question[] = [
  { id: "p1", prompt: "What is 2 + 2?", type: "input" },
  {
    id: "p2",
    prompt: "Select the primary color:",
    type: "multiple-choice",
    options: ["Red", "Green", "Black"],
  },
  { id: "p3", prompt: "Solve for x: 3x = 12", type: "input" },
];

// Reflection prompts (3 dots section)
const reflectionPrompts: Question[] = [
  { id: "r1", prompt: "How did you approach the first problem?", type: "input" },
  { id: "r2", prompt: "What did you learn from the color question?", type: "input" },
  { id: "r3", prompt: "Any questions about today’s lesson?", type: "input" },
];

// Combined sequence
const allQuestions = [...practiceQuestions, ...reflectionPrompts];
const practiceCount = practiceQuestions.length;
const totalCount = allQuestions.length;

// Progress bar component
interface ProgressBarProps {
  current: number;
  total: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div className="h-full bg-blue-500 transition-width duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
};

// Three dots indicator
const ThreeDots: React.FC = () => (
  <div className="flex items-center justify-center gap-1 mt-2">
    {[1, 2, 3].map((n) => (
      <span key={n} className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
    ))}
  </div>
);

// Question card
interface QuestionCardProps {
  question: Question;
  onAnswer: (ans: string) => void;
}


const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => (
  <div className="p-4 text-black bg-white rounded-2xl shadow-md">
    <p className="font-medium mb-3">{question.prompt}</p>

    {question.type === "input" ? (
      <>
        <input
          type="text"
          className="border text-black border-gray-300 rounded p-2 w-full focus:outline-none"
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              onAnswer((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
        {/* <Image src="https://user-images.githubusercontent.com/placeholder/icon_only_nav.png" alt="pill nav sketch" width={400} height={400} /> */}
      </>

    ) : (
      <div className="flex flex-col gap-2">
        {question.options?.map((opt) => (
          <button
            key={opt}
            className="py-2 px-4 bg-blue-100 rounded hover:bg-blue-200"
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    )}
  </div>
);














// Main lesson flow component
const LessonFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    const q = allQuestions[currentStep];
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    if (currentStep < totalCount - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Lesson complete: handle final submission or redirect
      console.log("Lesson complete", answers);
    }
  };

  const currentQuestion = allQuestions[currentStep];
  const showingPracticeProgress = Math.min(currentStep, practiceCount);







  return (
    <>
      <div className="absolute -z-10 w-screen h-screen left-0 top-0">
        <img src="../grid.svg" alt="eheh" className="w-screen h-screen " />
      </div>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white w-screen h-screen">
        {/* Progress Bar + Dots */}


        {/* <LottieAnimation /> */}
        {/* <ParticleBackground /> */}



        {/* <div className="container">
          weifweoihfwuhegihiwehgi 
          <div className="light">sdvsdg</div>
        </div> */}



        <ProgressBar current={showingPracticeProgress} total={practiceCount} />
        <ThreeDots />

        {/* Single Question View */}
        <div className="mt-6">
          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
        </div>
      </div>
    </>
  );
};

export default LessonFlow;