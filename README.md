# How Can We...
- (DONE) Give the user suggested practices based on their goals --> PracticePicker
- (DONE) Show the user how much their day aligned with their goals --> SentimentResonator
- Help the user come up with good goals
- Give the user an easy, personalized learning pathway to understand and reach their goals
    - (DONE) Give the user the broad concept list they need to reach their goals (textbook_chapters)
    - (DONE) Help the user understand the subsections that make up each concept
    - (DONE) Teach the user about each subsection for each concept
    - Let the user keep long term track of their lessons (which they have completed, etc)
- Show the user how their daily sentiment has changed over time
- Help the user make smart financial decisions
- Give the user the ability to get advice from their role models
- Give the user the ability to teach GPT about who they are to enable better personalized responses
- Expand offering to help users with short term goals
- Give the user the ability to record what they're grateful for
- Help the user create personalized fitness regimens


# Frontend Futures
- (DONE) Create a homepage and separate the components into modules that open modals
- Change wording to show that these are for long-term goals especially
- (DONE) Refactor 'WorkoutTab' so that it can be generic for all categories
- 

# Backend Futures
- (DONE) Make prompt builder generic --> /util/prompts.js
- (DONE) Extract secrets
- (DONE) Extract constants to a config file --> /di.js
- (DONE) Make a generic 'AskGPT' service (postPost, pickPractice)
- (DONE) Migrate to Typescript
- (DONE) Make the prompt_builder take in an array of strings instead of predefined structure
- (DONE) Create MongoDB to track user profile
- (DONE) Update goals service to interact with MongoDB User profile
- Create error handler
- When write to input json files, write full prompt not just user input
- Use regex /\{[^{}]*\}/g to massage chatGPT output into only it's json part
- Create an http client
- Commit to git
- Error handling




