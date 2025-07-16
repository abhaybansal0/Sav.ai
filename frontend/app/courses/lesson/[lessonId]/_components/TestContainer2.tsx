'use client'
import { CheckCircle, Trophy, XCircle, Zap, Flame, Clock, Rocket, Star } from 'lucide-react'
import React from 'react'
import { useState, useEffect } from 'react'

interface Props {
    questions: {
        questionText: string,
        answerOptions: {
            optionId: string,
            optionText: string,
        }[],
        correctAnswers: string[],
        explanation: string,
        xpPoint: number
    }[],

    revisionCard: string[],

    unitInfo: {
        standard: number,
        chapter: string,
        concept: string,
    }
}

const TestContainer2 = ({ questions, revisionCard, unitInfo }: Props) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [isAnswered, setIsAnswered] = useState(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>()
    const [startTime, setStartTime] = useState<number | null>(null);
    const [streak, setStreak] = useState(0)
    const [score, setScore] = useState(0)
    const [timeSpent, setTimeSpent] = useState(0);

    const currentQ = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;
    const progress = ((currentQuestion + (isAnswered ? 1 : 0)) / questions.length) * 100;

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [startTime]);

    useEffect(() => {
        setStartTime(Date.now());
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (optionId: string) => {
        if (isAnswered) return;

        if (selectedAnswers.includes(optionId)) {
            setSelectedAnswers(selectedAnswers.filter(id => id !== optionId));
        } else {
            setSelectedAnswers([...selectedAnswers, optionId]);
        }
    }

    const handleSubmitAnswer = () => {
        if (selectedAnswers.length === 0) return;

        const correct = selectedAnswers.every(ans => currentQ.correctAnswers.includes(ans)) &&
            currentQ.correctAnswers.length === selectedAnswers.length;

        setIsCorrect(correct);
        setIsAnswered(true);

        if (correct) {
            setScore(score + currentQ.xpPoint);
            setStreak(streak + 1);
        } else {
            setStreak(0);
        }
    }

    const handleNextQuestion = () => {
        if (isLastQuestion) {
            // Lesson complete
            setStartTime(timeSpent)
            return;
        }

        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswers([]);
        setIsAnswered(false);
        setIsCorrect(null);
    }

    // Completion Screen
    if (isLastQuestion && isAnswered) {
        const percentage = Math.round((score / questions.reduce((acc, q) => acc + q.xpPoint, 0)) * 100);

        return (
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="relative rounded-3xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                        
                        {/* Floating stars */}
                        {[...Array(20)].map((_, i) => (
                            <Star
                                key={i}
                                className="absolute text-white/20 animate-pulse"
                                size={Math.random() * 10 + 5}
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 p-12">
                        {/* Trophy with orbital animation */}
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl shadow-orange-500/50">
                                    <Trophy className="w-20 h-20 text-white" />
                                </div>
                            </div>
                            {/* Orbital ring */}
                            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
                            </div>
                        </div>

                        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Mission Complete!
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12">
                            {unitInfo.concept} • Class {unitInfo.standard}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                                <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10">
                                    <Zap className="w-8 h-8 text-green-400 mb-2" />
                                    <div className="text-3xl font-bold text-green-400 mb-1">{score}</div>
                                    <div className="text-gray-600 dark:text-gray-400">XP Earned</div>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                                <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10">
                                    <Rocket className="w-8 h-8 text-blue-400 mb-2" />
                                    <div className="text-3xl font-bold text-blue-400 mb-1">{percentage}%</div>
                                    <div className="text-gray-600 dark:text-gray-400">Accuracy</div>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                                <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10">
                                    <Clock className="w-8 h-8 text-purple-400 mb-2" />
                                    <div className="text-3xl font-bold text-purple-400 mb-1">{formatTime(timeSpent)}</div>
                                    <div className="text-gray-600 dark:text-gray-400">Time Taken</div>
                                </div>
                            </div>
                        </div>

                        {/* Key Takeaways */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Key Insights from Your Journey
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {revisionCard.map((card, index) => (
                                    <div 
                                        key={index} 
                                        className="relative group"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all" />
                                        <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 dark:border-white/10 hover:border-white/20 transition-all">
                                            <p className="text-gray-700 dark:text-gray-200">{card}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Continue Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => window.history.back()}
                                className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-600 transition-all" />
                                <div className="relative flex items-center gap-2">
                                    <span>Continue Your Journey</span>
                                    <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Main Quiz Interface
    return (
        <div className='w-full min-h-screen px-4 md:px-8 lg:px-16 pb-12'>
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>{unitInfo.chapter}</h1>
                        <span className='text-gray-600 dark:text-gray-400'>Class {unitInfo.standard} • {unitInfo.concept}</span>
                    </div>
                    <div className='flex items-center gap-6'>
                        {/* Timer */}
                                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className='text-gray-700 dark:text-gray-300 font-medium'>{formatTime(timeSpent)}</span>
                        </div>
                        {/* Score */}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className='text-gray-700 dark:text-gray-300 font-medium'>{score} XP</span>
                        </div>
                        {/* Streak */}
                        {streak > 0 && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <span className='text-orange-500 font-medium'>{streak} streak!</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Section */}
                <div className="mb-8">
                    <div className='flex items-center justify-between mb-2'>
                        <span className='text-gray-600 dark:text-gray-400 text-sm'>
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className='text-gray-600 dark:text-gray-400 text-sm'>{Math.round(progress)}% Complete</span>
                    </div>

                    <div className="relative h-3 bg-gray-200 dark:bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-700 ease-out`}
                            style={{ width: `${progress}%` }}
                        />
                        {/* Glowing effect at the end */}
                        <div
                            className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent to-white/30 blur-xl transition-all duration-700"
                            style={{ left: `calc(${progress}% - 2rem)` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question Component */}
            <div className='max-w-4xl mx-auto'>
                <div className="relative rounded-3xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10 p-8 md:p-10">
                        {/* Question Header */}
                        <div className='flex items-center justify-between mb-6'>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                                    <span className='text-gray-300 font-semibold'>{currentQuestion + 1}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className='text-yellow-500 font-medium'>{currentQ.xpPoint} XP</span>
                                </div>
                            </div>
                        </div>

                        {/* Question Text */}
                        <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 leading-relaxed'>
                            {currentQ.questionText}
                        </h2>

                        {/* Answer Options */}
                        <div className="space-y-4">
                            {currentQ.answerOptions.map((option) => {
                                const isSelected = selectedAnswers.includes(option.optionId)
                                const isCorrectAnswer = currentQ.correctAnswers.includes(option.optionId)

                                let optionClasses = "relative group w-full p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ";
                                let iconClasses = "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ";

                                if (isAnswered) {
                                    if (isCorrectAnswer) {
                                        optionClasses += "border-green-500/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10 ";
                                        iconClasses += "bg-gradient-to-br from-green-500 to-emerald-500 text-white ";
                                    } else if (isSelected && !isCorrectAnswer) {
                                        optionClasses += "border-red-500/50 bg-gradient-to-r from-red-500/10 to-pink-500/10 ";
                                        iconClasses += "bg-gradient-to-br from-red-500 to-pink-500 text-white ";
                                    } else {
                                        optionClasses += "border-gray-200 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/30 opacity-60 ";
                                        iconClasses += "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 ";
                                    }
                                } else {
                                    if (isSelected) {
                                        optionClasses += "border-blue-500/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform scale-[1.02] ";
                                        iconClasses += "bg-gradient-to-br from-blue-500 to-purple-500 text-white ";
                                    } else {
                                        optionClasses += "border-gray-200 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/30 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 ";
                                        iconClasses += "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 ";
                                    }
                                }

                                return (
                                    <button
                                        key={option.optionId}
                                        className={optionClasses}
                                        onClick={() => handleAnswerSelect(option.optionId)}
                                        disabled={isAnswered}
                                    >
                                        {/* Hover glow effect */}
                                        {!isAnswered && (
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                                        )}
                                        
                                        <div className="relative flex items-center gap-4">
                                            <div className={iconClasses}>
                                                {option.optionId}
                                            </div>
                                            <span className="text-left text-gray-700 dark:text-gray-200 text-lg flex-1">{option.optionText}</span>
                                            {isAnswered && isCorrectAnswer && (
                                                <CheckCircle className="w-6 h-6 text-green-500" />
                                            )}
                                            {isAnswered && isSelected && !isCorrectAnswer && (
                                                <XCircle className="w-6 h-6 text-red-500" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation Section */}
                        {isAnswered && (
                            <div className={`mt-8 p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 ${
                                isCorrect 
                                    ? 'border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10' 
                                    : 'border-red-500/30 bg-gradient-to-br from-red-500/10 to-pink-500/10'
                            }`}>
                                <div className="flex items-center gap-3 mb-4">
                                    {isCorrect ? (
                                        <>
                                            <div className="p-2 rounded-full bg-green-500/20">
                                                <CheckCircle className="w-8 h-8 text-green-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-green-500">
                                                Excellent! 
                                            </h3>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-2 rounded-full bg-red-500/20">
                                                <XCircle className="w-8 h-8 text-red-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-red-500">
                                                Not quite right
                                            </h3>
                                        </>
                                    )}
                                    <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                                        <Zap className="w-5 h-5 text-yellow-500" />
                                        <span className="font-bold text-yellow-500">
                                            +{isCorrect ? currentQ.xpPoint : 0} XP
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                    {currentQ.explanation}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-8">
                            {!isAnswered ? (
                                <button
                                    onClick={handleSubmitAnswer}
                                    disabled={selectedAnswers.length === 0}
                                    className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                                        selectedAnswers.length > 0
                                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-[1.02]'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    Submit Answer
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextQuestion}
                                    className="group w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-[1.02] transition-all duration-300"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {isLastQuestion ? 'Complete Mission' : 'Next Question'}
                                        <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestContainer2