import React, { useState } from 'react';
import { Question, MCQQuestion, TFQuestion } from '../types';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizSectionProps {
  questions: Question[];
  title: string;
  description: string;
}

const QuizSection: React.FC<QuizSectionProps> = ({ questions, title, description }) => {
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (questionId: number, answer: any) => {
    if (showResults) return; // Prevent changing answers after submit
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (q.type === 'MCQ') {
        const mcq = q as MCQQuestion;
        if (answers[q.id] === mcq.correctAnswerIndex) correct++;
      } else if (q.type === 'TF') {
        const tf = q as TFQuestion;
        if (answers[q.id] === tf.correctAnswer) correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-primary">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        {showResults && (
          <div className={`mt-4 p-4 rounded-lg ${percentage >= 50 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <h3 className="font-bold text-lg">النتيجة النهائية: {score} / {questions.length} ({percentage}%)</h3>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => {
          const isMCQ = q.type === 'MCQ';
          const questionAnswers = isMCQ ? (q as MCQQuestion).options : ['صح', 'خطأ'];
          const userAnswer = answers[q.id];
          
          // Determine validation styling
          let borderColor = 'border-gray-200';
          let icon = null;
          
          if (showResults) {
            const isCorrect = isMCQ 
              ? userAnswer === (q as MCQQuestion).correctAnswerIndex 
              : userAnswer === (q as TFQuestion).correctAnswer;
            
            borderColor = isCorrect ? 'border-green-500' : 'border-red-500';
            icon = isCorrect ? <CheckCircle className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />;
          }

          return (
            <div key={q.id} className={`bg-white p-6 rounded-lg shadow-sm border-2 ${borderColor} transition-all`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-medium text-gray-800">{q.text}</h3>
                </div>
                {icon}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-11">
                {questionAnswers.map((opt, idx) => {
                   // Handle Value for Check
                   const valToCheck = isMCQ ? idx : (idx === 0 ? true : false);
                   const isSelected = userAnswer === valToCheck;
                   
                   let btnClass = "p-3 rounded-md border text-right transition-colors flex items-center gap-2 ";
                   if (showResults) {
                     const correctVal = isMCQ ? (q as MCQQuestion).correctAnswerIndex : (q as TFQuestion).correctAnswer;
                     if (valToCheck === correctVal) {
                       btnClass += "bg-green-100 border-green-500 font-bold text-green-800";
                     } else if (isSelected && valToCheck !== correctVal) {
                        btnClass += "bg-red-100 border-red-500 text-red-800";
                     } else {
                        btnClass += "bg-gray-50 border-gray-200 text-gray-500 opacity-70";
                     }
                   } else {
                     btnClass += isSelected 
                      ? "bg-primary/10 border-primary text-primary font-medium" 
                      : "hover:bg-gray-50 border-gray-200 text-gray-700";
                   }

                   return (
                     <button
                        key={idx}
                        onClick={() => handleOptionSelect(q.id, valToCheck)}
                        disabled={showResults}
                        className={btnClass}
                     >
                        <div className={`w-4 h-4 rounded-full border ${isSelected ? 'border-primary bg-primary' : 'border-gray-400'}`}>
                           {isSelected && <div className="w-2 h-2 mx-auto mt-0.5 bg-white rounded-full" />}
                        </div>
                        {opt}
                     </button>
                   )
                })}
              </div>
              {showResults && !isMCQ && (userAnswer === undefined) && <span className="text-red-500 text-sm mt-2 block mr-11">لم يتم الإجابة</span>}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-6 pb-12">
        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transform hover:-translate-y-1 transition-all"
          >
            اعتماد الإجابات وعرض النتيجة
          </button>
        ) : (
          <button
            onClick={() => {
              setAnswers({});
              setShowResults(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg"
          >
            إعادة الاختبار
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
