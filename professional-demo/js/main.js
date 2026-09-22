const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.textContent = '☰';
  };
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuButton.textContent = open ? '×' : '☰';
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

const serviceDetails = {
  'business-strategy': {
    title: 'Business Strategy Advisory',
    intro: 'A clearer direction begins with understanding the decisions, opportunities, and constraints in front of your business.',
    overview: 'Business strategy advisory helps you step back from the day to day, examine where you stand, and define a practical direction. The work is shaped around your context, not a standard template.',
    audience: 'This service is for entrepreneurs, owners, and teams facing a new opportunity, changing market, or difficult decision about where to focus.',
    areas: ['Business goals and priorities', 'Customer needs and positioning', 'Growth opportunities', 'Decision-making and execution']
  },
  operations: {
    title: 'Operational Improvement',
    intro: 'Bring more structure and consistency to the work that happens every day.',
    overview: 'Operational improvement looks at how work moves through your business. We help you identify friction, clarify responsibilities, and find manageable changes that support better delivery.',
    audience: 'This service is for small teams experiencing delays, unclear handoffs, repeat problems, or uneven customer experiences.',
    areas: ['Team roles and responsibilities', 'Workflow and handoffs', 'Service consistency', 'Practical process improvements']
  },
  startup: {
    title: 'Startup & SME Advisory',
    intro: 'Thoughtful support for the decisions that shape a young or growing business.',
    overview: 'Founders and smaller firms often need a sounding board as well as a plan. This service helps you work through priorities, assumptions, and the next stage of your business.',
    audience: 'This service is for new entrepreneurs, small business owners, and teams preparing for a new phase of growth.',
    areas: ['Business model questions', 'Early priorities', 'Resource planning', 'Growth readiness']
  },
  growth: {
    title: 'Market & Growth Planning',
    intro: 'Explore opportunities with a stronger understanding of customers, positioning, and capacity.',
    overview: 'Growth planning connects opportunity to practical choices. We consider the market you serve, the value you offer, and what your business can support as it expands.',
    audience: 'This service is for businesses considering a new audience, market, service, or more deliberate growth plan.',
    areas: ['Customer segments', 'Market positioning', 'Offer development', 'Growth priorities']
  },
  consultation: {
    title: 'Professional Consultation',
    intro: 'Focused advisory time for a question that deserves a fresh perspective.',
    overview: 'A professional consultation creates space to discuss a specific business challenge, examine your options, and leave with a clearer sense of what to do next.',
    audience: 'This service is for entrepreneurs and professionals who need a focused conversation before making a decision.',
    areas: ['A current business challenge', 'Available options', 'Risks and tradeoffs', 'Actionable next steps']
  }
};

const requestedService = new URLSearchParams(location.search).get('service');
if (document.querySelector('#detail-title') && requestedService) {
  const item = serviceDetails[requestedService];
  if (item) {
    document.title = `${item.title} | Sterling Advisory Group`;
    document.querySelector('#detail-crumb').textContent = item.title;
    document.querySelector('#detail-title').textContent = item.title;
    document.querySelector('#detail-intro').textContent = item.intro;
    document.querySelector('#detail-overview').textContent = item.overview;
    document.querySelector('#detail-audience').textContent = item.audience;
    document.querySelector('#detail-areas').replaceChildren(...item.areas.map((area) => {
      const li = document.createElement('li');
      li.textContent = area;
      return li;
    }));
    document.querySelector('#detail-cta').href = `contact.html?service=${requestedService}`;
  }
}

