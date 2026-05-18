import { useState, useEffect } from 'react';
import { Mic, Square, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import RoleSelector, { ROLES } from '../components/interview/RoleSelector.jsx';
import DifficultySelector, { DIFFICULTIES } from '../components/interview/DifficultySelector.jsx';
import QuestionCard from '../components/interview/QuestionCard.jsx';
import STARIndicator from '../components/interview/STARIndicator.jsx';
import SessionSummary from '../components/interview/SessionSummary.jsx';

import { useSpeechRecognition } from '../hooks/useSpeechRecognition.js';
import { useTextToSpeech } from '../hooks/useTextToSpeech.js';
import { generateInterviewQuestion, detectSTAR, generateSessionSummary } from '../lib/ai.js';
import { toast } from 'sonner';

const MAX_QUESTIONS = 3; // Keep it short for hackathon demo

export default function InterviewPrep() {
  const { t } = useTranslation();
  
  // Steps: 'setup' | 'generating' | 'session' | 'analyzing' | 'summary'
  const [step, setStep] = useState('setup');
  
  // Setup State
  const [role, setRole] = useState(ROLES[0].id);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0].id);
  
  // Session State
  const [qas, setQas] = useState([]); // Array of { question, answer, starResult }
  const [currentQuestion, setCurrentQuestion] = useState(null); // { question, followUpExpected }
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [summary, setSummary] = useState(null);
  
  // Hooks
  const { isListening, transcript, interimTranscript, startListening, stopListening, isSupported } = useSpeechRecognition({ maxSeconds: 120 });
  const { speak, stop: stopTTS, isSpeaking } = useTextToSpeech();

  // Handle TTS
  const toggleTTS = () => {
    if (isSpeaking) stopTTS();
    else if (currentQuestion) speak(currentQuestion.question);
  };

  // Start Session
  const handleStartSession = async () => {
    if (!isSupported) {
      toast.error('Speech recognition is not supported in your browser.');
      return;
    }
    setQas([]);
    setSummary(null);
    setIsFollowUp(false);
    await fetchNextQuestion([]);
  };

  const fetchNextQuestion = async (history) => {
    setStep('generating');
    try {
      const q = await generateInterviewQuestion(role, difficulty, history);
      setCurrentQuestion(q);
      setIsFollowUp(q.followUpExpected);
      setStep('session');
      // Auto read question
      setTimeout(() => speak(q.question), 500);
    } catch (e) {
      toast.error('Failed to generate question. Please try again.');
      setStep('setup');
    }
  };

  const handleStartRecording = () => {
    if (isSpeaking) stopTTS();
    startListening();
  };

  const handleStopRecording = async () => {
    stopListening();
    if (!transcript.trim()) {
      toast.error('No speech detected. Please try again.');
      return;
    }

    setStep('analyzing');
    
    try {
      // 1. Detect STAR
      const starResult = await detectSTAR(transcript);
      
      // 2. Save QA
      const newQa = {
        question: currentQuestion.question,
        answer: transcript,
        starResult
      };
      const updatedQas = [...qas, newQa];
      setQas(updatedQas);

      // 3. Check if we should continue or end
      if (updatedQas.length >= MAX_QUESTIONS) {
        // End session
        const sessionSummary = await generateSessionSummary(updatedQas, role, difficulty);
        setSummary(sessionSummary);
        setStep('summary');
      } else {
        // Next question
        await fetchNextQuestion(updatedQas);
      }
    } catch (e) {
      toast.error('Failed to analyze answer.');
      setStep('session'); // let them try again or we could abort
    }
  };

  const handleRetry = () => {
    setStep('setup');
    setQas([]);
    setSummary(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      <PageHeader 
        title={t('nav.interview')} 
        subtitle="Mock interviews with dynamic questions and STAR method evaluation."
        align="left"
      />

      {step === 'setup' && (
        <div className="mt-8 space-y-8 animate-fade-in">
          <Card decoration="tape">
            <h2 className="font-heading text-2xl text-pencil mb-4">1. Select Your Role</h2>
            <RoleSelector selected={role} onSelect={setRole} />
          </Card>
          
          <Card decoration="tack" variant="postit">
            <h2 className="font-heading text-2xl text-pencil mb-4">2. Select Difficulty</h2>
            <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
          </Card>

          <div className="flex justify-end">
            <Button variant="primary" size="lg" onClick={handleStartSession}>
              Start Mock Interview
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 'generating' && (
        <Card className="mt-8 flex flex-col items-center py-16 text-center animate-fade-in">
          <Skeleton variant="line" lines={2} className="w-64 mx-auto mb-6" />
          <h2 className="font-heading text-3xl text-pencil mb-2">Preparing Question...</h2>
          <p className="font-body text-pencil/70">Gemini is reviewing your profile and history.</p>
        </Card>
      )}

      {(step === 'session' || step === 'analyzing') && currentQuestion && (
        <div className="mt-8 animate-fade-in">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="font-heading text-xl text-pencil">
              Question {qas.length + 1} of {MAX_QUESTIONS}
            </span>
            <span className="font-body text-pencil/70 bg-white px-3 py-1 border-2 border-pencil wobbly-sm shadow-hard-sm">
              Role: {role}
            </span>
          </div>

          <QuestionCard 
            question={currentQuestion.question} 
            current={qas.length + 1} 
            total={MAX_QUESTIONS}
            isFollowUp={isFollowUp}
            isSpeaking={isSpeaking}
            onToggleTTS={toggleTTS}
          />

          <Card className="mt-6 border-2 border-dashed border-pencil/50 bg-white/50">
            <div className="flex flex-col items-center py-6">
              {step === 'analyzing' ? (
                <div className="text-center w-full">
                  <Skeleton variant="circle" className="mx-auto mb-6" />
                  <h3 className="font-heading text-2xl text-pencil">Analyzing Answer...</h3>
                  <p className="font-body text-pencil/70">Checking for STAR method components.</p>
                </div>
              ) : isListening ? (
                <div className="w-full flex flex-col items-center animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-marker border-[3px] border-pencil flex items-center justify-center mb-6 animate-pulse-mic shadow-[4px_4px_0px_0px_#ff4d4d]">
                    <Mic size={40} color="white" />
                  </div>
                  
                  <div className="w-full max-w-2xl bg-erased min-h-[100px] p-4 border-[2px] border-pencil border-dashed wobbly-sm font-body text-lg text-pencil/80 mb-8 text-center">
                    {transcript} <span className="opacity-50">{interimTranscript}</span>
                  </div>

                  <Button variant="danger" size="lg" onClick={handleStopRecording}>
                    <Square size={20} className="mr-2" fill="currentColor" />
                    Submit Answer
                  </Button>
                </div>
              ) : (
                <div className="text-center animate-fade-in">
                  <STARIndicator starResult={null} />
                  <p className="font-body text-pencil/70 mt-6 mb-6 max-w-md mx-auto">
                    Try to structure your answer using the STAR method for the best score.
                  </p>
                  <Button variant="primary" size="lg" onClick={handleStartRecording}>
                    <Mic size={20} className="mr-2" />
                    Start Answering
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {step === 'summary' && summary && (
        <div className="mt-8">
          <SessionSummary summary={summary} qas={qas} onRetry={handleRetry} />
        </div>
      )}
    </div>
  );
}
