import { Volume2, VolumeX } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';

export default function QuestionCard({ question, current, total, isFollowUp, isSpeaking, onToggleTTS }) {
  return (
    <Card decoration="tape" className="relative mt-8 mb-6">
      <div className="flex justify-between items-start mb-4">
        <Badge variant={isFollowUp ? 'warning' : 'category'}>
          {isFollowUp ? 'Follow-Up Question' : `Question ${current} of ${total}`}
        </Badge>
        
        <button 
          onClick={onToggleTTS}
          className="p-2 hover:bg-erased rounded-full transition-colors border-2 border-transparent hover:border-pencil wobbly-sm"
          aria-label={isSpeaking ? "Stop reading" : "Read aloud"}
        >
          {isSpeaking ? <VolumeX size={24} className="text-marker" /> : <Volume2 size={24} className="text-pen" />}
        </button>
      </div>
      
      <p className="font-heading text-3xl text-pencil leading-relaxed">
        "{question}"
      </p>
    </Card>
  );
}