const articles = {
  'growth-strategy': {
    category: 'Strategy', title: '5 Signs Your Business Needs a Clearer Growth Strategy',
    summary: "Growth often makes yesterday's priorities less useful. Here are signs it may be time to reset direction.",
    paragraphs: [
      ['Watch for scattered priorities', 'When every opportunity feels urgent, teams can spread their time too thin. Write down the few outcomes that matter most over the next six months and compare new opportunities against them.'],
      ['Listen for mixed messages', 'If staff explain your offer differently or customers are unsure what makes you distinct, your positioning may need attention. Clear language helps everyone make more consistent choices.'],
      ['Notice recurring bottlenecks', 'Growth can expose limits in handoffs, capacity, and decision-making. Repeated delays are a signal to revisit the plan, not merely ask people to work harder.'],
      ['Review the evidence', 'If you cannot say which activities are moving the business forward, choose a few useful measures and review them regularly. A plan should help you decide what to keep, change, or stop.']
    ]
  },
  'customer-experience': {
    category: 'Operations', title: 'How Small Businesses Can Improve Customer Experience',
    summary: 'Small improvements in handoffs, communication, and follow-through can make service feel more consistent.',
    paragraphs: [
      ['Map the customer journey', 'List the steps from first inquiry to follow-up. Note where customers wait, repeat information, or receive unclear instructions.'],
      ['Set simple service standards', 'Agree on response times, ownership, and the information each team member needs to pass along. Consistency often matters more than elaborate scripts.'],
      ['Ask and act', 'Invite specific feedback after meaningful interactions. Look for patterns and choose one improvement your team can make and measure this month.']
    ]
  },
  'process-review': {
    category: 'Operations', title: 'When Is It Time to Review Your Business Processes?',
    summary: 'A thoughtful process review can reveal friction before it becomes normal.',
    paragraphs: [
      ['Look for repeated work', 'Duplicate entry, missed handoffs, and frequent corrections are clues that a process deserves attention. Start with the work your team repeats most often.'],
      ['Talk to the people doing it', 'The people closest to a workflow can often explain where the written process differs from reality. Ask what slows them down and what information is missing.'],
      ['Change one thing at a time', 'Test a small improvement, name who owns it, and check whether it helps. Keep the process clear enough that a new team member could follow it.']
    ]
  },
  'digital-presence': {
    category: 'Growth', title: 'Building a Stronger Digital Presence for Your Business',
    summary: 'Make your website and channels answer the questions customers are really asking.',
    paragraphs: [
      ['Start with the visitor', 'A useful digital presence makes it easy to understand what you do, who you help, and how to get in touch. Put those answers where people will see them first.'],
      ['Keep information consistent', 'Check that service descriptions, opening details, and contact information match across your website and public profiles. Small inconsistencies can create doubt.'],
      ['Choose channels deliberately', 'Maintain the channels your audience uses and your team can support. Clear, current content on a few channels is more useful than abandoned accounts everywhere.']
    ]
  },
  'practical-planning': {
    category: 'Planning', title: 'Practical Planning for Growing Companies',
    summary: 'A useful plan connects ambition with resources, ownership, and review.',
    paragraphs: [
      ['Define the next horizon', 'Translate broad ambitions into a small number of outcomes for the next quarter or half year. This gives the team a shared point of reference.'],
      ['Match plans to capacity', 'Consider time, people, cash, and attention. A plan that ignores constraints will be difficult to carry out even when the idea is sound.'],
      ['Build in review', 'Assign owners and agree when you will revisit progress. Use what you learn to adjust the plan instead of treating the first version as final.']
    ]
  }
};

const requestedArticle = new URLSearchParams(location.search).get('article');
if (document.querySelector('#article-title') && requestedArticle && articles[requestedArticle]) {
  const item = articles[requestedArticle];
  document.title = `${item.title} | Sterling Advisory Group`;
  document.querySelector('#article-category').textContent = item.category;
  document.querySelector('#article-title').textContent = item.title;
  document.querySelector('#article-summary').textContent = item.summary;
  const content = document.querySelector('#article-content');
  content.replaceChildren();
  const intro = document.createElement('p');
  intro.textContent = item.summary;
  content.append(intro);
  item.paragraphs.forEach(([heading, body]) => {
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    h2.textContent = heading;
    p.textContent = body;
    content.append(h2, p);
  });
  const link = document.createElement('a');
  link.className = 'button';
  link.href = 'contact.html';
  link.textContent = 'Discuss Your Business ↗';
  content.append(link);
}

const form = document.querySelector('#consultation-form');
if (form) {
  const serviceSelect = form.elements.service;
  if (requestedService && serviceDetails[requestedService]) serviceSelect.value = requestedService;
  const fields = ['full-name', 'business', 'email', 'phone', 'service', 'contact-method', 'message'];
  const showError = (field, message) => {
    const input = document.getElementById(field);
    document.getElementById(`${field}-error`).textContent = message;
    input.setAttribute('aria-invalid', String(Boolean(message)));
    input.setAttribute('aria-describedby', message ? `${field}-error` : '');
  };
  const validate = (field) => {
    const input = document.getElementById(field);
    const value = input.value.trim();
    let message = '';
    if (input.required && !value) message = 'Please complete this field.';
    else if (field === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Enter a valid email address.';
    else if (field === 'message' && value && value.length < 10) message = 'Please add at least 10 characters.';
    else if (field === 'phone' && value && !/^[+()\d\s-]{7,35}$/.test(value)) message = 'Enter a valid phone number or leave this blank.';
    else if (field === 'contact-method' && value === 'phone' && !document.getElementById('phone').value.trim()) message = 'Add a phone number to request a call.';
    else if (field === 'contact-method' && value === 'whatsapp' && !document.getElementById('phone').value.trim()) message = 'Add a phone number for WhatsApp contact.';
    showError(field, message);
    return !message;
  };
  fields.forEach((field) => {
    document.getElementById(field).addEventListener('input', () => {
      validate(field);
      if (field === 'phone') validate('contact-method');
    });
    document.getElementById(field).addEventListener('change', () => validate(field));
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const valid = fields.map(validate).every(Boolean);
    const status = document.getElementById('form-status');
    if (!valid) {
      status.textContent = 'Please correct the highlighted fields and try again.';
      status.classList.add('visible');
      status.style.background = '#f8e9e5';
      status.style.color = '#8b3429';
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    status.textContent = "Demo submission successful. In a production website, this form would be connected to the client's preferred contact system. Nothing was sent or stored.";
    status.classList.add('visible');
    status.style.background = '';
    status.style.color = '';
    form.reset();
    fields.forEach((field) => showError(field, ''));
    status.focus();
  });
}
