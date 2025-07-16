'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

const questions = [
  {
    title: 'What would you like your daily Goal to be?',
    options: ['5 Questions', '10 Questions', '15 Questions'],
    key: 'dailyGoal'
  },
  {
    title: 'What is your current standard?',
    options: ['XII', 'XI', 'X', 'Less than X'],
    key: 'standard'
  },
  {
    title: 'Which subject would you like to start with?',
    options: ['Physics', 'Chemistry', 'Maths'],
    key: 'startSubject'
  },
];




const UserPreferencesPage = () => {

  const router = useRouter();

  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userChoices, setUserChoices] = useState({
    dailyGoal: '',
    startSubject: '',
    standard: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const currentQuestion = questions[currentQuestionNo];
  const isLastQuestion = currentQuestionNo === questions.length - 1;



  const submitUserPreferences = async (SubPreference: string) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Extract numeric value from daily goal
      const dailyGoalValue = parseInt(userChoices.dailyGoal.split(' ')[0]);

      console.log('Submitting preferences:', {
        dailyGoal: dailyGoalValue,
        standard: userChoices.standard,
        startSubject: SubPreference
      });


      // Here you would make your actual API call
      const res = await axios.post(`/api/progress/submitpreferences`, {
        dailyGoal: dailyGoalValue,
        standard: userChoices.standard,
        startSubject: SubPreference
      },
        { withCredentials: true });

      const lessonId = res.data?.lessonId;

      if(!lessonId) return;

      toast.success('Preferences saved successfully!');

      router.push(`/courses/lesson/${lessonId}`)


    } catch (error) {
      console.log('Error while submitting preferences:', error);
      alert('Error saving preferences. Please try again.');

    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = async () => {
    if (selectedAnswer === '') return;

    // Update user choices with current selection
    const updatedChoices = {
      ...userChoices,
      [currentQuestion.key]: selectedAnswer
    };
    setUserChoices(updatedChoices);

    if (isLastQuestion) {
      // Submit preferences on last question
      await submitUserPreferences(selectedAnswer);
      return;
    }

    // Move to next question
    setCurrentQuestionNo(currentQuestionNo + 1);
    setSelectedAnswer('');
  };

  const handleSelect = (optionText: string) => {
    setSelectedAnswer(optionText);
  };


  return (
    <div className="relative w-full  flex items-center justify-center p-4">
      {/* <BgStars /> */}

      <div className="w-full max-w-2xl">
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

          {/* Space Character with Chat Bubble */}
          <div className="flex items-start gap-4 mb-8">
            {/* Cartoonish Space Character Head */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Character Head */}
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full relative overflow-hidden border-3 border-white shadow-lg">
                  {/* Face gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/30 to-purple-400/30 rounded-full"></div>

                  {/* Eyes */}
                  <div className="absolute top-4 left-3 w-2.5 h-2.5 bg-white rounded-full shadow-sm">
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute top-4 right-3 w-2.5 h-2.5 bg-white rounded-full shadow-sm">
                    <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-black rounded-full"></div>
                  </div>

                  {/* Mouth */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-1.5 bg-white rounded-full"></div>

                  {/* Space helmet reflection */}
                  <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-white/40 rounded-full"></div>

                  {/* Antenna */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full"></div>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
                </div>

                {/* Small stars around character */}
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Chat Bubble */}
            <div className="flex-1 relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 shadow-lg border border-white/30">
                <div className="text-gray-800 font-medium leading-relaxed">
                  Hi there,
                </div>

                <div className="text-gray-800 font-medium leading-relaxed">
                  Before we start our journey, let&apos;s set some goals!
                </div>
              </div>
              {/* Chat bubble tail */}
              <div className="absolute left-0 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white/90"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {currentQuestion.title}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    <div className={`w-5 h-5 rounded-full border-2 ${selectedAnswer === option
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                      }`}>
                      {selectedAnswer === option && (
                        <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (currentQuestionNo > 0) {
                  setCurrentQuestionNo(currentQuestionNo - 1);
                  setSelectedAnswer('');
                }
              }}
              disabled={currentQuestionNo === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${currentQuestionNo === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
            >
              Back
            </button>

            <button
              onClick={handleContinue}
              disabled={selectedAnswer === '' || isSubmitting}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${selectedAnswer === '' || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              ) : isLastQuestion ? (
                'Complete Setup'
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesPage;