/**
 * Vocabulary dataset for the office context.
 * Over 30 words categorized by common remote work themes.
 */

export const CATEGORIES = ['Meetings', 'Email / Async', 'Feedback Culture', 'Remote Work Tools'];

/** @type {{ id: string, word: string, contextSentence: string, definition: string, category: string, difficulty: 'Beginner' | 'Intermediate' | 'Advanced' }[]} */
export const VOCABULARY = [
  // Meetings
  {
    id: 'V1',
    word: 'Sync up',
    contextSentence: "Let's sync up after the standup to align on the blocker.",
    definition: 'To meet briefly in order to share updates and align on decisions.',
    category: 'Meetings',
    difficulty: 'Intermediate',
  },
  {
    id: 'V2',
    word: 'Align',
    contextSentence: "We need to align on the project goals before we start building.",
    definition: 'To ensure everyone has the same understanding or agreement on a topic.',
    category: 'Meetings',
    difficulty: 'Intermediate',
  },
  {
    id: 'V3',
    word: 'Take offline',
    contextSentence: "That's a great point, but let's take it offline to keep this meeting focused.",
    definition: 'To discuss a topic outside of the current meeting to save time.',
    category: 'Meetings',
    difficulty: 'Intermediate',
  },
  {
    id: 'V4',
    word: 'Touch base',
    contextSentence: "I'll touch base with you next week to see how the project is progressing.",
    definition: 'To briefly contact someone to give or receive an update.',
    category: 'Meetings',
    difficulty: 'Beginner',
  },
  {
    id: 'V5',
    word: 'Circle back',
    contextSentence: "Let me check with the engineering team and I'll circle back to you by EOD.",
    definition: 'To follow up on a previously discussed topic at a later time.',
    category: 'Meetings',
    difficulty: 'Intermediate',
  },
  {
    id: 'V6',
    word: 'Deep dive',
    contextSentence: "Next week we'll do a deep dive into the Q3 metrics.",
    definition: 'An in-depth examination or analysis of a specific topic.',
    category: 'Meetings',
    difficulty: 'Intermediate',
  },
  {
    id: 'V7',
    word: 'Action item',
    contextSentence: "I've added three new action items to our Jira board based on today's discussion.",
    definition: 'A specific task or action that needs to be completed, usually arising from a meeting.',
    category: 'Meetings',
    difficulty: 'Beginner',
  },
  {
    id: 'V8',
    word: 'Table this',
    contextSentence: "Let's table this discussion until the product manager is back from vacation.",
    definition: 'To postpone a discussion or decision until a later time.',
    category: 'Meetings',
    difficulty: 'Intermediate',
  },

  // Email / Async
  {
    id: 'V9',
    word: 'EOD',
    contextSentence: "Please send me the report by EOD.",
    definition: 'End Of Day. Usually implies the end of the working day in the sender\'s timezone.',
    category: 'Email / Async',
    difficulty: 'Beginner',
  },
  {
    id: 'V10',
    word: 'Ping',
    contextSentence: "Just ping me on Slack when the deployment is finished.",
    definition: 'To send a quick message to someone, usually via chat.',
    category: 'Email / Async',
    difficulty: 'Beginner',
  },
  {
    id: 'V11',
    word: 'Thread',
    contextSentence: "I've answered your question in the original thread.",
    definition: 'A connected series of messages or emails on a single topic.',
    category: 'Email / Async',
    difficulty: 'Beginner',
  },
  {
    id: 'V12',
    word: 'Bandwidth',
    contextSentence: "Do you have the bandwidth to take on an extra ticket this sprint?",
    definition: 'The capacity, time, or energy someone has to take on additional work.',
    category: 'Email / Async',
    difficulty: 'Intermediate',
  },
  {
    id: 'V13',
    word: 'Heads up',
    contextSentence: "Just a heads up, the staging server will be down for maintenance at 2 PM.",
    definition: 'An advance warning or notification about something.',
    category: 'Email / Async',
    difficulty: 'Beginner',
  },
  {
    id: 'V14',
    word: 'Loop in',
    contextSentence: "I'm going to loop in Sarah, as she has more context on this feature.",
    definition: 'To include someone in an ongoing communication or project.',
    category: 'Email / Async',
    difficulty: 'Intermediate',
  },
  {
    id: 'V15',
    word: 'Follow up',
    contextSentence: "I'm just following up on my previous email regarding the design assets.",
    definition: 'To contact someone again about a previous communication or request.',
    category: 'Email / Async',
    difficulty: 'Beginner',
  },

  // Feedback Culture
  {
    id: 'V16',
    word: 'Constructive',
    contextSentence: "Thank you for the constructive feedback on my pull request.",
    definition: 'Useful and intended to help or improve something.',
    category: 'Feedback Culture',
    difficulty: 'Intermediate',
  },
  {
    id: 'V17',
    word: 'Actionable',
    contextSentence: "Try to make your feedback more actionable so the developer knows exactly what to fix.",
    definition: 'Able to be done or acted upon; practical.',
    category: 'Feedback Culture',
    difficulty: 'Intermediate',
  },
  {
    id: 'V18',
    word: 'Kudos',
    contextSentence: "Big kudos to the team for shipping this feature ahead of schedule!",
    definition: 'Praise and recognition for an achievement.',
    category: 'Feedback Culture',
    difficulty: 'Beginner',
  },
  {
    id: 'V19',
    word: 'Pushback',
    contextSentence: "We received some pushback from the client on the new pricing model.",
    definition: 'Negative reaction or resistance to a plan or idea.',
    category: 'Feedback Culture',
    difficulty: 'Intermediate',
  },
  {
    id: 'V20',
    word: 'Area of improvement',
    contextSentence: "One area of improvement for next sprint is our code review turnaround time.",
    definition: 'A polite way to refer to a weakness or something that needs to get better.',
    category: 'Feedback Culture',
    difficulty: 'Intermediate',
  },
  {
    id: 'V21',
    word: 'Takeaway',
    contextSentence: "What was your main takeaway from the all-hands meeting?",
    definition: 'A key point or fact learned from a discussion or presentation.',
    category: 'Feedback Culture',
    difficulty: 'Beginner',
  },
  {
    id: 'V22',
    word: 'Acknowledge',
    contextSentence: "I want to acknowledge the hard work everyone put in over the weekend.",
    definition: 'To recognize or admit the truth, existence, or reality of something.',
    category: 'Feedback Culture',
    difficulty: 'Advanced',
  },

  // Remote Work Tools
  {
    id: 'V23',
    word: 'Blocker',
    contextSentence: "My only blocker right now is waiting for the API credentials.",
    definition: 'Something that prevents progress on a task or project.',
    category: 'Remote Work Tools',
    difficulty: 'Intermediate',
  },
  {
    id: 'V24',
    word: 'Sprint',
    contextSentence: "We will address these bugs in the next sprint.",
    definition: 'A set period of time during which specific work has to be completed (Agile methodology).',
    category: 'Remote Work Tools',
    difficulty: 'Intermediate',
  },
  {
    id: 'V25',
    word: 'Backlog',
    contextSentence: "Let's put that feature request in the backlog for now.",
    definition: 'A prioritized list of tasks, features, or bug fixes that need to be done.',
    category: 'Remote Work Tools',
    difficulty: 'Intermediate',
  },
  {
    id: 'V26',
    word: 'Deploy',
    contextSentence: "We are scheduled to deploy the new version to production at midnight.",
    definition: 'To move software from a development or testing environment into the live production environment.',
    category: 'Remote Work Tools',
    difficulty: 'Intermediate',
  },
  {
    id: 'V27',
    word: 'Standup',
    contextSentence: "I'll give an update during the daily standup.",
    definition: 'A short, daily team meeting to share status updates.',
    category: 'Remote Work Tools',
    difficulty: 'Beginner',
  },
  {
    id: 'V28',
    word: 'Repo',
    contextSentence: "I've pushed my changes to the main repo.",
    definition: 'Short for repository; a central location where data (like code) is stored and managed.',
    category: 'Remote Work Tools',
    difficulty: 'Beginner',
  },
  {
    id: 'V29',
    word: 'PR',
    contextSentence: "Can someone review my PR before the end of the day?",
    definition: 'Pull Request. A request to merge code changes into a main branch.',
    category: 'Remote Work Tools',
    difficulty: 'Intermediate',
  },
];

/**
 * Returns a random vocabulary word.
 * If category is provided and is not 'All Categories', filters by category first.
 */
export function getRandomVocab(category = 'All Categories') {
  let list = VOCABULARY;
  if (category && category !== 'All Categories') {
    list = VOCABULARY.filter((v) => v.category === category);
  }
  if (!list.length) list = VOCABULARY; // Fallback
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Returns a random vocabulary word different from the current one.
 */
export function getNewRandomVocab(currentId, category = 'All Categories') {
  let list = VOCABULARY;
  if (category && category !== 'All Categories') {
    list = VOCABULARY.filter((v) => v.category === category);
  }
  const filtered = list.filter((v) => v.id !== currentId);
  if (!filtered.length) return getRandomVocab(category);
  return filtered[Math.floor(Math.random() * filtered.length)];
}
