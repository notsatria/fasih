**Fasih**

Product Requirements Document

_AI-powered English speaking practice for remote & global work_

Version 1.0 | Hackathon: JuaraVibeCoding by Google

2025

# **1\. Product Overview**

**Product Name:** Fasih

**Type:** Web Application

**Platform:** Desktop (browser-based)

**Hackathon:** JuaraVibeCoding by Google

**Target Users:** Indonesian professionals & fresh graduates preparing for remote/overseas work

**English Level:** Intermediate — capable but lacking confidence in professional contexts

## **1.1 Problem Statement**

Many Indonesian professionals speak English at an intermediate level but struggle with confidence and professional fluency in real work contexts — meetings, interviews, async communication, and daily office interactions. Existing apps teach general English, not the specific vocabulary and speaking patterns required for global remote work.

## **1.2 Solution**

Fasih is an AI-powered speaking practice platform focused exclusively on office English. Users practice through scenario-based speaking sessions, AI-powered mock interviews, and contextual vocabulary challenges — all with real-time transcription and personalised AI feedback.

## **1.3 Core Value Propositions**

- Office-specific scenarios: topics and vocab drawn from real remote-work contexts

- Instant AI feedback with professional tone coaching, not just grammar correction

- Confidence-first design: positive reinforcement before suggestions

- Complete learning loop: speaking practice, interview simulation, and vocabulary — all in one place

# **2\. User Personas**

## **2.1 Persona A — Fresh Graduate**

| Name       | Rina, 23 — Marketing Fresh Graduate                                               |
| :--------- | :-------------------------------------------------------------------------------- |
| Goal       | Land a remote marketing role at a Southeast Asian startup                         |
| Pain Point | Freezes during English interviews; uses too many filler words ('uh', 'basically') |
| Motivation | Practices vocabulary but hasn't had real speaking practice opportunities          |

## **2.2 Persona B — Mid-Career Professional**

| Name       | Dimas, 30 — Software Engineer, 5 years experience                                                     |
| :--------- | :---------------------------------------------------------------------------------------------------- |
| Goal       | Switch from a local company to an international remote team                                           |
| Pain Point | Technical skills are strong; struggles to sound confident in English standups and stakeholder updates |
| Motivation | Wants structured practice that mirrors real work scenarios, not generic English lessons               |

# **3\. Feature Specifications**

## **3.1 Speaking Practice — Random Topic Generator**

**Priority:** P0 — Core feature, hackathon demo centrepiece

**Status:** Must ship

**User Flow**

- User lands on Speaking Practice page

- System generates a random office scenario topic (e.g. 'Give a project status update to your manager')

- Topic is tagged by category: Meeting / Async / Feedback / Escalation

- User can shuffle to get a new topic, or click Start if the topic works

- Recording begins — browser microphone captures audio

- Audio is transcribed in real time via Web Speech API / Whisper

- After user stops, AI analyses the transcription and returns structured feedback

- Feedback is displayed on screen with score breakdown and improvement suggestions

**Topic Categories**

| Category   | Example Topics                                        |
| :--------- | :---------------------------------------------------- |
| Meeting    | Give a project status update to your manager          |
| Escalation | Tell your team the deadline has been pushed           |
| Feedback   | Give constructive feedback on a colleague's work      |
| Async      | Write a Slack message requesting a deadline extension |
| Onboarding | Introduce yourself to a new international team        |

**AI Feedback Schema**

The AI response must include all of the following fields:

| Field             | Type          | Description                                             |
| :---------------- | :------------ | :------------------------------------------------------ |
| overall_score     | Integer 0–100 | Composite score across all dimensions                   |
| clarity           | Integer 0–100 | How easy the speech is to follow                        |
| professional_tone | Integer 0–100 | Level of professional register                          |
| vocabulary_range  | Integer 0–100 | Variety and appropriateness of word choice              |
| grammar           | Integer 0–100 | Grammatical accuracy                                    |
| filler_words      | String\[\]    | List of detected filler words (uh, basically, so, like) |
| native_rewrites   | Object\[\]    | Array of {original, improved} sentence pairs            |
| positive_note     | String        | One encouraging observation shown first                 |
| suggestions       | String\[\]    | 2–3 actionable improvement tips                         |

**UX Requirements**

- Positive note must render before score and suggestions (confidence-first design)

- 'How a native would say it' section shows original → improved sentence pairs

- Filler words are highlighted as pill/badge elements

- Score breakdown uses progress bars per dimension

