/**
 * Daily Office Scenarios for the bonus feature.
 * 7 scenarios, one for each day of the week.
 */

export const DAILY_SCENARIOS = [
  {
    id: 'D1',
    scenario: "Your client just pushed back the launch deadline by two weeks. How do you communicate this to your team on a group call to keep morale high?",
    vocabHints: ['push back', 'align', 'next steps', 'bandwidth', 'silver lining'],
    timeLimit: 90,
    evaluatedOn: ['Vocabulary Usage', 'Speaking Quality', 'Professional Tone']
  },
  {
    id: 'D2',
    scenario: "A critical bug was found in production right before the weekend. Propose a plan to the engineering team on Slack (spoken as if dictating).",
    vocabHints: ['blocker', 'deploy', 'all hands on deck', 'rollback', 'post-mortem'],
    timeLimit: 60,
    evaluatedOn: ['Vocabulary Usage', 'Speaking Quality', 'Professional Tone']
  },
  {
    id: 'D3',
    scenario: "You need to ask your manager for an extension on a project because you were pulled into urgent support tickets. How do you ask professionally?",
    vocabHints: ['bandwidth', 'prioritize', 'EOD', 'timeline', 'compromise'],
    timeLimit: 60,
    evaluatedOn: ['Vocabulary Usage', 'Speaking Quality', 'Professional Tone']
  },
  {
    id: 'D4',
    scenario: "During a retro, give constructive feedback to a colleague who has been merging code without getting reviews first.",
    vocabHints: ['constructive', 'process', 'bottleneck', 'quality', 'sync up'],
    timeLimit: 90,
    evaluatedOn: ['Vocabulary Usage', 'Speaking Quality', 'Professional Tone']
  },
  {
    id: 'D5',
    scenario: "Introduce a new remote work tool (like Notion or Miro) to your team and explain why it will improve your workflow.",
    vocabHints: ['streamline', 'centralize', 'learning curve', 'adopt', 'efficiency'],
    timeLimit: 90,
    evaluatedOn: ['Vocabulary Usage', 'Speaking Quality', 'Professional Tone']
  },
  {
    id: 'D6',
    scenario: "A stakeholder is asking for a feature that is out of scope for this sprint. Politely say no and explain why.",
    vocabHints: ['pushback', 'scope creep', 'backlog', 'sprint', 'compromise'],
    timeLimit: 60,
    evaluatedOn: ['Vocabulary Usage', 'Speaking Quality', 'Professional Tone']
  },
  {
    id: 'D7',
    scenario: "Lead a quick morning standup update. Share what you did yesterday, what you're doing today, and any blockers.",
    vocabHints: ['progress', 'focus', 'blocker', 'on track', 'wrap up'],
    timeLimit: 60,
    evaluatedOn: ['Vocabulary Usage', 'Speaking Quality', 'Professional Tone']
  }
];

/**
 * Gets a deterministic daily scenario based on the current day of the year.
 */
export function getTodayScenario() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = dayOfYear % DAILY_SCENARIOS.length;
  return DAILY_SCENARIOS[index];
}
