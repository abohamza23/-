import React, { useState } from 'react';
import { Question, AIResponse } from '../types';
import { evaluateEssayAnswer } from '../services/gemini';
import { Loader2, Sparkles, Send, AlertCircle } from 'lucide-react';

interface EssaySectionProps {
  questions: Question[];
}

const EssaySection: React.FC<EssaySectionProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [evaluations, setEvaluations] = useState<Record<number, AIResponse | null>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  const handleAnswerChange = (id: number, text: string) => {
    setAnswers(prev => ({ ...prev, [id]: text }));
  };

  const handleEvaluate = async (id: number, questionText: string) => {
    const answer = answers[id];
    if (!answer || answer.trim().length < 3) return;

    setLoading(prev => ({ ...prev, [id]: true }));
    
    // Small delay to allow UI to update before heavy calculation if any (though mostly async)
    const result = await evaluateEssayAnswer(questionText, answer);
    
    setEvaluations(prev => ({ ...prev, [id]: result }));
    setLoading(prev => ({ ...prev, [id]: false }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-secondary">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">الأسئلة المقالية</h2>
        <p className="text-gray-600">
          أجب عن الأسئلة التالية بدقة. يمكنك استخدام المساعد الذكي لتقييم إجابتك والحصول على ملاحظات فورية.
        </p>
        <div className="mt-4 bg-blue-50 p-3 rounded text-sm text-blue-800 flex items-start gap-2">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <span>يتم التصحيح باستخدام تقنية Gemini AI. تأكد من كتابة إجابة واضحة للحصول على تقييم دقيق.</span>
        </div>
      </div>

      <div className="space-y-8">
        {questions.map((q, index) => {
          const evaluation = evaluations[q.id];
          const isLoading = loading[q.id];
          const currentAnswer = answers[q.id] || '';

          return (
            <div key={q.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold text-sm">
                    {index + 1}
                </span>
                <h3 className="text-lg font-medium text-gray-800">{q.text}</h3>
              </div>

              <div className="relative">
                <textarea
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  disabled={isLoading || !!evaluation}
                  placeholder="اكتب إجابتك هنا..."
                  className="w-full min-h-[120px] p-4 rounded-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-y text-gray-700 bg-gray-50 focus:bg-white transition-all"
                />
                
                {/* Character Count / Status */}
                <div className="absolute bottom-3 left-3 text-xs text-gray-400">
                    {currentAnswer.length} حرف
                </div>
              </div>

              {/* Actions */}
              {!evaluation && (
                  <div className="mt-3 flex justify-end">
                    <button
                        onClick={() => handleEvaluate(q.id, q.text)}
                        disabled={isLoading || currentAnswer.length < 3}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${
                            isLoading || currentAnswer.length < 3
                             ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                             : 'bg-primary text-white hover:bg-primary/90 shadow-md'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>جاري التحليل...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                <span>تقييم الإجابة</span>
                            </>
                        )}
                    </button>
                  </div>
              )}

              {/* Feedback Section */}
              {evaluation && (
                <div className={`mt-6 border-t pt-4 animate-fade-in ${evaluation.score >= 5 ? 'border-green-100' : 'border-red-100'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-700 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            تقييم الذكاء الاصطناعي
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            evaluation.score >= 7 ? 'bg-green-100 text-green-700' :
                            evaluation.score >= 5 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            الدرجة: {evaluation.score} / 10
                        </span>
                    </div>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded text-sm leading-relaxed border-r-2 border-primary">
                        {evaluation.feedback}
                    </p>
                    <button 
                        onClick={() => setEvaluations(prev => ({...prev, [q.id]: null}))}
                        className="text-xs text-gray-400 mt-2 hover:text-primary underline"
                    >
                        إعادة المحاولة
                    </button>
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
