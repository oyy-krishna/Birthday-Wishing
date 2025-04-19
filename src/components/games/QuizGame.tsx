import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const questions: Question[] = [
    {
        id: 1,
        question: "What is my favourate Anime?",
        options: ["Dr. Stone", "Dragon Ball Z", "Naruto", "One Piece"],
        correctAnswer: 0,
        explanation: "Yeah, My favourate anime is Dr. Stone because i love science and exploring"
    },
    {
        id: 2,
        question: "What's my favourate time-pass?",
        options: ["Anime", "Web-series", "Sleeping", "Reading"],
        correctAnswer: 2,
        explanation: "HeHeHe... I am a sleeping sloth"
    },
    {
        id: 3,
        question: "What's my favourate season?",
        options: ["Winter", "Summer", "Autumn", "Spring"],
        correctAnswer: 0,
        explanation: "I love Winter because it's so calmness when the temperature is cool"
    },
    {
        id: 4,
        question: "What is My favorite hobby?",
        options: ["Reading", "Gyming", "Painting", "Coding"],
        correctAnswer: 1,
        explanation: "I am a total gym freak 😭"
    }
];

export default function QuizGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleAnswer = (optionIndex: number) => {
        setSelectedAnswer(optionIndex);
        setShowExplanation(true);

        if (optionIndex === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowExplanation(false);
            } else {
                setShowResult(true);
            }
        }, 2000);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setShowExplanation(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {!showResult ? (
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-lg shadow-lg p-6"
                >
                    <div className="mb-4">
                        <span className="text-gray-500">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {questions[currentQuestion].question}
                    </h2>
                    <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                            <motion.button
                                key={index}
                                className={`w-full p-4 rounded-lg text-left transition-colors
                                    ${selectedAnswer === null
                                        ? 'bg-gray-100 hover:bg-gray-200'
                                        : index === questions[currentQuestion].correctAnswer
                                            ? 'bg-green-100'
                                            : selectedAnswer === index
                                                ? 'bg-red-100'
                                                : 'bg-gray-100'
                                    }`}
                                onClick={() => handleAnswer(index)}
                                disabled={selectedAnswer !== null}
                                whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                                whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                            >
                                {option}
                            </motion.button>
                        ))}
                    </div>
                    {showExplanation && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-blue-50 rounded-lg"
                        >
                            <p className="text-blue-800">
                                {questions[currentQuestion].explanation}
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-white rounded-lg shadow-lg p-8"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Quiz Complete! 🎉
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                        Your score: {score} out of {questions.length}
                    </p>
                    <p className="text-lg text-gray-700 mb-8">
                        {score === questions.length
                            ? "Perfect score! You know Jane very well! 🎯"
                            : score >= questions.length / 2
                                ? "Great job! You know Jane pretty well! 😊"
                                : "Keep learning about Jane! There's always more to discover! 🌟"}
                    </p>
                    <button
                        onClick={restartQuiz}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                               transition-colors transform hover:scale-105 active:scale-95"
                    >
                        Play Again
                    </button>
                </motion.div>
            )}
        </div>
    );
} 