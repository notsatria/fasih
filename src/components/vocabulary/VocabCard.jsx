import { useState } from 'react';
import { Mic, Square, Eye, Volume2, ArrowRight } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import Skeleton from '../ui/Skeleton.jsx';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition.js';
import { useTextToSpeech } from '../../hooks/useTextToSpeech.js';
import { evaluateVocabSentence } from '../../lib/ai.js';
import { toast } from 'sonner';

export default function VocabCard({ vocab, onNext }) {
  // state: 'context' | 'revealed' | 'recording' | 'evaluating' | 'result'
  const [state, setState] = useState('context');
  const [result, setResult] = useState(null);
  
  const { isListening, transcript, interimTranscript, startListening, stopListening } = useSpeechRecognition({ maxSeconds: 30 });
  const { speak, stop: stopTTS, isSpeaking } = useTextToSpeech();

  const handleReveal = () => setState('revealed');

  const handleStartRecording = () => {
    if (isSpeaking) stopTTS();
    setState('recording');
    startListening();
  };

  const handleStopRecording = async () => {
    stopListening();
    if (!transcript.trim()) {
      toast.error('No speech detected.');
      setState('revealed');
      return;
    }
    setState('evaluating');
    try {
      const evaluation = await evaluateVocabSentence(vocab.word, vocab.definition, transcript);
      setResult(evaluation);
      setState('result');
    } catch (e) {
      toast.error('Evaluation failed. Please try again.');
      setState('revealed');
    }
  };

  const playTTS = (text) => {
    if (isSpeaking) stopTTS();
    else speak(text);
  };

  const getVerdictBadge = (verdict) => {
    if (verdict === 'Natural') return <Badge variant="success">Natural Usage</Badge>;
    if (verdict === 'Incorrect usage') return <Badge variant="warning">Needs Work</Badge>;
    return <Badge variant="category">Correct but Unnatural</Badge>; // pen blue
  };

  return (
    <Card decoration="tape" className="max-w-2xl mx-auto mt-8 relative overflow-hidden transition-all duration-300">
      <div className="absolute top-4 right-4 flex gap-2">
        <Badge variant="neutral">{vocab.difficulty}</Badge>
      </div>

      <div className="text-center mt-6 mb-8">
        <h2 className="font-heading text-5xl text-pencil mb-6">{vocab.word}</h2>
        
        <p className="font-body text-xl text-pencil/80 italic bg-erased p-4 border-l-4 border-pen inline-block text-left w-full max-w-lg shadow-hard-sm">
          "{vocab.contextSentence}"
        </p>
      </div>

      {state === 'context' && (
        <div className="flex justify-center mt-8">
          <Button variant="primary" onClick={handleReveal}>
            <Eye size={20} className="mr-2" />
            Reveal Definition
          </Button>
        </div>
      )}

      {(state !== 'context') && (
        <div className="animate-fade-in border-t-2 border-dashed border-pencil/20 pt-6">
          <h3 className="font-heading text-xl text-pencil mb-2">Definition</h3>
          <p className="font-body text-lg text-pencil/90 mb-8">{vocab.definition}</p>

          <div className="bg-paper p-6 border-2 border-pencil wobbly-sm">
            <h4 className="font-heading text-xl text-pencil mb-4">Practice: Use it in a sentence</h4>
            
            {state === 'revealed' && (
              <div className="flex justify-center">
                <Button variant="primary" onClick={handleStartRecording}>
                  <Mic size={20} className="mr-2" />
                  Tap to Speak
                </Button>
              </div>
            )}

            {state === 'recording' && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-marker border-2 border-pencil flex items-center justify-center mb-4 animate-pulse-mic shadow-[4px_4px_0px_0px_#ff4d4d]">
                  <Mic size={24} color="white" />
                </div>
                <div className="w-full bg-white min-h-[60px] p-3 border-2 border-pencil wobbly-sm font-body text-pencil/80 mb-4 text-center">
                  {transcript} <span className="opacity-50">{interimTranscript}</span>
                </div>
                <Button variant="danger" onClick={handleStopRecording}>
                  <Square size={16} className="mr-2" fill="currentColor" />
                  Stop & Evaluate
                </Button>
              </div>
            )}

            {state === 'evaluating' && (
              <div className="text-center py-6">
                <Skeleton variant="line" lines={2} className="w-3/4 mx-auto mb-4" />
                <p className="font-body text-pencil/70">Evaluating your sentence...</p>
              </div>
            )}

            {state === 'result' && result && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="flex items-center gap-3">
                  {getVerdictBadge(result.verdict)}
                </div>
                
                <p className="font-body text-pencil/90 bg-white p-3 border-2 border-pencil wobbly-sm">
                  "{transcript}"
                </p>

                <p className="font-body text-pencil/80">{result.explanation}</p>

                {result.improved_version && (
                  <div className="mt-4 pt-4 border-t border-dashed border-pencil/30">
                    <h5 className="font-heading text-lg text-[#0F6E56] mb-2">Native Suggestion:</h5>
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-body text-[#0F6E56] font-bold text-lg">"{result.improved_version}"</p>
                      <button onClick={() => playTTS(result.improved_version)} className="p-2 hover:bg-[#0F6E56]/10 rounded-full transition-colors flex-shrink-0">
                        <Volume2 size={20} className="text-[#0F6E56]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {(state === 'result' || state === 'revealed') && (
        <div className="flex justify-end mt-8">
          <Button variant={state === 'result' ? 'primary' : 'secondary'} onClick={onNext}>
            Next Word
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      )}
    </Card>
  );
}
