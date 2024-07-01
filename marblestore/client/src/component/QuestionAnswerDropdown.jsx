import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom'


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
      <div className="question-answer-dropdown">
        <div className="question-grid">
          {questions.map((questionData, index) => (
            <div key={questionData.question} className="question-answer-item">
              <button key={questionData.question} onClick={() => handleQuestionClick(index)}>
                <span>Q.</span>{questionData.question}
              </button>
              {selectedQuestionIndex === index && (
                <p className={`answer-list ${selectedQuestionIndex === index ? 'show-answer' : ''}`}>
                  {questions[selectedQuestionIndex].answers.map((answer) => (
                    <p key={answer}>{answer}</p>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
        <h3 className='homeh1'><NavLink to='/blog'>Browse about section for more details</NavLink></h3>
        {/*  */}
      </div>
    </>
  );
}

export default QuestionAnswerDropdown;
