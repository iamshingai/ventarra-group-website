/* Venty's 1,000 grounded question-and-answer examples. These phrasings expand
   the verified facts on the Ventarra Digital page; they do not add new claims. */
(() => {
  const bank = [];
  const add = (intent, question, answer) => bank.push({ intent, question, answer });

  const greetings = ['Hi', 'Hello', 'Hey', 'Good morning', 'Good afternoon'];
  const greetingEnds = [', Venty!', ', I have a question.', ', can you help me?', ', how are you?', ' there!', '!', ' — nice to meet you.', ', I’m looking for some help.'];
  greetings.forEach(start => greetingEnds.forEach(end => add('greeting', `${start}${end}`, 'Hello! I’m Venty, Ventarra Digital’s assistant. I’m doing well, thanks for asking. What are you working on?')));

  const thanks = ['Thanks', 'Thank you', 'Much appreciated', 'I appreciate that', 'That helps'];
  const thanksEnds = ['!', ' so much!', ' for explaining.', ' for your help.', ' — that makes sense.', ' Venty.', ' a lot.', ' for that.'];
  thanks.forEach(start => thanksEnds.forEach(end => add('thanks', `${start}${end}`, 'You’re welcome! Glad that helped. Is there anything else about your project you’d like to know?')));

  const farewells = ['Bye', 'Goodbye', 'See you', 'Talk soon', 'I’m off'];
  const farewellEnds = ['!', ' for now.', ' later!', ', Venty.', ' — thanks.', '; take care.', ' 👋', ' then.'];
  farewells.forEach(start => farewellEnds.forEach(end => add('farewell', `${start}${end}`, 'Take care! I’ll be here if you have another question.')));

  const styles = [
    s => `What can you tell me about ${s}?`,
    s => `Could you explain ${s}?`,
    s => `I’d like to know about ${s}.`,
    s => `Tell me a little about ${s}.`,
    s => `What should I know about ${s}?`,
    s => `Can you help me understand ${s}?`,
    s => `I have a question about ${s}.`,
    s => `How does ${s} work?`,
  ];
  const groups = [
    ['identity', ['Venty', 'your name', 'who you are', 'the website assistant', 'who I am chatting with'], 'I’m Venty, the Ventarra Digital website assistant. I can explain the services shown on this page or help you prepare a project enquiry.'],
    ['capabilities', ['what you can help with', 'what you do', 'how you can help my business', 'your abilities', 'what this chat can do'], 'I can explain a service, how the team works, or how project costs are agreed. If you tell me your goal, I can help you prepare an enquiry.'],
    ['overview', ['Ventarra Digital’s services', 'the services available', 'what Ventarra Digital offers', 'your digital services', 'the kinds of projects you take on'], 'Ventarra Digital lists one-page websites, social media setup and content, promotional design and copy, and digital campaign support. Which one would you like to explore?'],
    ['websites', ['one-page websites', 'a simple website for my business', 'small business websites', 'a website to explain my services', 'getting a business online'], 'Ventarra Digital creates simple one-page websites that introduce your business, explain what you offer, and help customers contact you.'],
    ['social', ['social media setup', 'social media posts and captions', 'help with my social profiles', 'social content for a small business', 'a consistent social media presence'], 'Ventarra Digital can help set up social profiles and create helpful posts and captions for a consistent, professional presence.'],
    ['creative', ['promotional designs', 'advertising copy', 'designs for social posts', 'WhatsApp Status promotions', 'promotional words and graphics'], 'Ventarra Digital creates promotional designs and copy for social posts, WhatsApp Status, and other digital channels.'],
    ['campaigns', ['digital campaigns', 'online campaign management', 'planning an advertising campaign', 'campaign messages and audiences', 'a campaign performance update'], 'Campaign support can include planning the message and audience, preparing adverts, managing the campaign, and sharing a clear performance update.'],
    ['pricing', ['the price of a project', 'how much your services cost', 'getting a project quote', 'service fees', 'whether prices are listed'], 'The website does not list fixed prices. The team agrees the scope, timing, and cost with you before work begins. Tell me what you’re planning and I can prepare an enquiry.'],
    ['ad_budget', ['the advertising budget', 'whether ad spend is included', 'the cost of running adverts', 'paying for campaign ads', 'advertising spend and service fees'], 'Any advertising budget is agreed with the client in advance and paid separately from Ventarra Digital’s service fee.'],
    ['process', ['how the project process works', 'what happens after I contact you', 'the steps before work begins', 'how you agree costs and timing', 'how feedback and refinements work'], 'The team listens to your goals, agrees the work, timing, and costs before starting, then shares the work and refines it with you.'],
    ['location', ['where Ventarra Digital is based', 'your location', 'whether you are based in Zimbabwe', 'where the team works from', 'your service location'], 'Ventarra Digital is based in Zimbabwe and describes itself as building for a wider world.'],
    ['contact', ['how to contact Ventarra Digital', 'the Ventarra contact email', 'where to send a project enquiry', 'getting in touch with the team', 'the email address for enquiries'], 'You can email the team at ventarragroup@gmail.com. I can also prepare a project enquiry email for you.'],
    ['quote', ['requesting a quote', 'starting a project enquiry', 'asking for a project estimate', 'telling the team about my idea', 'getting in touch about a project'], 'Sure, I can help you prepare a project enquiry. Choose “Request a quote” and I’ll ask for a few details one at a time.'],
    ['revisions', ['giving feedback on the work', 'refining a design or website', 'how revisions work', 'sharing feedback during a project', 'making improvements together'], 'The site says the team shares the work, listens to your feedback, and refines it together with you. It doesn’t publish a fixed number of revision rounds.'],
    ['industries', ['which industries you serve', 'whether you work with my type of business', 'the businesses you support', 'whether you work with individuals', 'your ideal client'], 'The page says Ventarra Digital helps small businesses, but it doesn’t list specific industries. Tell me what your business does and what you need, and I can help you ask the team.'],
    ['timeline', ['how long a project takes', 'website delivery times', 'how soon a campaign can start', 'project turnaround time', 'when the work will be ready'], 'The website doesn’t publish standard turnaround times. Timing is agreed with you as part of the project plan.'],
    ['results', ['guaranteed campaign results', 'expected advertising results', 'whether a certain outcome is guaranteed', 'past project results', 'performance promises'], 'The website doesn’t promise specific results. For campaigns, it says the team can share a clear update on how the campaign performed.'],
    ['platforms', ['which social platforms you use', 'whether you create WhatsApp content', 'where promotional content can appear', 'the channels supported', 'which advertising platforms you manage'], 'The page mentions social posts, WhatsApp Status, and other digital channels, but doesn’t name specific advertising platforms. You can ask about the platform you have in mind.'],
    ['audience', ['choosing an audience for an advert', 'planning who sees a campaign', 'campaign audience selection', 'targeting an online campaign', 'reaching potential customers'], 'Campaign support can include planning the message and audience. The specific audience is agreed as part of planning your project.'],
    ['fit', ['choosing the right service', 'which service fits my business', 'whether I need a website or social content', 'deciding where to start', 'getting advice about my project'], 'I can help narrow it down. What are you trying to achieve first: a clear website, a stronger social presence, promotional materials, or a campaign?'],
    ['privacy', ['whether I should share sensitive details here', 'sharing passwords in chat', 'what information is safe to send', 'how to protect my private information', 'sending account login details'], 'Please don’t share passwords, payment card details, or other sensitive information in this chat. A short description of your project is enough to start an enquiry.'],
    ['eligibility', ['whether you work with new businesses', 'whether a small project is welcome', 'working with a startup', 'whether I need an existing website', 'starting with a small budget'], 'The page is aimed at helping small businesses, but it doesn’t set a minimum project size or budget. Tell the team what you need so they can advise you.'],
  ];
  groups.forEach(([intent, subjects, answer]) => {
    subjects.forEach(subject => styles.forEach(makeQuestion => add(intent, makeQuestion(subject), answer)));
  });
  if (bank.length !== 1000) throw new Error(`Venty question bank should contain 1000 entries; found ${bank.length}.`);
  window.VENTY_QA = bank;
})();
