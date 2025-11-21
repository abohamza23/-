import React, { useState } from 'react';
import { mcqQuestions, tfQuestions, essayQuestions } from './data';
import QuizSection from './components/QuizSection';
import EssaySection from './components/EssaySection';
import { BookOpen, CheckSquare, Edit3, Scroll } from 'lucide-react';

type Tab = 'MCQ' | 'TF' | 'ESSAY';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('MCQ');

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-right font-sans">
      {/* Hero / Header */}
      <header className="bg-gradient-to-l from-primary to-[#0d5e56] text-white pb-20 pt-10 px-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             {/* Abstract Islamic Pattern Background using CSS gradients or SVG logic could go here. Simple opacity overlay for now */}
             <svg width="100%" height="100%">
                <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="currentColor" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
             </svg>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <Scroll className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">اختبار ابن خلدون الشامل</h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto opacity-90">
            اختبر معلوماتك حول مؤسس علم الاجتماع، حياته، نظرياته في العمران البشري، وكتابه الخالد "المقدمة".
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 -mt-12 relative z-20 pb-20">
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex flex-col md:flex-row gap-2">
          <button
            onClick={() => setActiveTab('MCQ')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-lg transition-all duration-300 font-bold ${
              activeTab === 'MCQ' 
              ? 'bg-primary text-white shadow-md transform scale-[1.02]' 
              : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            <span>الاختيار من متعدد</span>
          </button>
          
          <button
            onClick={() => setActiveTab('TF')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-lg transition-all duration-300 font-bold ${
              activeTab === 'TF' 
              ? 'bg-primary text-white shadow-md transform scale-[1.02]' 
              : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>صح أم خطأ</span>
          </button>
          
          <button
            onClick={() => setActiveTab('ESSAY')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-lg transition-all duration-300 font-bold ${
              activeTab === 'ESSAY' 
              ? 'bg-primary text-white shadow-md transform scale-[1.02]' 
              : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Edit3 className="w-5 h-5" />
            <span>الأسئلة المقالية</span>
          </button>
        </div>

        {/* Content Sections */}
        <div className="transition-opacity duration-300">
          {activeTab === 'MCQ' && (
            <QuizSection 
              questions={mcqQuestions} 
              title="أسئلة الاختيار من متعدد" 
              description="اختر الإجابة الصحيحة من بين الخيارات المتاحة."
            />
          )}
          
          {activeTab === 'TF' && (
            <QuizSection 
              questions={tfQuestions} 
              title="أسئلة الصواب والخطأ" 
              description="حدد صحة العبارات التالية."
            />
          )}
          
          {activeTab === 'ESSAY' && (
            <EssaySection questions={essayQuestions} />
          )}
        </div>
      </main>

      <footer className="bg-white border-t py-8 text-center text-gray-500 text-sm">
        <p>© 2024 منصة ابن خلدون التعليمية | تم التصميم بواسطة أحدث تقنيات الويب</p>
      </footer>
    </div>
  );
};

export default App;
