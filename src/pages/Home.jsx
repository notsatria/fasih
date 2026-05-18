import { ArrowRight, Sparkles, MessageSquare, Briefcase, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../i18n/useTranslation.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import { getTodayScenario } from '../data/dailyScenarios.js';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const todayScenario = getTodayScenario();

  return (
    <div className="max-w-5xl mx-auto px-6 pb-20 pt-12 animate-fade-in">
      
      {/* Hero Section */}
      <div className="text-center relative mb-20">
        <div className="hidden md:block absolute top-0 right-12 animate-bounce-gentle">
          <Sparkles size={48} className="text-marker" />
        </div>
        
        <h1 className="font-heading text-6xl md:text-8xl text-pencil mb-4 leading-tight">
          Speak English<br/>with Confidence.
        </h1>
        <p className="font-body text-xl md:text-2xl text-pencil/80 max-w-2xl mx-auto mb-10">
          The AI-powered practice platform for professionals. Master office scenarios, ace interviews, and expand your vocabulary.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          <Button variant="primary" size="lg" onClick={() => navigate('/speaking')} className="text-xl px-10 py-4">
            Start Practicing
            <ArrowRight size={24} className="ml-2" />
          </Button>

          {/* Decorative Arrow */}
          <div className="hidden md:block absolute left-1/2 -bottom-16 -translate-x-48 w-32 h-32 opacity-70 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 90 Q 30 50 80 20" stroke="#2d2d2d" strokeWidth="3" strokeDasharray="5,5" fill="none" />
              <path d="M70 15 L 85 15 L 80 30" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card variant="default" hover={true} onClick={() => navigate('/speaking')} className="cursor-pointer">
          <div className="w-12 h-12 bg-white border-2 border-pencil rounded-full flex items-center justify-center mb-4">
            <MessageSquare size={24} className="text-pencil" />
          </div>
          <h3 className="font-heading text-2xl text-pencil mb-2">Speaking Practice</h3>
          <p className="font-body text-pencil/70">
            Simulate 25+ real office scenarios. Get instant AI feedback on clarity, tone, and grammar.
          </p>
        </Card>

        <Card variant="postit" decoration="tack" hover={true} onClick={() => navigate('/interview')} className="cursor-pointer">
          <div className="w-12 h-12 bg-white border-2 border-pencil rounded-full flex items-center justify-center mb-4">
            <Briefcase size={24} className="text-pencil" />
          </div>
          <h3 className="font-heading text-2xl text-pencil mb-2">Interview Prep</h3>
          <p className="font-body text-pencil/70">
            Dynamic mock interviews. Master the STAR method with real-time tracking and suggestions.
          </p>
        </Card>

        <Card variant="default" hover={true} onClick={() => navigate('/vocabulary')} className="cursor-pointer">
          <div className="w-12 h-12 bg-white border-2 border-pencil rounded-full flex items-center justify-center mb-4">
            <BookOpen size={24} className="text-pencil" />
          </div>
          <h3 className="font-heading text-2xl text-pencil mb-2">Vocabulary</h3>
          <p className="font-body text-pencil/70">
            Learn 30+ essential workplace idioms. Practice using them in spoken sentences.
          </p>
        </Card>
      </div>

      {/* Daily Challenge Banner */}
      <Card decoration="tape" className="bg-erased flex flex-col md:flex-row items-center justify-between p-8">
        <div className="mb-6 md:mb-0 md:pr-8">
          <Badge variant="warning" className="mb-3 bg-white">Daily Bonus</Badge>
          <h3 className="font-heading text-3xl text-pencil mb-2">Today's Scenario</h3>
          <p className="font-body text-xl text-pencil/90 line-clamp-2 italic border-l-4 border-pen pl-3">
            "{todayScenario.scenario}"
          </p>
        </div>
        <Button variant="secondary" size="lg" onClick={() => navigate('/daily')} className="flex-shrink-0 whitespace-nowrap">
          Take Challenge
        </Button>
      </Card>
      
    </div>
  );
}
