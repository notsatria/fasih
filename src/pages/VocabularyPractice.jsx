import { useState } from 'react';
import { useTranslation } from '../i18n/useTranslation.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import CategorySelector from '../components/vocabulary/CategorySelector.jsx';
import VocabCard from '../components/vocabulary/VocabCard.jsx';
import Button from '../components/ui/Button.jsx';
import { getRandomVocab, getNewRandomVocab } from '../data/vocabulary.js';

export default function VocabularyPractice() {
  const { t } = useTranslation();
  
  // State: 'category-select' | 'practice'
  const [step, setStep] = useState('category-select');
  const [category, setCategory] = useState('All Categories');
  
  // Session tracking
  const [currentWord, setCurrentWord] = useState(null);
  const [wordsSeen, setWordsSeen] = useState(0);

  const handleStart = () => {
    setCurrentWord(getRandomVocab(category));
    setWordsSeen(1);
    setStep('practice');
  };

  const handleNext = () => {
    setCurrentWord(getNewRandomVocab(currentWord.id, category));
    setWordsSeen(prev => prev + 1);
  };

  const handleEnd = () => {
    setStep('category-select');
    setCurrentWord(null);
    setWordsSeen(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      <PageHeader 
        title={t('nav.vocabulary')} 
        subtitle="Learn and practice essential office vocabulary and idioms."
        align="left"
      />

      {step === 'category-select' && (
        <div className="mt-8 animate-fade-in">
          <h2 className="font-heading text-2xl text-pencil mb-4">Select a Topic to Study</h2>
          <CategorySelector selected={category} onSelect={setCategory} />
          
          <div className="flex justify-end mt-8">
            <Button variant="primary" size="lg" onClick={handleStart}>
              Start Practice Session
            </Button>
          </div>
        </div>
      )}

      {step === 'practice' && currentWord && (
        <div className="mt-8 animate-fade-in">
          <div className="flex justify-between items-center mb-2 px-2">
            <span className="font-heading text-xl text-pencil">Word {wordsSeen}</span>
            <button 
              onClick={handleEnd}
              className="font-body text-pencil/70 hover:text-marker hover:underline transition-colors"
            >
              End Session
            </button>
          </div>
          
          <VocabCard 
            key={currentWord.id + wordsSeen} // Force unmount/remount to reset state internally
            vocab={currentWord} 
            onNext={handleNext} 
          />
        </div>
      )}
    </div>
  );
}
