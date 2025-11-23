import React, { useState } from 'react';
import { exams } from './data';
import { Exam } from './types';
import QuizSection from './components/QuizSection';
import EssaySection from './components/EssaySection';
import { BookOpen, CheckSquare, Edit3, Scroll, Scale, Pen, Book, ArrowRight } from 'lucide-react';

type Tab = 'MCQ' | 'TF' | 'ESSAY';
type View = 'HOME' | 'EXAM';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('MCQ');

  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam);
    setCurrentView('EXAM');
    setActiveTab('MCQ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('HOME');
    setSelectedExam(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to get icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'scale': return <Scale className="w-12 h-12 text-secondary" />;
      case 'pen': return <Pen className="w-12 h-12 text-accent" />;
      case 'book': return <Book className="w-12 h-12 text-primary" />;
      case 'scroll': 
      default: return <Scroll className="w-12 h-12 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-right font-sans flex flex-col">
      {/* Hero / Header */}
      <header className="bg-gradient-to-l from-primary to-[#0d5e56] text-white pb-24 pt-12 px-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <svg width="100%" height="100%">
                <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="currentColor" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
             </svg>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="mb-6">
            {/* 
              ملاحظة: لاستخدام الشعار الخاص بك (صورة الصقر مع النص)، قم بإضافة ملف الصورة إلى مجلد المشروع 
              وقم بتغيير الرابط أدناه إلى مسار الصورة المحلي (مثلاً: ./logo.png)
            */}
            <img 
              src="./media/logo.jpg" 
              alt="شعار الشاهين" 
              className="w-48 h-48 object-contain drop-shadow-2xl filter brightness-110 hover:scale-105 transition-transform duration-300"
            />
            <h1 className="sr-only">الشاهين</h1>
          </div>
          
          <p className="text-xl md:text-3xl text-gray-100 max-w-3xl mx-auto font-medium leading-relaxed font-serif tracking-wide">
            مادة: مقدمة في الفكر السياسي اختبار الفاينال
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 pb-20 w-full flex-grow">
        
        {currentView === 'HOME' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
            {exams.map((exam) => (
              <div 
                key={exam.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleExamSelect(exam)}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-primary/10 transition-colors">
                      {getIcon(exam.icon)}
                    </div>
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                      {exam.mcqQuestions.length + exam.tfQuestions.length + exam.essayQuestions.length} سؤال
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
                    {exam.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {exam.description}
                  </p>
                  
                  <button className="w-full bg-gray-50 hover:bg-primary hover:text-white text-gray-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-md">
                    <span>بدء الاختبار</span>
                    <ArrowRight className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'EXAM' && selectedExam && (
          <div className="animate-fade-in">
            <button 
              onClick={handleBackToHome}
              className="mb-6 flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm transition-all font-medium"
            >
              <ArrowRight className="w-5 h-5" />
              <span>العودة إلى القائمة الرئيسية</span>
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gray-50 border-b p-6 md:p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif">{selectedExam.title}</h2>
                <p className="text-gray-600">{selectedExam.description}</p>
              </div>

              {/* Tabs */}
              <div className="flex border-b overflow-x-auto">
                <button
                  onClick={() => setActiveTab('MCQ')}
                  className={`flex-1 min-w-[160px] py-4 px-6 text-center font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'MCQ' 
                    ? 'text-primary border-b-4 border-primary bg-primary/5' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CheckSquare className="w-5 h-5" />
                  الاختيار من متعدد
                </button>
                <button
                  onClick={() => setActiveTab('TF')}
                  className={`flex-1 min-w-[160px] py-4 px-6 text-center font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'TF' 
                    ? 'text-primary border-b-4 border-primary bg-primary/5' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  صح أم خطأ
                </button>
                <button
                  onClick={() => setActiveTab('ESSAY')}
                  className={`flex-1 min-w-[160px] py-4 px-6 text-center font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'ESSAY' 
                    ? 'text-primary border-b-4 border-primary bg-primary/5' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Edit3 className="w-5 h-5" />
                  الأسئلة المقالية
                </button>
              </div>

              {/* Content */}
              <div className="p-4 md:p-8 bg-gray-50/50 min-h-[600px]">
                {activeTab === 'MCQ' && (
                  <QuizSection 
                    key={`mcq-${selectedExam.id}`}
                    questions={selectedExam.mcqQuestions} 
                    title="أسئلة الاختيار من متعدد" 
                    description="اختر الإجابة الصحيحة من بين الخيارات المتاحة."
                  />
                )}
                
                {activeTab === 'TF' && (
                  <QuizSection 
                    key={`tf-${selectedExam.id}`}
                    questions={selectedExam.tfQuestions} 
                    title="أسئلة الصواب والخطأ" 
                    description="حدد صحة العبارات التالية."
                  />
                )}
                
                {activeTab === 'ESSAY' && (
                  <EssaySection 
                    key={`essay-${selectedExam.id}`}
                    questions={selectedExam.essayQuestions} 
                  />
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="bg-white border-t py-8 text-center mt-auto">
        <p className="font-serif text-2xl font-bold text-primary">الشاهين</p>
      </footer>
    </div>
  );
};

export default App;