- Recording timer shows elapsed / max time (default: 2 minutes)

## **3.2 Interview Prep**

**Priority:** P1 — Second core feature

**Status:** Must ship

**User Flow**

- User selects a job role (Software Engineer, Marketing, Designer, Product Manager, etc.)

- User selects difficulty: Screening Call, Behavioral, or Culture Fit

- Session begins: AI generates a relevant interview question

- Question is displayed on screen AND read aloud via Text-to-Speech

- User answers by speaking; audio is transcribed

- After each answer, AI may generate a follow-up question ('Can you elaborate on that?')

- After all questions, AI provides a full session summary with scores and STAR analysis

**Difficulty Levels**

| Level          | Question Type           | Example                                                        |
| :------------- | :---------------------- | :------------------------------------------------------------- |
| Screening Call | Background & motivation | Tell me about yourself and why you're applying.                |
| Behavioral     | STAR-format situational | Tell me about a time you dealt with a difficult stakeholder.   |
| Culture Fit    | Values & working style  | How do you handle async communication with a distributed team? |

**STAR Method Detector**

The AI analyses each answer for STAR structure and renders a live status indicator:

- Situation — has the user set the context?

- Task — has the user described their responsibility?

- Action — has the user explained what they did?

- Result — has the user shared the outcome?

Each component shows as: detected (green badge), in progress (amber badge), or missing (grey badge).

**Follow-Up Logic**

After a user answer, the AI evaluates whether a natural follow-up is appropriate. Trigger conditions:

- Answer is shorter than 60 words

- Result component is missing from STAR analysis

- Answer is vague or uses generic statements without specifics

Follow-up questions are limited to one per original question to avoid overwhelming the user.

**Session Feedback Schema**

| Field             | Description                                        |
| :---------------- | :------------------------------------------------- |
| per_answer_score  | Clarity, tone, STAR completeness per answer        |
| session_score     | Overall session score (average across all answers) |
| star_completion   | % of answers with full STAR structure              |
| best_answer       | Index \+ brief reason for the strongest answer     |
| improvement_areas | Top 2 recurring weaknesses across the session      |

## **3.3 Vocabulary Learning**

**Priority:** P2 — Supporting feature

**Status:** Must ship

**User Flow**

- User selects a vocab category: Meetings, Email/Async, Feedback Culture, Remote Work Tools

- A random vocab card is shown with the word used in a sentence first (context before definition)

- User reads the context sentence and guesses the meaning

- User taps 'Reveal' to see the full definition and category tag

- User is prompted to speak one sentence using the word in a professional context

- AI evaluates the spoken sentence: usage accuracy \+ naturalness

- User taps 'Next' for a new word

**Vocab Card Structure**

| Field            | Content                                                          |
| :--------------- | :--------------------------------------------------------------- |
| Word / Phrase    | sync up                                                          |
| Context Sentence | "Let's sync up after the standup to align on the blocker."       |
| Definition       | To meet briefly in order to share updates and align on decisions |
| Category Tag     | Meetings                                                         |
| Difficulty       | Intermediate                                                     |

**Sentence Evaluation Schema**

| Field            | Description                                                   |
| :--------------- | :------------------------------------------------------------ |
| is_correct_usage | Boolean — is the word used in the right semantic context?     |
| is_natural       | Boolean — does the sentence sound like a native professional? |
| verdict          | Natural / Correct but unnatural / Incorrect usage             |
| improved_version | AI-rewritten version if usage was unnatural or incorrect      |
| explanation      | 1 sentence explaining what was right or wrong                 |

# **4\. Daily Office Scenario (Bonus Feature)**

**Priority:** P3 — Hackathon wow factor

**Status:** Ship if time allows

The Daily Office Scenario is a single daily challenge that combines all three features into one cohesive flow. It is designed to be the most impressive demo moment for the hackathon judges.

## **4.1 Flow**

- One scenario is generated per day (e.g. 'Your manager just messaged on Slack asking for a project update. Respond in under 30 seconds.')

- Relevant vocab for the scenario is surfaced as a warm-up before the user speaks

- User speaks their response — transcribed and evaluated

- AI gives combined feedback: vocabulary usage \+ speaking quality \+ professional tone

## **4.2 Example Scenario**

| Scenario     | Your client just pushed back the launch deadline. How do you communicate this to your team on a group call? |
| :----------- | :---------------------------------------------------------------------------------------------------------- |
| Vocab hint   | push back, align, next steps, blockers, ETA                                                                 |
| Time limit   | 90 seconds                                                                                                  |
| Evaluated on | Clarity, professional tone, STAR structure, vocabulary used from hint list                                  |

