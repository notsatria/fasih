import { useState, useEffect } from 'react';
import { Mic, Square, RefreshCw, Volume2 } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import ScoreCircle from '../components/ui/ScoreCircle.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import { CATEGORIES, getRandomTopicByCategory, getNewRandomTopic } from '../data/topics.js';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition.js';
import { useTextToSpeech } from '../hooks/useTextToSpeech.js';
import { analyseSpeaking } from '../lib/ai.js';
import { toast } from 'sonner';

export default function SpeakingPractice() {
  const { t, lang } = useTranslation();
  
  // Steps: 'setup' | 'recording' | 'analyzing' | 'feedback'
  const [step, setStep] = useState('setup');
  
  // Setup State
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [topic, setTopic] = useState(null);
  
  // AI Feedback State
  const [feedback, setFeedback] = useState(null);
  
  // Hooks
  const { isListening, transcript, interimTranscript, startListening, stopListening, isSupported } = useSpeechRecognition({ maxSeconds: 120, lang: 'en-US' });
  const { speak, stop: stopTTS, isSpeaking } = useTextToSpeech();

  // Initialize topic on category change
  useEffect(() => {
    if (step === 'setup') {
      setTopic(getRandomTopicByCategory(category));
    }
  }, [category, step]);

  const handleShuffle = () => {
    if (topic) {
      setTopic(getNewRandomTopic(topic.id));
    }
  };

  const handleStart = () => {
    if (!isSupported) {
      toast.error('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }
    setStep('recording');
    setFeedback(null);
    startListening();
  };

  const handleStop = async () => {
    stopListening();
    if (!transcript.trim()) {
      toast.error('No speech detected. Please try again.');
      setStep('setup');
      return;
    }
    
    setStep('analyzing');
    try {
      const result = await analyseSpeaking(topic.topic, topic.category, transcript);
      setFeedback(result);
      setStep('feedback');
    } catch (err) {
      toast.error('Failed to analyze speech. Check your API key.');
      setStep('setup');
    }
  };

  const handleRetry = () => {
    setStep('setup');
    setFeedback(null);
  };

  const playTTS = (text) => {
    if (isSpeaking) {
      stopTTS();
    } else {
      speak(text);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      <PageHeader 
        title={t('nav.speaking')} 
        subtitle="Practice office scenarios and get instant AI feedback on your clarity and tone."
        align="left"
      />

      {step === 'setup' && (
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <Card decoration="tape" className="space-y-6">
            <h2 className="font-heading text-2xl text-pencil">1. Choose a Category</h2>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`
                    px-4 py-2 border-[2px] border-pencil wobbly-sm font-body text-lg transition-all
                    ${category === c ? 'bg-marker text-white shadow-[2px_2px_0px_0px_#2d2d2d] translate-x-[1px] translate-y-[1px]' : 'bg-white text-pencil hover:bg-erased'}
                  `}
                >
                  {c}
                </button>
              ))}
            </div>
          </Card>

          <Card decoration="tack" variant="postit" className="flex flex-col">
            <h2 className="font-heading text-2xl text-pencil mb-4">2. Your Scenario</h2>
            {topic ? (
              <>
                <p className="font-body text-xl text-pencil/90 leading-relaxed flex-grow">
                  "{topic.topic}"
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <Button variant="secondary" onClick={handleShuffle} className="flex-1">
                    <RefreshCw size={18} className="mr-2" />
                    Shuffle
                  </Button>
                  <Button variant="primary" onClick={handleStart} className="flex-1 text-xl">
                    <Mic size={20} className="mr-2" />
                    Start
                  </Button>
                </div>
              </>
            ) : (
              <Skeleton variant="line" lines={3} />
            )}
          </Card>
        </div>
      )}

      {step === 'recording' && (
        <Card className="mt-8 border-marker shadow-[6px_6px_0px_0px_#ff4d4d] animate-pulse-mic flex flex-col items-center py-12">
          <div className="w-24 h-24 rounded-full bg-marker border-[3px] border-pencil flex items-center justify-center mb-6">
            <Mic size={48} color="white" />
          </div>
          <h2 className="font-heading text-3xl text-pencil mb-2">Recording...</h2>
          <p className="font-body text-pencil/70 mb-8 max-w-lg text-center">
            {topic?.topic}
          </p>
          
          <div className="w-full max-w-2xl bg-erased min-h-[120px] p-6 border-[2px] border-pencil border-dashed wobbly-sm font-body text-lg text-pencil/80 mb-8">
            {transcript} <span className="opacity-50">{interimTranscript}</span>
          </div>

          <Button variant="danger" size="lg" onClick={handleStop}>
            <Square size={20} className="mr-2" fill="currentColor" />
            Stop & Analyze
          </Button>
        </Card>
      )}

      {step === 'analyzing' && (
        <Card className="mt-8 flex flex-col items-center py-16">
          <Skeleton variant="circle" />
          <h2 className="font-heading text-3xl text-pencil mt-8 mb-2">Analyzing your speech...</h2>
          <p className="font-body text-pencil/60">Gemini is reviewing your vocabulary and tone.</p>
        </Card>
      )}

      {step === 'feedback' && feedback && (
        <div className="mt-8 space-y-8 animate-fade-in">
          <div className="grid md:grid-cols-3 gap-8">
            <Card decoration="tack" className="md:col-span-1 flex flex-col items-center justify-center py-8">
              <ScoreCircle value={feedback.overall_score} label="Overall Score" size="lg" />
              <div className="mt-6 w-full space-y-4">
                <ProgressBar value={feedback.clarity} label="Clarity" color="pen" />
                <ProgressBar value={feedback.professional_tone} label="Professional Tone" color="success" />
                <ProgressBar value={feedback.vocabulary_range} label="Vocabulary" color="warning" />
                <ProgressBar value={feedback.grammar} label="Grammar" color="marker" />
              </div>
            </Card>

            <div className="md:col-span-2 space-y-6">
              <Card decoration="tape">
                <h3 className="font-heading text-2xl text-pencil mb-3">Positives</h3>
                <p className="font-body text-lg text-pencil/90">{feedback.positive_note}</p>
                
                {feedback.filler_words?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-heading text-xl text-pencil mb-2">Filler Words Detected</h3>
                    <div className="flex flex-wrap gap-2">
                      {feedback.filler_words.map(w => (
                        <Badge key={w} variant="filler">{w}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              <Card variant="postit">
                <h3 className="font-heading text-2xl text-pencil mb-4">Native Rewrites</h3>
                <div className="space-y-4">
                  {feedback.native_rewrites?.map((r, i) => (
                    <div key={i} className="border-b-2 border-pencil/20 border-dashed pb-4 last:border-0">
                      <p className="font-body text-marker line-through opacity-70 mb-1">"{r.original}"</p>
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-body text-[#0F6E56] font-bold text-lg">"{r.improved}"</p>
                        <button onClick={() => playTTS(r.improved)} className="p-2 hover:bg-[#0F6E56]/10 rounded-full transition-colors flex-shrink-0">
                          <Volume2 size={20} className="text-[#0F6E56]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-heading text-2xl text-pencil mb-3">Actionable Tips</h3>
                <ul className="space-y-2">
                  {feedback.suggestions?.map((s, i) => (
                    <li key={i} className="font-body text-lg text-pencil flex items-start">
                      <span className="text-marker mr-2 font-bold">→</span> {s}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="primary" size="lg" onClick={handleRetry}>
              <RefreshCw size={20} className="mr-2" />
              Practice Another Scenario
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
