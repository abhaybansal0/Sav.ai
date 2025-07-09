'use client'

import React, { useState, useEffect } from 'react';
import MathBlock from './_components/MathBlock';



const lesson = {
    class: 11,
    chapter: 'Units & Measurements',
    concept: 'Density',
    theme: 'Blue',
    formulae: [
        { latex: '$$\\rho = \\frac{m}{V}$$', symbols: ['\\rho', 'm', 'V'] }
    ],
    explanation: 'Density is mass per unit volume. It indicates how compact matter is. In SI units, mass is measured in kilograms and volume in cubic metres, so density is expressed in kg m⁻³.',
    questions: [
        {
            questionText: 'A 0.5 kg object occupies 4 × 10⁻⁴ m³. What is its density?',
            answerOptions: [
                { optionId: 'A', optionText: '1 250 kg m⁻³' },
                { optionId: 'B', optionText: '1 000 kg m⁻³' },
                { optionId: 'C', optionText: '800 kg m⁻³' },
                { optionId: 'D', optionText: '12 500 kg m⁻³' }
            ],
            correctAnswers: ['A'],
            explanation: 'ρ = m / V = 0.5 kg ÷ 4×10⁻⁴ m³ = 1.25×10³ kg m⁻³ → 1 250 kg m⁻³.',
            pointValue: 10
        },
        {
            questionText: 'If both mass and volume of a liquid triple, its density will …',
            answerOptions: [
                { optionId: 'A', optionText: 'triple' },
                { optionId: 'B', optionText: 'remain unchanged' },
                { optionId: 'C', optionText: 'become one-third' },
                { optionId: 'D', optionText: 'cannot be predicted' }
            ],
            correctAnswers: ['B'],
            explanation: 'ρ = m/V. Multiplying numerator and denominator by the same factor leaves the ratio unchanged.',
            pointValue: 10
        },
        {
            questionText: 'Which unit is equivalent to kg m⁻³?',
            answerOptions: [
                { optionId: 'A', optionText: 'N m⁻²' },
                { optionId: 'B', optionText: 'g cm⁻³' },
                { optionId: 'C', optionText: 'Pa' },
                { optionId: 'D', optionText: 'none of these' }
            ],
            correctAnswers: ['D'],
            explanation: 'N m⁻² (Pa) and g cm⁻³ are different derived units. kg m⁻³ is unique to density.',
            pointValue: 10
        },
        {
            questionText: 'Freshwater at 4 °C has density closest to …',
            answerOptions: [
                { optionId: 'A', optionText: '100 kg m⁻³' },
                { optionId: 'B', optionText: '500 kg m⁻³' },
                { optionId: 'C', optionText: '1 000 kg m⁻³' },
                { optionId: 'D', optionText: '10 000 kg m⁻³' }
            ],
            correctAnswers: ['C'],
            explanation: 'Standard reference density of water ≈ 1 000 kg m⁻³.',
            pointValue: 10
        },
        {
            questionText: 'Which statement is true?',
            answerOptions: [
                { optionId: 'A', optionText: 'Density depends only on mass.' },
                { optionId: 'B', optionText: 'Density depends only on volume.' },
                { optionId: 'C', optionText: 'Density is mass per unit area.' },
                { optionId: 'D', optionText: 'Density helps predict buoyancy.' }
            ],
            correctAnswers: ['D'],
            explanation: 'Buoyancy force depends on fluid density; denser fluids exert larger upthrust.',
            pointValue: 10
        }
    ],
    revisionCards: [
        'Density ρ = m/V.',
        'SI unit: kg m⁻³.',
        'Constant for a pure substance at fixed T-P.'
    ]
};



/* ----------  Component  ---------- */
export default function LessonDemoPage() {
    const [qIndex, setQIndex] = useState(0);
    const [picked, setPicked] = useState('');
    const [checked, setChecked] = useState(false);
    const q = lesson.questions[qIndex];


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [showIntro, setShowIntro] = useState(true);
    const [startTime, setStartTime] = useState(null);
    const [timeSpent, setTimeSpent] = useState(0);
    const [streak, setStreak] = useState(0);

    const currentQ = lesson.questions[currentQuestion];
    const isLastQuestion = currentQuestion === lesson.questions.length - 1;
    const progress = ((currentQuestion + (isAnswered ? 1 : 0)) / lesson.questions.length) * 100;

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [startTime]);


    const handleCheck = () => {
        if (!picked) return;
        const correct = picked.startsWith(q.correct);
        setIsCorrect(correct);
        setChecked(true);
        if (correct) setScore(s => s + 1);
    };

    const nextQ = () => {
        setPicked('');
        setChecked(false);
        setIsCorrect(null);
        setQIndex(i => i + 1);
    };

    if (qIndex >= lesson.questions.length) {
        return (
            <div className="max-w-xl mx-auto mt-20 text-center">
                <h1 className="text-3xl font-semibold mb-4">{lesson.concept} — Finished</h1>
                <p className="text-xl mb-6">
                    Score: {score} / {lesson.questions.length}
                </p>
                <h2 className="text-2xl font-medium mb-2">Revision Cards</h2>
                <ul className="list-disc text-left pl-6 space-y-1">
                    {lesson.revisionCards.map((c, i) => (
                        <li key={i}>{c}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 pt-24">
            <h1 className="text-2xl font-bold mb-2">{lesson.concept}</h1>

            {qIndex === 0 && (
                <>
                    <p className="mb-4 text-gray-700">{lesson.explanation}</p>
                    <div
                        className="mb-6 space-y-2"
                    // dangerouslySetInnerHTML={{ __html: renderLatex(lesson.formulae[0].latex) }}
                    >
                        {lesson.formulae.map(f => (
                            <MathBlock key={f.latex} latex={f.latex} />
                        ))}
                    </div>

                </>
            )}

            <p className="font-medium mb-3">
                Q{qIndex + 1}. {q.stem}
            </p>

            <div className="space-y-2 mb-4">
                {q.choices.map(c => {
                    const code = c.slice(0, 1); // "A"
                    return (
                        <label key={code} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="choice"
                                value={code}
                                disabled={checked}
                                checked={picked === c}
                                onChange={() => setPicked(c)}
                                className="h-4 w-4 accent-blue-600"
                            />
                            <span>{c}</span>
                        </label>
                    );
                })}
            </div>

            {!checked && (
                <button
                    onClick={handleCheck}
                    disabled={!picked}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Check
                </button>
            )}

            {checked && (
                <div className={`mt-4 p-4 rounded ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="font-semibold">
                        {isCorrect ? 'Correct 🎉' : `Incorrect ❌ (Correct: ${q.correct})`}
                    </p>
                    <p className="mt-2">{q.solution}</p>
                    <button
                        onClick={nextQ}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}