# **5\. Technical Specifications**

## **5.1 Recommended Stack**

| Layer          | Technology                   | Notes                                        |
| :------------- | :--------------------------- | :------------------------------------------- |
| Frontend       | react Vite + Tanstack \+ Tailwind CSS      | App Router, RSC for initial load speed       |
| Speech-to-Text | Web Speech API (primary)     | Free, in-browser; fallback to google gemini |
| Text-to-Speech | Web Speech Synthesis API     | For interview question narration             |
| AI Feedback    | gemini 3.0 pro              | Structured JSON output via tool use          |
| Hosting        | Vercel                       | Zero-config Next.js deployment               |
| State          | React useState \+ useReducer | No backend DB needed for hackathon           |

## **5.2 AI Prompt Engineering Guidelines**

All AI feedback calls should follow these rules to ensure consistent, high-quality output:

- Always include a system prompt specifying professional English coaching persona

- Request responses in strict JSON format matching the schemas defined in Section 3

- Pass the full transcription AND the original topic/question as context

- Instruct the model to lead with a positive observation before corrections

- Set temperature to 0.4 for consistent, reliable feedback

- Max tokens: 800 per feedback call

## **5.3 Key API Calls**

| Call                    | Trigger                          | Returns                                  |
| :---------------------- | :------------------------------- | :--------------------------------------- |
| analyse_speaking        | User stops recording             | Feedback schema (Section 3.1)            |
| generate_interview_q    | Session start / answer submitted | Question string \+ follow-up flag        |
| star_detect             | Answer transcribed               | STAR component detection object          |
| evaluate_vocab_sentence | User finishes speaking           | Sentence evaluation schema (Section 3.3) |
| generate_topic          | Shuffle clicked                  | Topic string \+ category tag             |

# **6\. UX & Design Principles**

- **positive reinforcement always precedes corrections** Confidence-first

- **vocab and scenarios show usage before revealing meaning** Context before definition

- **feedback shown in layers — score first, detail on demand** Progressive disclosure

- **user can begin speaking within 2 taps from any page** Minimal friction to start

- **daily streak counter in the top bar to encourage return visits** Engagement loop

## **6.1 Colour System**

| Token   | Value             | Usage                                           |
| :------ | :---------------- | :---------------------------------------------- |
| Primary | \#534AB7 (purple) | CTAs, active states, score highlights           |
| Success | \#0F6E56 (teal)   | Positive feedback, correct usage badges         |
| Warning | \#854F0B (amber)  | In-progress STAR components, filler word alerts |
| Neutral | \#888780 (gray)   | Muted text, borders, secondary surfaces         |

# **7\. Out of Scope (v1.0)**

- User authentication and persistent accounts

- Progress history and learning analytics dashboard

- Pronunciation scoring (phoneme-level analysis)

- Mobile-native app (iOS / Android)

- Multiplayer or peer-to-peer practice mode

- Writing/reading practice modules

- Payment or subscription system

# **8\. Success Metrics (Hackathon Demo)**

| Metric                            | Target                                                                |
| :-------------------------------- | :-------------------------------------------------------------------- |
| End-to-end speaking feedback loop | \< 4 seconds from stop recording to results shown                     |
| AI feedback quality               | Structured JSON returned 100% of attempts                             |
| Speech recognition accuracy       | Transcription intelligible for intermediate speakers                  |
| Demo flow                         | Judge can complete one full Speaking Practice session in \< 3 minutes |
| All 3 features accessible         | No broken flows or missing states during live demo                    |

# **9\. Suggested Build Order**

| Phase     | Focus          | Deliverable                                                       |
| :-------- | :------------- | :---------------------------------------------------------------- |
| 1         | Foundation     | Next.js project, Tailwind setup, navbar, page routing             |
| 2         | Speaking Core  | Mic recording, Web Speech API transcription, topic generator UI   |
| 3         | AI Feedback    | Claude API integration, feedback schema, results UI               |
| 4         | Interview Prep | TTS question narration, STAR detector, session flow               |
| 5         | Vocab Module   | Vocab card UI, sentence evaluation, category filter               |
| 6         | Polish         | Streak counter, loading states, error handling, responsive layout |
| 7 (bonus) | Daily Scenario | Combined flow, daily prompt generation                            |
