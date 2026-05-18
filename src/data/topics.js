/**
 * Office scenario topics for Speaking Practice.
 * 25 topics across 5 categories.
 */

export const CATEGORIES = ['Meeting', 'Escalation', 'Feedback', 'Async', 'Onboarding'];

/** @type {{ id: string, topic: string, category: string }[]} */
export const TOPICS = [
  // Meeting
  { id: 'M1', category: 'Meeting', topic: 'Give a project status update to your manager.' },
  { id: 'M2', category: 'Meeting', topic: 'Summarize the key decisions from today\'s sprint planning meeting.' },
  { id: 'M3', category: 'Meeting', topic: 'Propose a new idea to your team during a brainstorming session.' },
  { id: 'M4', category: 'Meeting', topic: 'Disagree politely with a colleague\'s suggestion in a team meeting.' },
  { id: 'M5', category: 'Meeting', topic: 'Wrap up a standup meeting and assign action items.' },

  // Escalation
  { id: 'E1', category: 'Escalation', topic: 'Tell your team that the deadline has been pushed back by one week.' },
  { id: 'E2', category: 'Escalation', topic: 'Explain to your manager why a feature will miss the release date.' },
  { id: 'E3', category: 'Escalation', topic: 'Communicate a production incident to stakeholders on a group call.' },
  { id: 'E4', category: 'Escalation', topic: 'Escalate a blocker to a senior engineer without being alarmist.' },
  { id: 'E5', category: 'Escalation', topic: 'Inform a client that their requested feature requires more time than estimated.' },

  // Feedback
  { id: 'F1', category: 'Feedback', topic: 'Give constructive feedback on a colleague\'s presentation.' },
  { id: 'F2', category: 'Feedback', topic: 'Respond to critical feedback from your manager about your recent work.' },
  { id: 'F3', category: 'Feedback', topic: 'Praise a team member\'s contribution during a retrospective.' },
  { id: 'F4', category: 'Feedback', topic: 'Give feedback to a junior developer on their first pull request.' },
  { id: 'F5', category: 'Feedback', topic: 'Ask your manager for feedback on your performance over the last quarter.' },

  // Async
  { id: 'A1', category: 'Async', topic: 'Leave a Slack message requesting a deadline extension from your manager.' },
  { id: 'A2', category: 'Async', topic: 'Write a Loom video message explaining a complex technical decision to your team.' },
  { id: 'A3', category: 'Async', topic: 'Summarize a long email thread into a concise Slack update.' },
  { id: 'A4', category: 'Async', topic: 'Respond to a client\'s urgent request when you need more time to investigate.' },
  { id: 'A5', category: 'Async', topic: 'Send a check-in message to a remote colleague you haven\'t heard from in two days.' },

  // Onboarding
  { id: 'O1', category: 'Onboarding', topic: 'Introduce yourself to a new international team on your first day.' },
  { id: 'O2', category: 'Onboarding', topic: 'Explain your role and responsibilities to a new team member.' },
  { id: 'O3', category: 'Onboarding', topic: 'Ask clarifying questions during your first week without sounding lost.' },
  { id: 'O4', category: 'Onboarding', topic: 'Share your working style and timezone with a distributed team.' },
  { id: 'O5', category: 'Onboarding', topic: 'Summarize what you\'ve learned in your first week during a check-in with your manager.' },
];

/** Returns a random topic from any category */
export function getRandomTopic() {
  return TOPICS[Math.floor(Math.random() * TOPICS.length)];
}

/** Returns a random topic from a specific category */
export function getRandomTopicByCategory(category) {
  const filtered = TOPICS.filter((t) => t.category === category);
  if (!filtered.length) return getRandomTopic();
  return filtered[Math.floor(Math.random() * filtered.length)];
}

/** Returns a random topic different from the current one */
export function getNewRandomTopic(currentId) {
  const others = TOPICS.filter((t) => t.id !== currentId);
  return others[Math.floor(Math.random() * others.length)];
}
