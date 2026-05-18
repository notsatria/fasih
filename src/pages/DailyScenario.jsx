import { useState, useEffect } from 'react';
import { Mic, Square, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import ScoreCircle from '../components/ui/ScoreCircle.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import ScenarioCard from '../components/daily/ScenarioCard.jsx';
import VocabWarmup from '../components/daily/VocabWarmup.jsx';
import { getTodayScenario } from '../data/dailyScenarios.js';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition.js';
import { evaluateDailyScenario } from '../lib/ai.js';
import { toast } from 'sonner';

export default function DailyScenario() {
  const { t } = useTranslation();
  
  // State: 'intro' | 'warmup' | 'recording' | 'analyzing' | 'feedback'
  const [step, setStep] = useState('intro');
  const [scenario, setScenario] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const { isListening, transcript, interimTranscript, startListening, stopListening, isSupported } = useSpeechRecognition({ maxSeconds: scenario?.timeLimit || 90 });

  useEffect(() => {
    setScenario(getTodayScenario());
  }, []);

  const handleStartWarmup = () => setStep('warmup');
  
  const handleStartRecording = () => {
    if (!isSupported) {
      toast.error('Speech recognition is not supported in your browser.');
      return;
    }
    setStep('recording');
    startListening();
  };

  const handleStopRecording = async () => {
    stopListening();
    if (!transcript.trim()) {
      toast.error('No speech detected.');
      setStep('warmup'); // Let them try again
      return;
    }

    setStep('analyzing');
    try {
      const result = await evaluateDailyScenario(scenario.scenario, scenario.vocabHints, transcript);
      setFeedback(result);
      setStep('feedback');
    } catch (e) {
      toast.error('Failed to analyze audio.');
      setStep('warmup');
    }
  };

  if (!scenario) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      <PageHeader 
        title={t('nav.daily')} 
        subtitle="A quick, 2-minute scenario to practice your workplace English."
        align="left"
        decoration={<Sparkles size={40} className="text-marker" />}
      />

      {step === 'intro' && (
        <div className="animate-fade-in">
          <ScenarioCard 
            scenario={scenario.scenario} 
            timeLimit={scenario.timeLimit} 
            vocabHints={scenario.vocabHints} 
          />
          <div className="flex justify-center mt-8">
            <Button variant="primary" size="lg" onClick={handleStartWarmup}>
              Start Warm-up
            </Button>
          </div>
        </div>
      )}

      {step === 'warmup' && (
        <div className="animate-fade-in">
          <ScenarioCard 
            scenario={scenario.scenario} 
            timeLimit={scenario.timeLimit} 
            vocabHints={scenario.vocabHints} 
          />
          <VocabWarmup vocabHints={scenario.vocabHints} onComplete={handleStartRecording} />
        </div>
      )}

      {step === 'recording' && (
        <div className="mt-8 animate-fade-in">
          <Card className="border-marker shadow-[6px_6px_0px_0px_#ff4d4d] flex flex-col items-center py-12">
            <div className="flex justify-between w-full px-4 mb-8 text-pencil font-heading text-xl">
              <span>Time Limit: {scenario.timeLimit}s</span>
            </div>
            
            <div className="w-24 h-24 rounded-full bg-marker border-[3px] border-pencil flex items-center justify-center mb-6 animate-pulse-mic">
              <Mic size={48} color="white" />
            </div>
            <h2 className="font-heading text-3xl text-pencil mb-8">Recording...</h2>
            
            <div className="w-full max-w-2xl bg-erased min-h-[120px] p-6 border-[2px] border-pencil border-dashed wobbly-sm font-body text-lg text-pencil/80 mb-8 text-center">
              {transcript} <span className="opacity-50">{interimTranscript}</span>
            </div>

            <Button variant="danger" size="lg" onClick={handleStopRecording}>
              <Square size={20} className="mr-2" fill="currentColor" />
              Finish & Evaluate
            </Button>
          </Card>
        </div>
      )}

      {step === 'analyzing' && (
        <Card className="mt-8 flex flex-col items-center py-16 text-center animate-fade-in">
          <Skeleton variant="circle" />
          <h2 className="font-heading text-3xl text-pencil mt-8 mb-2">Analyzing response...</h2>
          <p className="font-body text-pencil/60">Checking if you nailed the recommended vocabulary.</p>
        </Card>
      )}

      {step === 'feedback' && feedback && (
        <div className="mt-8 grid md:grid-cols-3 gap-8 animate-fade-in">
          <Card decoration="tack" className="md:col-span-1 flex flex-col items-center justify-center py-8">
            <ScoreCircle value={feedback.overall_score} label="Daily Score" size="lg" />
            <div className="mt-6 w-full space-y-4">
              <ProgressBar value={feedback.speaking_quality} label="Speaking Quality" color="pen" />
              <ProgressBar value={feedback.professional_tone} label="Professional Tone" color="success" />
              <ProgressBar value={feedback.vocabulary_usage_score} label="Vocab Usage" color="warning" />
            </div>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <Card decoration="tape">
              <h3 className="font-heading text-2xl text-pencil mb-3">Vocabulary Used</h3>
              <p className="font-body text-lg text-pencil/90 mb-4">{feedback.positive_note}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {scenario.vocabHints.map(hint => {
                  const used = feedback.words_used?.some(w => w.toLowerCase().includes(hint.toLowerCase()) || hint.toLowerCase().includes(w.toLowerCase()));
                  return (
                    <Badge key={hint} variant={used ? 'success' : 'neutral'}>
                      {hint} {used && '✅'}
                    </Badge>
                  );
                })}
              </div>
            </Card>

            <Card variant="postit">
              <h3 className="font-heading text-2xl text-pencil mb-3">Tips for Tomorrow</h3>
              <ul className="space-y-2">
                {feedback.suggestions?.map((s, i) => (
                  <li key={i} className="font-body text-lg text-pencil flex items-start">
                    <span className="text-marker mr-2 font-bold">→</span> {s}
                  </li>
                ))}
              </ul>
            </Card>

            <div className="flex justify-center pt-4">
              <Button variant="secondary" onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
