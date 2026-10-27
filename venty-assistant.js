(() => {

  'use strict';
  const CONFIG = {
    name: 'Venty',
    contactEmail: 'ventarragroup@gmail.com',
    apiUrl: 'https://ventarra-assistant-api.ventarra.workers.dev/api/chat',
    services: [
      { key: 'website', name: 'One-page websites', short: 'A clear page to introduce your business, explain what you offer, and help customers contact you.' },
      { key: 'social', name: 'Social media setup and content', short: 'Profile setup, helpful posts, and captions for a consistent professional presence.' },
      { key: 'creative', name: 'Promotional designs and copy', short: 'Designs and words for social posts, WhatsApp Status, and other digital channels.' },
      { key: 'campaign', name: 'Digital campaigns', short: 'Planning the message and audience, preparing and managing adverts, and sharing a clear performance update.' }
    ]
  };
  const scriptUrl = document.currentScript?.src || location.href;
  const asset = name => new URL(name, scriptUrl).href;
  const style = document.createElement('link'); style.rel = 'stylesheet'; style.href = asset('venty-assistant.css'); document.head.append(style);

  const root = document.createElement('div'); root.id = 'ventarra-assistant'; document.body.append(root);
  const launcher = document.createElement('button');
  launcher.className = 'va-launcher'; launcher.type = 'button'; launcher.setAttribute('aria-expanded', 'false'); launcher.setAttribute('aria-controls', 'va-panel');
  launcher.innerHTML = '<img class="va-launcher-mascot" alt="" aria-hidden="true"><span>Chat with Venty</span>';
  const panel = document.createElement('section'); panel.className = 'va-panel'; panel.id = 'va-panel'; panel.hidden = true;
  panel.setAttribute('aria-label', 'Chat with Venty');
  panel.innerHTML = '<header class="va-header"><img class="va-mascot" alt=""><div class="va-headings"><div class="va-title">Venty</div><div class="va-subtitle">Ventarra Digital · Here to help</div></div><button class="va-close" type="button" aria-label="Close chat">×</button></header><div class="va-messages" role="log" aria-live="polite"></div><form class="va-form"><input class="va-input" aria-label="Your message" maxlength="1000" placeholder="Write a message…" autocomplete="off" required><button class="va-send" type="submit" aria-label="Send message">Send</button></form><div class="va-note">Please don’t share passwords or payment details.</div>';
  panel.querySelector('.va-mascot').src = asset('venty-mascot.svg');
  launcher.querySelector('.va-launcher-mascot').src = asset('venty-mascot.svg');
  root.append(launcher, panel);

  const messages = panel.querySelector('.va-messages');
  const input = panel.querySelector('.va-input');
  const history = [];
  let quote = null;
  const bank = Array.isArray(window.VENTY_QA) ? window.VENTY_QA : [];
  const say = (text, speaker = 'assistant') => {
    const bubble = document.createElement('div'); bubble.className = `va-message ${speaker}`; bubble.textContent = text;
    messages.append(bubble); messages.scrollTop = messages.scrollHeight; return bubble;
  };
  const actions = (bubble, choices) => {
    if (!choices?.length) return;
    const row = document.createElement('div'); row.className = 'va-actions';
    choices.forEach(({ label, value, kind = 'ask' }) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'va-action'; button.textContent = label;
      button.addEventListener('click', () => kind === 'quote' ? ask('I’d like to request a quote.') : ask(value)); row.append(button);
    });
    bubble.append(row);
  };
  const serviceFor = q => {
    if (/\b(campaign|advert|ad spend|audience|paid media)\b/.test(q)) return CONFIG.services[3];
    if (/\b(social|instagram|facebook|tiktok|caption|post|profile)\b/.test(q)) return CONFIG.services[1];
    if (/\b(design|creative|flyer|poster|graphic|promotional|whatsapp)\b/.test(q)) return CONFIG.services[2];
    if (/\b(website|web site|webpage|web page|one.?page|online presence)\b/.test(q)) return CONFIG.services[0];
    return null;
  };
  const answerFor = (text) => {
    const q = text.toLowerCase().replace(/[’']/g, "'").trim();
    if (/^(hi|hello|hey|hiya|good morning|good afternoon|good evening)(\b|[!,. ]|$)/.test(q)) {
      return { text: /how are you|how's it going/.test(q) ? 'I’m doing well, thanks for asking! What are you working on?' : 'Hi! I’m Venty. What are you hoping to do for your business?', buttons: [{ label: 'Explore a service', value: 'What services do you offer?' }, { label: 'Request a quote', kind: 'quote' }] };
    }
    if (/\b(thanks|thank you|thx|cheers|appreciate it|that helps|helpful)\b/.test(q)) return { text: 'You’re welcome! Glad I could help. What else would you like to know?' };
    if (/\b(bye|goodbye|see you|talk soon|that's all|that is all|i'm done)\b/.test(q)) return { text: 'Take care! I’ll be here if another question comes up.' };
    if (/\b(cancel|stop|never mind|nevermind)\b/.test(q) && quote) { quote = null; return { text: 'No problem, I’ve cancelled the quote request. We can keep chatting if you like.' }; }
    if (/\b(who are you|your name|what are you|are you (a |an )?(bot|human|person|ai)|who am i talking to)\b/.test(q)) return { text: 'I’m Venty, Ventarra Digital’s virtual assistant. I can answer questions about the services on this page and help prepare a project enquiry.' };
    if (/\b(how are you|how's it going|how do you feel)\b/.test(q)) return { text: 'I’m here and ready to help, thanks for asking! What’s on your mind?' };
    if (/\b(what can you do|how can you help|what do you do|what services|services do you offer|what does ventarra digital do|tell me about ventarra digital|your services)\b/.test(q)) {
      return { text: 'I can help with one-page websites, social content, promotional designs and copy, or digital campaigns. Which one are you interested in?', buttons: CONFIG.services.map(s => ({ label: s.name, value: `Tell me about ${s.key === 'website' ? 'websites' : s.key === 'social' ? 'social media' : s.key === 'creative' ? 'promotional designs' : 'campaigns'}.` })) };
    }
    if (/\b(price|pricing|cost|how much|quote|estimate|budget|afford)\b/.test(q)) {
      if (/\b(ad spend|advertising budget|ad budget|media budget|money for ads)\b/.test(q)) return { text: 'The advertising budget is agreed with you in advance and paid separately from the service fee. The team agrees the project cost before any work begins.' };
      return { text: 'There aren’t fixed prices listed on the site. The team first understands what you need, then agrees the work, timing, and cost with you before starting. Want me to help prepare an enquiry?', buttons: [{ label: 'Request a quote', kind: 'quote' }] };
    }
    if (/\b(where|location|based|country|Zimbabwe)\b/.test(q)) return { text: 'Ventarra Digital is based in Zimbabwe and is building for a wider world.' };
    if (/\b(process|steps|how do you work|how does it work|what happens next|after i contact)\b/.test(q)) return { text: 'First the team listens to what you need. Then you agree on the work, timing, and cost before it begins. The team shares the work, gets your feedback, and refines it with you.' };
    if (/\b(start|begin|get started)\b.*\b(project|work|business|idea)\b|\b(project|work)\b.*\b(start|begin)\b/.test(q)) return { text: 'A good first step is a short conversation about your business and what you want to achieve. The team then agrees the work, timing, and cost with you before starting.', buttons: [{ label: 'Request a quote', kind: 'quote' }] };
    if (/\b(contact|email|reach|speak to|talk to|get in touch)\b/.test(q)) return { text: 'You can reach the team at ventarragroup@gmail.com. If you’d like, I can help draft a project enquiry for you.', buttons: [{ label: 'Request a quote', kind: 'quote' }] };
    if (/\b(how long|timeline|turnaround|when will|delivery date|deadline)\b/.test(q)) return { text: 'The website doesn’t list standard turnaround times. Timing is agreed with you as part of the project plan.' };
    if (/\b(industry|industries|type of business|my business)\b/.test(q)) return { text: 'The page says Ventarra Digital helps small businesses, but doesn’t list specific industries. What kind of business do you have?' };
    if (/\b(revision|revise|feedback|changes|edit|refine)\b/.test(q)) return { text: 'The team shares work, listens to your feedback, and refines it together with you. The site doesn’t specify a fixed number of revision rounds.' };
    if (/\b(guarantee|guaranteed|results|performance)\b/.test(q)) return { text: 'The site doesn’t promise specific results. For campaigns, the team can share a clear update on how the campaign performed.' };
    if (/\b(platform|instagram|facebook|tiktok|whatsapp|channel)\b/.test(q) && !serviceFor(q)) return { text: 'The page mentions social posts, WhatsApp Status, and other digital channels, but doesn’t name specific advertising platforms. Which platform did you have in mind?' };
    if (/\b(website|web site|webpage|web page|one.?page)\b/.test(q)) return { text: 'Ventarra Digital makes simple one-page websites to introduce your business, explain what you offer, and help customers contact you.', buttons: [{ label: 'Request a quote', kind: 'quote' }] };
    if (/\b(social media|social profile|captions|posts)\b/.test(q)) return { text: 'They can help set up social media profiles and create helpful posts and captions for a consistent, professional presence.', buttons: [{ label: 'Request a quote', kind: 'quote' }] };
    if (/\b(design|creative|flyer|poster|graphic|promotional|whatsapp status)\b/.test(q)) return { text: 'Ventarra Digital creates promotional designs and copy for social posts, WhatsApp Status, and other digital channels.', buttons: [{ label: 'Request a quote', kind: 'quote' }] };
    if (/\b(campaign|advert|ads|advertising)\b/.test(q)) return { text: 'Campaign support can include planning the message and audience, preparing and managing adverts, and sharing a clear performance update. The ad budget is separate from the service fee.', buttons: [{ label: 'Request a quote', kind: 'quote' }] };
    if (/\b(yes|yeah|yep|sure|okay|ok|please)\b/.test(q) && /quote|enquiry|email/.test(history.at(-1)?.content || '')) return { text: 'Great. Choose “Request a quote” and I’ll gather a few details one at a time.', buttons: [{ label: 'Request a quote', kind: 'quote' }] };

    const nearest = nearestBankAnswer(q);
    if (nearest) return nearest;
    return null;
  };
  const stopWords = new Set('a an and are about can could do does for from help how i in is it me my of on or tell the this to what with you your ventarra digital'.split(' '));
  const words = text => new Set(text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w)));
  const nearestBankAnswer = question => {
    if (!bank.length) return null;
    const query = words(question); if (!query.size) return null;
    let best = null; let bestScore = 0;
    for (const item of bank) {
      const sample = words(item.question); let overlap = 0;
      for (const word of query) if (sample.has(word)) overlap++;
      const score = overlap / Math.max(query.size, sample.size);
      if (score > bestScore) { bestScore = score; best = item; }
    }
    return best && bestScore >= 0.34 ? { text: best.answer } : null;
  };
  const addQuotePrompt = (text) => { const bubble = say(text); actions(bubble, [{ label: 'Cancel request', value: 'cancel' }]); };
  const startQuote = () => {
    quote = { step: 'name', name: '', email: '', project: '', budget: '' };
    addQuotePrompt('Sure, let’s put together a short enquiry. What name should I put on it?');
  };
  const continueQuote = (text) => {
    const value = text.trim();
    if (quote.step === 'name') {
      quote.name = value; quote.step = 'email'; addQuotePrompt(`Thanks, ${value.split(/\s+/)[0]}. What email address should the team reply to?`); return;
    }
    if (quote.step === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { addQuotePrompt('That doesn’t look like a complete email address. Could you check it and try again?'); return; }
      quote.email = value; quote.step = 'project'; addQuotePrompt('What are you hoping to do? A sentence or two is plenty.'); return;
    }
    if (quote.step === 'project') {
      if (value.length < 4) { addQuotePrompt('Could you add a little more detail so the team understands what you need?'); return; }
      quote.project = value; quote.step = 'budget'; addQuotePrompt('Do you have a budget range in mind? You can type “skip” if you’d rather discuss it with the team.'); return;
    }
    quote.budget = /^(skip|no|not sure|rather not say)$/i.test(value) ? 'Not specified' : value;
    const data = { ...quote }; quote = null;
    const subject = `Project enquiry from ${data.name}`;
    const body = `Name: ${data.name}\nReply email: ${data.email}\nBudget range: ${data.budget}\n\nProject details:\n${data.project}`;
    const bubble = say('Thanks, I’ve put your details into an email draft. Please review it before sending; it hasn’t been sent.');
    const row = document.createElement('div'); row.className = 'va-actions';
    const link = document.createElement('a'); link.className = 'va-action va-action-link'; link.href = `mailto:${encodeURIComponent(CONFIG.contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; link.textContent = 'Open email draft'; row.append(link); bubble.append(row);
  };
  const askAI = async () => {
    const response = await fetch(CONFIG.apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.slice(-12) }) });
    if (!response.ok) throw new Error('Assistant unavailable');
    const data = await response.json();
    if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('No reply');
    return data.reply.slice(0, 900);
  };
  async function ask(text) {
    const value = text.trim(); if (!value) return;
    say(value, 'user'); input.value = '';
    if (quote && /^(cancel|stop|never mind|nevermind)$/i.test(value)) { quote = null; say('No problem, I’ve cancelled the quote request. We can keep chatting if you like.'); return; }
    if (quote) { continueQuote(value); return; }
    if (/\b(quote|estimate|project enquiry|request a quote|hire you)\b/i.test(value)) { startQuote(); return; }
    history.push({ role: 'user', content: value });
    const known = answerFor(value);
    if (known) {
      const bubble = say(known.text); history.push({ role: 'assistant', content: known.text });
      actions(bubble, [...(known.buttons || []), ...(known.buttons?.some(b => b.kind === 'quote') ? [] : [{ label: 'Request a quote', kind: 'quote' }])]); return;
    }
    if (CONFIG.apiUrl) {
      const waiting = say('Let me think about that…');
      try {
        const reply = await askAI(); waiting.remove(); const bubble = say(reply); history.push({ role: 'assistant', content: reply });
        actions(bubble, [{ label: 'Request a quote', kind: 'quote' }]);
      } catch { waiting.remove(); say('I’m having trouble reaching the online assistant right now. You can ask me about a service, pricing, or how the team works.'); }
      return;
    }
    say('I’m not sure about that detail, and I don’t want to guess. Could you tell me a little more about what you’re trying to do?');
  }
  launcher.addEventListener('click', () => {
    const opening = panel.hidden; panel.hidden = !opening; launcher.setAttribute('aria-expanded', String(opening));
    if (opening && !messages.childElementCount) {
      const bubble = say('Hi, I’m Venty 👋 What brings you by today?');
      actions(bubble, [{ label: 'Explore services', value: 'What services do you offer?' }, { label: 'How pricing works', value: 'How much does a project cost?' }, { label: 'Request a quote', kind: 'quote' }]);
    }
    if (opening) input.focus();
  });
  panel.querySelector('.va-close').addEventListener('click', () => { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); });
  panel.querySelector('.va-form').addEventListener('submit', event => { event.preventDefault(); void ask(input.value); });
})();
