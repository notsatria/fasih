import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import { VOCABULARY } from '../../data/vocabulary.js';

export default function VocabWarmup({ vocabHints, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Map hints back to definitions from the dataset (if they exist)
  // Otherwise, create a placeholder
  const hintWords = vocabHints.map(hint => {
    const found = VOCABULARY.find(v => v.word.toLowerCase() === hint.toLowerCase());
    return found || { word: hint, definition: 'A useful phrase for this scenario.', contextSentence: `Make sure to use "${hint}" when you speak.` };
  });

  const currentWord = hintWords[currentIndex];
  const isLast = currentIndex === hintWords.length - 1;

  const handleNext = () => {
    if (isLast) onComplete();
    else setCurrentIndex(i => i + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  return (
    <div className="mt-8">
      <h3 className="font-heading text-2xl text-pencil text-center mb-6">Vocab Warm-up</h3>
      
      <Card variant="postit" className="max-w-md mx-auto relative min-h-[250px] flex flex-col">
        <Badge variant="category" className="absolute top-4 left-4">
          Word {currentIndex + 1} of {hintWords.length}
        </Badge>
        
        <div className="flex-1 flex flex-col justify-center text-center mt-8">
          <h4 className="font-heading text-4xl text-pencil mb-4">{currentWord.word}</h4>
          <p className="font-body text-lg text-pencil/90 mb-4">{currentWord.definition}</p>
          <p className="font-body text-pencil/80 italic border-l-2 border-pen pl-3 mx-auto max-w-sm text-left">
            "{currentWord.contextSentence}"
          </p>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t-2 border-dashed border-pencil/30">
          <Button variant="ghost" size="sm" onClick={handlePrev} disabled={currentIndex === 0}>
            <ArrowLeft size={18} className="mr-1" /> Prev
          </Button>
          
          <Button variant={isLast ? 'primary' : 'secondary'} size="sm" onClick={handleNext}>
            {isLast ? (
              <>Ready to Speak <CheckCircle size={18} className="ml-1" /></>
            ) : (
              <>Next <ArrowRight size={18} className="ml-1" /></>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
