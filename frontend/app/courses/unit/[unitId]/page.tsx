'use client'

import React, { useState } from 'react';
import MathBlock from './_components/MathBlock';



/* ----------  Hard-coded LessonObject  ---------- */
const lesson = {
    id: 'demo_density',
    class: 11,
    chapter: 'Units & Measurements',
    concept: 'Density',
    formulae: [
        { latex: '$$\\rho = \\frac{m}{V}$$', symbols: ['\\rho', 'm', 'V'] }
    ],
    explanation:
        'Density is mass per unit volume.  It indicates how compact matter is.  ' +
        'In SI units, mass is measured in kilograms and volume in cubic metres, ' +
        'so density is expressed in kg m⁻³.',
    questions: [
        {
            stem: 'A 0.5 kg object occupies 4 × 10⁻⁴ m³.  What is its density?',
            choices: [
                'A) 1 250 kg m⁻³',
                'B) 1 000 kg m⁻³',
                'C) 800 kg m⁻³',
                'D) 12 500 kg m⁻³'
            ],
            correct: 'A',
            solution:
                'ρ = m / V = 0.5 kg ÷ 4×10⁻⁴ m³ = 1.25×10³ kg m⁻³ → 1 250 kg m⁻³.'
        },
        {
            stem: 'If both mass and volume of a liquid triple, its density will …',
            choices: [
                'A) triple',
                'B) remain unchanged',
                'C) become one-third',
                'D) cannot be predicted'
            ],
            correct: 'B',
            solution:
                'ρ = m/V.  Multiplying numerator and denominator by the same factor leaves the ratio unchanged.'
        },
        {
            stem: 'Which unit is equivalent to kg m⁻³?',
            choices: ['A) N m⁻²', 'B) g cm⁻³', 'C) Pa', 'D) none of these'],
            correct: 'D',
            solution:
                'N m⁻² (Pa) and g cm⁻³ are different derived units.  kg m⁻³ is unique to density.'
        },
        {
            stem: 'Freshwater at 4 °C has density closest to …',
            choices: [
                'A) 100 kg m⁻³',
                'B) 500 kg m⁻³',
                'C) 1 000 kg m⁻³',
                'D) 10 000 kg m⁻³'
            ],
            correct: 'C',
            solution: 'Standard reference density of water ≈ 1 000 kg m⁻³.'
        },
        {
            stem: 'Which statement is true?',
            choices: [
                'A) Density depends only on mass.',
                'B) Density depends only on volume.',
                'C) Density is mass per unit area.',
                'D) Density helps predict buoyancy.'
            ],
            correct: 'D',
            solution: 'Buoyancy force depends on fluid density; denser fluids exert larger upthrust.'
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
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);

    const q = lesson.questions[qIndex];

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
        <div className="max-w-2xl mx-auto p-6">
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