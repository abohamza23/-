import React, { useState } from 'react';
import { Question, EssayQuestion } from '../types';
import { BookOpen, Eye, EyeOff } from 'lucide-react';

interface EssaySectionProps {
  questions: Question[];
}

const EssaySection: React.FC<EssaySectionProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showModelAnswer, setShowModelAnswer] = useState<Record<number, boolean>>({});

  const handleAnswerChange = (id: number, text: string) => {
    setAnswers(prev => ({ ...prev, [id]: text }));
  };

  const toggleModelAnswer = (id: number) => {
    setShowModelAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-secondary">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">الأسئلة المقالية</h2>
        <p className="text-gray-600">
          أجب عن الأسئلة التالية لتقييم فهمك، ثم قارن إجابتك بالإجابة النموذجية.
        </p>
      </div>

      <div className="space-y-8">
        {questions.map((q, index) => {
          const essayQ = q as EssayQuestion;
          const currentAnswer = answers[q.id] || '';
          const isAnswerVisible = showModelAnswer[q.id];

          return (
            <div key={q.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold text-sm">
                    {index + 1}
                </span>
                <h3 className="text-lg font-medium text-gray-800">{q.text}</h3>
              </div>

              <div className="relative mb-4">
                <textarea
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder="اكتب إجابتك هنا للمراجعة الذاتية..."
                  className="w-full min-h-[100px] p-4 rounded-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-y text-gray-700 bg-gray-50 focus:bg-white transition-all"
                />
                 <div className="absolute bottom-3 left-3 text-xs text-gray-400">
                    {currentAnswer.length} حرف
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button
                    onClick={() => toggleModelAnswer(q.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all shadow-sm ${
                        isAnswerVisible 
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                >
                    {isAnswerVisible ? (
                        <>
                            <EyeOff className="w-4 h-4" />
                            <span>إخفاء الإجابة</span>
                        </>
                    ) : (
                        <>
                            <Eye className="w-4 h-4" />
                            <span>عرض الإجابة النموذجية</span>
                        </>
                    )}
                </button>
              </div>

              {/* Model Answer Section */}
              {isAnswerVisible && (
                <div className="mt-6 animate-fade-in">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-green-500"></div>
                        <h4 className="font-bold text-green-800 flex items-center gap-2 mb-2">
                            <BookOpen className="w-5 h-5" />
                            الإجابة النموذجية:
                        </h4>
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                            {essayQ.modelAnswer}
                        </p>
                    </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EssaySection;