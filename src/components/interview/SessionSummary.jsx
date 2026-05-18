import { useState } from 'react';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import ScoreCircle from '../ui/ScoreCircle.jsx';
import STARIndicator from './STARIndicator.jsx';

export default function SessionSummary({ summary, qas, onRetry }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!summary) return null;

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const bestAnswerIndex = summary.best_answer?.index ? summary.best_answer.index - 1 : 0;
  const bestAnswer = qas[bestAnswerIndex];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Level Summary */}
      <div className="grid md:grid-cols-3 gap-8">
        <Card decoration="tack" className="md:col-span-1 flex flex-col items-center justify-center py-8">
          <ScoreCircle value={summary.session_score} label="Session Score" size="lg" />
          <div className="mt-8 w-full space-y-4">
            <ProgressBar value={summary.star_completion} label="STAR Completion %" color="success" />
          </div>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card decoration="tape">
            <h3 className="font-heading text-2xl text-pencil mb-3">Top Areas for Improvement</h3>
            <ul className="space-y-3">
              {summary.improvement_areas?.map((area, i) => (
                <li key={i} className="font-body text-lg text-pencil flex items-start">
                  <span className="text-marker mr-3 font-bold text-xl">→</span> {area}
                </li>
              ))}
            </ul>
          </Card>

          {bestAnswer && (
            <Card variant="postit">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="category">Best Answer (Q{bestAnswerIndex + 1})</Badge>
                <span className="font-body text-sm text-pencil/70 flex-1">{summary.best_answer?.reason}</span>
              </div>
              <p className="font-heading text-xl text-pencil mb-2">"{bestAnswer.question}"</p>
              <p className="font-body text-pencil/80 italic border-l-4 border-pen pl-4 py-1">"{bestAnswer.answer}"</p>
            </Card>
          )}
        </div>
      </div>

      {/* Answer Breakdown */}
      <h3 className="font-heading text-3xl text-pencil text-center mt-12 mb-6">Answer Breakdown</h3>
      <div className="space-y-4">
        {qas.map((qa, i) => {
          const perScore = summary.per_answer_score?.[i] || { clarity: 0, tone: 0, feedback: '' };
          const isExpanded = expandedIndex === i;

          return (
            <Card key={i} className="p-0 overflow-hidden wobbly-sm transition-all">
              {/* Header (Clickable) */}
              <button 
                onClick={() => toggleExpand(i)}
                className="w-full text-left p-4 md:p-6 flex items-center justify-between hover:bg-erased transition-colors"
              >
                <div className="flex-1 pr-4">
                  <Badge variant="neutral" className="mb-2">Question {i + 1}</Badge>
                  <h4 className="font-heading text-xl text-pencil">"{qa.question}"</h4>
                </div>
                {isExpanded ? <ChevronUp size={24} className="text-pencil flex-shrink-0" /> : <ChevronDown size={24} className="text-pencil flex-shrink-0" />}
              </button>

              {/* Body */}
              {isExpanded && (
                <div className="p-4 md:p-6 border-t-2 border-dashed border-pencil/30 bg-paper">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-heading text-lg text-pencil mb-2">Your Answer</h5>
                      <p className="font-body text-pencil/80 mb-6 bg-white p-3 border-2 border-pencil wobbly-sm">"{qa.answer}"</p>
                      
                      <h5 className="font-heading text-lg text-pencil mb-2">AI Feedback</h5>
                      <p className="font-body text-pencil/90">{perScore.feedback}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <STARIndicator starResult={qa.starResult} />
                      </div>
                      <div className="space-y-3 bg-white p-4 border-2 border-pencil wobbly-sm">
                        <ProgressBar value={perScore.clarity} label="Clarity" color="pen" showValue={false} />
                        <ProgressBar value={perScore.tone} label="Professional Tone" color="success" showValue={false} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center pt-8">
        <Button variant="primary" size="lg" onClick={onRetry}>
          <RefreshCw size={20} className="mr-2" />
          Start New Interview
        </Button>
      </div>
    </div>
  );
}
