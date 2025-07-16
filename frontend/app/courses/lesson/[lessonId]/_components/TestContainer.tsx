'use client'

import React from 'react'
import { CheckCircle, Trophy, XCircle, Clock, Zap, Target, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'

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

    lessonInfo: {
        unit: string
        _id: string
        standard: number,
        chapter: string,
        concept: string,
    }
}

const TestContainer = ({ questions, revisionCard, lessonInfo }: Props) => {

    const [showOutro, setShowOutro] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [isAnswered, setIsAnswered] = useState<boolean>(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>()
    const [startTime, setStartTime] = useState<number | null>(null);
    const [streak, setStreak] = useState(0)
    const [score, setScore] = useState(0)
    const [totalCorrect, setTotalCorrect] = useState<number>(0);
    const [timeSpent, setTimeSpent] = useState(0);
    const [finalTime, setFinalTime] = useState<number>(0)

    const [newStreak, setNewStreak] = useState<number>(0);
    const [xpGained, setXpGained] = useState<number | ''>('')

    const [submitInfo, setSubmitInfo] = useState({
        subjectId: '',
        unitId: lessonInfo.unit,
        lessonId: lessonInfo._id,
        correctCount: 0
    })

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

        const getSubId = async () => {
            try {

                const res = await axios.get(`/api/units/getIds/${lessonInfo.unit}`,
                    { withCredentials: true }
                )
                const { unitId, subId } = res.data?.Ids;

                if (!unitId || !subId) throw new Error();

                setSubmitInfo({ ...submitInfo, subjectId: subId });

            } catch (error) {
                console.log('Error while fetching Subject Id: ', error);

            }
        }
        getSubId();

    }, [lessonInfo.unit, submitInfo])

    const submitProgress = async () => {
        try {

            if (!submitInfo.lessonId || !submitInfo.subjectId || !submitInfo.unitId) {
                return toast.error('Error')
            }
            console.log(submitInfo);

            const res = await axios.post(`/api/progress/submit`,
                submitInfo,
                { withCredentials: true }
            )

            const { xpGained, newStreak } = res?.data;

            setXpGained(xpGained);
            setNewStreak(newStreak);
            console.log(xpGained, newStreak);

        } catch (error) {
            console.log('Error while submitting user progress: ', error);
        }
    }

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
            setTotalCorrect(totalCorrect + 1);
            setSubmitInfo({ ...submitInfo, correctCount: totalCorrect + 1 })
            setScore(score + currentQ.xpPoint);
            setStreak(streak + 1);
        } else {
            setStreak(0);
        }
    }

    const handleNextQuestion = async () => {
        if (isLastQuestion) {
            setFinalTime(timeSpent)
            await submitProgress();
            setShowOutro(true);
            return;
        }

        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswers([]);
        setIsAnswered(false);
        setIsCorrect(null);
    }

    // Completion screen
    if (showOutro) {
        // const totalPoints = questions.reduce((sum, q) => sum + q.xpPoint, 0);

        return (
            <div className="w-full max-w-4xl mx-auto relative">
                {/* Cosmic background elements */}


                <div className="relative z-10 bg-white/50 dark:bg-black/40 backdrop-blur-sm rounded-3xl border border-gray-200/30 dark:border-gray-700/30 p-8 shadow-2xl">
                    <div className="text-center">
                        {/* Trophy Section */}
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl mb-6 transform ">
                                <Trophy className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                Mission Complete!
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                {lessonInfo.concept} • Class {lessonInfo.standard}
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="flex items-center justify-evenly gap-4 mb-8">
                            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50 backdrop-blur-sm">
                                <div className="flex items-center justify-center mb-2">
                                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">{xpGained || 0}</div>
                                </div>
                                <div className="text-gray-600 dark:text-gray-300">XP Earned</div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm">
                                <div className="flex items-center justify-center mb-2">
                                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{newStreak}</div>
                                </div>
                                <div className="text-gray-600 dark:text-gray-300">New Streak</div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50 backdrop-blur-sm">
                                <div className="flex items-center justify-center mb-2">
                                    <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
                                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{formatTime(finalTime)}</div>
                                </div>
                                <div className="text-gray-600 dark:text-gray-300">Time Taken</div>
                            </div>
                        </div>

                        {/* Key Takeaways */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center justify-center">
                                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                                Key Takeaways
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {revisionCard.map((card, index) => (
                                    <div key={index} className="bg-white/80 dark:bg-black/30 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                                        <p className="text-gray-700 dark:text-gray-300">{card}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Button */}
                        <Link href={`/courses/unit/${lessonInfo.unit}`}>
                            <button
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform  transition-all duration-300"
                            >
                                Continue Learning
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Main test interface
    return (
        <div className='w-3/4 max-w-6xl mx-auto px-4'>
            {/* Header */}
            <div className="mb-8">
                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/30 dark:border-gray-700/30 shadow-xl">
                    <div className='flex items-center justify-between mb-6'>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-800 dark:text-white mb-1'>{lessonInfo.chapter}</h1>
                            <span className='text-gray-500 dark:text-gray-400'>Class {lessonInfo.standard}</span>
                        </div>
                        <div className='flex items-center gap-6'>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 px-4 py-2 rounded-xl">
                                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                <span className='text-purple-800 dark:text-purple-300 font-medium'>
                                    {formatTime(timeSpent)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 px-4 py-2 rounded-xl">
                                <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                                <span className='text-green-800 dark:text-green-300 font-medium'>
                                    {totalCorrect}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div className="space-y-3">
                        <div className='flex items-center justify-between'>
                            <span className='text-gray-600 dark:text-gray-400'>Question {currentQuestion + 1} of {questions.length}</span>
                            <span className='text-gray-600 dark:text-gray-400'>{Math.round(progress)}% Complete</span>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {streak > 0 && (
                            <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400">
                                <Star className="w-4 h-4" />
                                <span className="text-sm font-medium">{streak} streak!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <div className=" mx-auto 
            bg-gradient-to-br from-white via-[#e6f2fa] to-[#d4e5f0] text-gray-900 
            dark:bg-gradient-to-br dark:from-black dark:via-[#112236] dark:to-[#0b0c10] dark:text-white
            backdrop-blur-xl rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-xl overflow-hidden">
                {/* Question Header */}
                <div className=" p-6 border-b border-gray-200/30 dark:border-gray-700/30">
                    <div className='flex items-center justify-between mb-4'>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {currentQuestion + 1}
                            </div>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-3 py-1 rounded-full">
                                <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                                    {currentQ.xpPoint} XP
                                </span>
                            </div>
                        </div>
                    </div>

                    <h2 className='text-xl md:text-2xl font-bold text-gray-800 dark:text-white leading-relaxed'>
                        {currentQ.questionText}
                    </h2>
                </div>

                {/* Answer Options */}
                <div className="p-6 space-y-4 ">
                    {currentQ.answerOptions.map((option) => {
                        const isSelected = selectedAnswers.includes(option.optionId)
                        const isCorrectAnswer = currentQ.correctAnswers.includes(option.optionId)

                        let optionClasses = "block w-full p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg transform  ";

                        if (isAnswered) {
                            if (isCorrectAnswer) {
                                optionClasses += "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 ";
                            } else if (isSelected && !isCorrectAnswer) {
                                optionClasses += "border-red-500 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 ";
                            } else {
                                optionClasses += "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 ";
                            }
                        } else {
                            if (isSelected) {
                                optionClasses += "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 ";
                            } else {
                                optionClasses += "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 ";
                            }
                        }

                        return (
                            <button
                                key={option.optionId}
                                className={optionClasses}
                                onClick={() => handleAnswerSelect(option.optionId)}
                                disabled={isAnswered}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${isAnswered && isCorrectAnswer
                                            ? 'bg-green-200 text-green-800 shadow-md'
                                            : isAnswered && isSelected && !isCorrectAnswer
                                                ? 'bg-red-200 text-red-800 shadow-md'
                                                : isSelected
                                                    ? 'bg-blue-500 text-white shadow-lg'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        {option.optionId}
                                    </div>
                                    <span className="text-left flex-1 text-gray-800 dark:text-gray-200">{option.optionText}</span>
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

                {/* Explanation */}
                {isAnswered && (
                    <div className={`mx-6 mb-6 p-6 rounded-xl border-2 ${isCorrect
                        ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30'
                        : 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30'
                        }`}>
                        <div className="flex items-center gap-3 mb-4">
                            {isCorrect ? (
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            ) : (
                                <XCircle className="w-8 h-8 text-red-500" />
                            )}
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                {isCorrect ? 'Correct!' : 'Incorrect'}
                            </h3>
                            <div className="ml-auto flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                <span className="text-lg font-bold text-gray-800 dark:text-white">
                                    +{isCorrect ? currentQ.xpPoint : 0} XP
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {currentQ.explanation}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-t border-gray-200/30 dark:border-gray-700/30">
                    {!isAnswered ? (
                        <button
                            onClick={handleSubmitAnswer}
                            disabled={selectedAnswers.length === 0}
                            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${selectedAnswers.length > 0
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg"

                        >
                            {isLastQuestion ? 'Complete Lesson' : 'Next Question'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TestContainer