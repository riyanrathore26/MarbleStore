import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

function QuestionAnswerDropdown() {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index);
  };

  // Sample questions and answers for testing
  const questions = [
    {
      question: 'What is the capital of France?',
      answers: ['Paris', 'London', 'Berlin'],
    },
    {
      question: 'What is the largest planet in our solar system?',
      answers: ['Jupiter', 'Mars', 'Earth'],
    },
    {
      question: 'What is the meaning of life?',
      answers: ['42', 'To be happy', 'There is no single answer'],
    },
    {
      question: 'What is the tallest mountain on Earth?',
      answers: ['Mount Everest', 'K2', 'Kangchenjunga'],
    },
    {
      question: 'What is the chemical formula for water?',
      answers: ['H2O', 'CO2', 'NaCl'],
    },
    {
      question: 'Who painted the Mona Lisa?',
      answers: ['Leonardo da Vinci', 'Michelangelo', 'Vincent van Gogh'],
    },
  ];

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-5 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {questions.map((questionData, index) => (
            <div
              key={questionData.question}
              className="bg-gray-100 border border-gray-300 rounded-lg p-4 transition-colors duration-300 ease-in-out"
            >
              <button
                key={questionData.question}
                onClick={() => handleQuestionClick(index)}
                className="w-full text-left flex items-center text-lg"
              >
                <span className="font-bold text-pink-600 mr-2">Q.</span>
                {questionData.question}
              </button>
              {selectedQuestionIndex === index && (
                <div className="mt-2 pt-2 border-t border-gray-300">
                  {questions[selectedQuestionIndex].answers.map((answer) => (
                    <p key={answer} className="mt-1">
                      {answer}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <h3 className="text-center mt-6 text-pink-600 text-lg">
          <NavLink to="/blog" className="hover:underline">
            Browse about section for more details
          </NavLink>
        </h3>
      </div>
    </>
  );
}

export default QuestionAnswerDropdown;
