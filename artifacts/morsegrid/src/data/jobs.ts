export interface Job {
  slug: string;
  title: string;
  overview: string;
  responsibilities: string[];
  requiredExperience: string[];
  requiredTechnical: string[];
  requiredSoft: string[];
  preferred: string[];
  benefits: string[];
  note: string;
  emailSubject: string;
}

export const jobs: Job[] = [
  {
    slug: "ai-native-developer",
    title: "AI-Native Developer",
    overview:
      "We are looking for an AI-Native Developer who builds intelligent, automated systems where AI does the reasoning and code does the execution. This is not a prompt-engineering role. You will architect and ship agentic workflows, LLM-powered pipelines, and AI-integrated applications that run reliably in production. Coding experience is strongly preferred. If you cannot read or write Python, you will hit a ceiling fast in this role.",
    responsibilities: [
      "Design and build agentic workflows using frameworks like Claude Agent SDK, LangChain, LangGraph, or custom orchestration logic",
      "Integrate LLMs (Claude, GPT-4, Gemini) into production systems: classification, extraction, generation, routing, and decision-making pipelines",
      "Build AI-augmented automation flows in Make.com or n8n that go beyond simple data transfer and include intelligent branching via LLM calls",
      "Develop and maintain Python scripts for data processing, API orchestration, and AI pipeline execution",
      "Implement vector search, RAG (retrieval-augmented generation), and embedding-based systems for knowledge retrieval",
      "Build tool-use and function-calling architectures so AI agents can take deterministic actions reliably",
      "Instrument AI pipelines with observability: logging, eval loops, and quality monitoring",
      "Continuously improve AI outputs through structured evals, prompt iteration, and model routing decisions",
    ],
    requiredExperience: [
      "2+ years building production software systems (any stack)",
      "Demonstrable experience shipping AI-powered features or automations to production",
      "Portfolio showing real systems, not just notebooks or demo repos",
    ],
    requiredTechnical: [
      "Python (strongly preferred): scripting, API calls, async patterns, data handling",
      "LLM integration: Claude API / Anthropic SDK, OpenAI SDK, or equivalent",
      "Agentic workflow design: multi-step reasoning chains, tool use, memory patterns",
      "No-code automation platforms: Make.com or n8n for wiring AI into business processes",
      "Vector databases (Pinecone, Chroma, Supabase pgvector) and RAG architecture",
      "REST API design and consumption, webhook architecture",
      "Git, basic DevOps (environment management, deployment basics)",
    ],
    requiredSoft: [
      "Systems thinker: designs for reliability, not just for the happy path",
      "Comfortable evaluating AI output quality and debugging probabilistic systems",
      "Bias toward deterministic execution: pushes complexity into code, not prompts",
      "Communicates trade-offs clearly without requiring technical background from the audience",
    ],
    preferred: [
      "Experience with Claude Agent SDK or LangGraph for multi-agent orchestration",
      "Familiarity with structured output, function calling, and tool-use patterns",
      "Contributions to open-source AI tooling or published technical writing",
      "JavaScript / TypeScript for full-stack AI application work",
      "Experience with eval frameworks (RAGAS, LangSmith, custom binary evals)",
      "Background in NLP, data science, or ML engineering",
    ],
    benefits: [
      "Competitive salary based on demonstrated output, not credentials",
      "Remote-first, async-friendly environment",
      "Work directly on the AI stack powering real client businesses",
      "Fast growth path: this role evolves into AI systems architecture as the team scales",
    ],
    note: "Show us something that runs in production. A GitHub repo with a README that says 'coming soon' does not count. We want to see how you think about failure modes, not just the happy path.",
    emailSubject: "Application — AI-Native Developer",
  },
  {
    slug: "google-meta-ads-specialist",
    title: "Google & Meta Ads Specialist",
    overview:
      "We are hiring a Google & Meta Ads Specialist with a strong Google Ads focus. This role owns paid acquisition across client accounts — from campaign structure and audience targeting to creative testing and performance reporting. You will work directly on DTC and service-based client accounts, managing spend efficiently and driving measurable ROI.",
    responsibilities: [
      "Build, manage, and optimize Google Ads campaigns (Search, Shopping, Performance Max, Display)",
      "Run Meta Ads campaigns (prospecting + retargeting) with a focus on e-commerce and lead gen",
      "Own campaign structure: keyword research, match types, negative lists, ad group segmentation",
      "Write and test ad copy variations; coordinate with design on creative assets",
      "Monitor daily spend, pacing, and performance — flag anomalies proactively",
      "Produce weekly performance reports with clear insights and next actions",
      "Conduct ongoing A/B tests on copy, creative, audiences, and landing pages",
      "Manage Google Merchant Center feeds for Shopping/PMax campaigns",
      "Ensure proper tracking setup: Google Tag Manager, GA4, Meta Pixel, Conversions API",
    ],
    requiredExperience: [
      "2+ years managing Google Ads campaigns independently (not just assisting)",
      "Demonstrated results: ROAS improvement, CPL reduction, or revenue growth (bring numbers)",
      "Experience managing at least $5k/month in Google Ads spend",
    ],
    requiredTechnical: [
      "Google Ads: Search, Shopping, Performance Max (required); Display and YouTube (preferred)",
      "Meta Ads Manager: campaign setup, audience segmentation, creative testing",
      "Google Tag Manager and GA4 — can set up conversion tracking without developer help",
      "Google Merchant Center: feed management, disapproval resolution",
      "Familiarity with third-party tools: Triple Whale, Northbeam, or similar attribution platforms a plus",
      "Basic spreadsheet skills for reporting (Google Sheets)",
    ],
    requiredSoft: [
      "Data-first mindset — decisions backed by numbers, not hunches",
      "Communicates performance clearly to non-technical stakeholders",
      "Proactive: spots a problem before the client does",
      "Works well async and manages multiple accounts without dropping the ball",
    ],
    preferred: [
      "Google Ads certifications (Search, Shopping, or Performance Max)",
      "Experience with e-commerce clients (Shopify stores strongly preferred)",
      "Klaviyo or email retargeting experience as a complement to paid",
      "Familiarity with creative testing frameworks (UGC, static, video)",
    ],
    benefits: [
      "Competitive salary based on portfolio of managed accounts and results",
      "Remote-first role",
      "Performance upside tied to client results",
      "Direct line to founder — no layers, fast decisions",
    ],
    note: "Include specific campaign results in your application (platform, monthly spend, ROAS or CPL before/after). Generic applications will not be reviewed.",
    emailSubject: "Application — Google & Meta Ads Specialist",
  },
  {
    slug: "graphics-designer",
    title: "Graphics Designer",
    overview:
      "We are looking for a talented Graphics Designer to join our team. This role is central to building a compelling visual identity across our client projects, marketing assets, and social media presence. The ideal candidate has a strong portfolio, sharp design instincts, and the ability to execute quickly without sacrificing quality.",
    responsibilities: [
      "Design visual assets for social media, ads, email, and landing pages across client accounts",
      "Create brand kits, style guides, and reusable templates for recurring content",
      "Produce static and animated graphics for Meta and Google ad campaigns",
      "Collaborate with the ads and copy team to translate briefs into polished visuals",
      "Maintain consistent brand voice across all design outputs per client",
      "Iterate quickly based on performance data (CTR, engagement) and feedback",
      "Organize and manage design files in shared folders (Figma, Google Drive)",
    ],
    requiredExperience: [
      "2+ years of experience in graphic design (agency or freelance)",
      "Portfolio demonstrating range across social, ads, and brand work",
    ],
    requiredTechnical: [
      "Proficient in Figma (primary tool)",
      "Adobe Creative Suite: Photoshop, Illustrator (required); After Effects a plus",
      "Experience designing for Meta (Facebook/Instagram) and Google display ad specs",
      "Familiarity with Canva for rapid-turnaround client requests",
      "Basic motion/animation skills (GIFs, short video ads) preferred",
    ],
    requiredSoft: [
      "Strong visual judgment — knows when something looks off and fixes it without being told",
      "Takes direction well and delivers clean first drafts",
      "Communicates proactively on timelines and blockers",
      "Comfortable working async in a remote-first team",
    ],
    preferred: [
      "Experience working with e-commerce or DTC brands",
      "Familiarity with ad creative best practices (thumb-stop, visual hierarchy, CTA placement)",
      "Video editing capability (Premiere, CapCut, or similar)",
      "Experience with A/B testing creative variants",
    ],
    benefits: [
      "Competitive salary based on experience",
      "Remote-first role (async-friendly)",
      "Direct exposure to paid traffic results — your work is measured, not just appreciated",
      "Growth path into Creative Lead as the team scales",
    ],
    note: "Include a portfolio link with your application. Applications without a portfolio will not be reviewed.",
    emailSubject: "Application — Graphics Designer",
  },
  {
    slug: "no-code-developer",
    title: "No-Code Developer",
    overview:
      "We are looking for a No-Code Developer who builds automation systems and connected workflows for clients using platforms like Make.com, n8n, Zapier, and Airtable. You do not need to write custom software from scratch, but you must understand how systems talk to each other and be able to wire them together reliably. AI and agentic workflows are a core part of this role, not a bonus.",
    responsibilities: [
      "Design and build end-to-end automation workflows using Make.com, n8n, and/or Zapier",
      "Integrate AI capabilities into workflows: prompt-based classification, LLM routing, AI-generated content pipelines, and agentic task execution",
      "Connect business tools (CRMs, e-commerce platforms, email systems, databases) via APIs, webhooks, and native integrations",
      "Build internal operations tools using no-code app builders (e.g. Softr, Glide, Retool)",
      "Identify manual, repetitive processes in client operations and replace them with automated systems",
      "Maintain scenario/workflow documentation so nothing depends on memory",
      "Troubleshoot broken automations and implement error handling so flows self-recover",
    ],
    requiredExperience: [
      "2+ years building production automation workflows (not just demo projects)",
      "Portfolio with live examples, not just screenshots",
    ],
    requiredTechnical: [
      "Expert in Make.com or n8n (one at depth, familiar with the other)",
      "Zapier proficiency for simpler integration use cases",
      "REST API fundamentals: authentication (OAuth, API keys), JSON parsing, pagination",
      "Prompt engineering: can write instructions that reliably produce structured LLM output",
      "Working experience with AI tools (Claude, GPT-4, Gemini) integrated inside automation flows",
      "Airtable, Google Sheets, or Notion as a data layer",
    ],
    requiredSoft: [
      "Process-first mindset: maps the workflow before touching any tool",
      "Builds for maintainability, not just for it to work once",
      "Proactive communicator who flags scope creep before it becomes a problem",
      "Comfortable jumping between multiple client contexts without dropping balls",
    ],
    preferred: [
      "Experience building agentic systems: multi-step AI pipelines with conditional branching and tool use",
      "Familiarity with voice automation (Retell AI, Vapi) or chatbot builders",
      "Basic JavaScript or Python for custom code nodes inside Make/n8n",
      "Experience with Instantly.ai, Apollo, or cold outreach automation stacks",
    ],
    benefits: [
      "Competitive salary based on demonstrated output",
      "Remote-first, async-friendly environment",
      "Work directly on live client systems with real business impact",
      "Growth path into AI systems architecture",
    ],
    note: "Show us a workflow you built that replaced a manual process. Bonus if it uses AI as a step in the flow, not just as the final output.",
    emailSubject: "Application — No-Code Developer",
  },
  {
    slug: "shopify-developer",
    title: "Shopify Developer",
    overview:
      "We are looking for a Shopify Developer who builds and maintains e-commerce storefronts and automates the manual, repetitive work that slows down store operations. This is not a template-click role. You will be expected to integrate AI tools, no-code automation platforms, and custom code to create systems that run without hand-holding.",
    responsibilities: [
      "Build, customize, and maintain Shopify storefronts using Liquid, HTML, CSS, and JavaScript",
      "Design and implement automation workflows using Make.com, n8n, or Zapier to connect Shopify with third-party tools (CRMs, ERPs, fulfillment, email platforms)",
      "Integrate AI-powered features: product recommendation engines, automated tagging, dynamic pricing triggers, and customer segmentation flows",
      "Build and maintain Shopify apps or custom integrations via REST/GraphQL Admin API",
      "Automate order management, inventory sync, and customer lifecycle workflows end-to-end",
      "Collaborate with the team to identify manual processes and replace them with connected, automated systems",
      "Maintain clean documentation so automations can be handed off without tribal knowledge",
    ],
    requiredExperience: [
      "2+ years of Shopify development experience (custom themes + app integrations)",
      "Demonstrable experience shipping automation workflows, not just storefronts",
    ],
    requiredTechnical: [
      "Shopify Liquid, Hydrogen, or Headless Shopify (bonus)",
      "Proficient in at least one no-code automation platform: Make.com, n8n, or Zapier",
      "Shopify Admin API (REST + GraphQL)",
      "JavaScript / Node.js for custom scripts and webhooks",
      "Working knowledge of AI tools: Claude, GPT, or equivalent for content generation, classification, or workflow routing",
      "Webhook architecture and event-driven system design",
    ],
    requiredSoft: [
      "Systems thinker: sees the process before writing a line of code",
      "Self-directed: can scope, build, and ship without hand-holding",
      "Communicates blockers early, not after deadlines are missed",
      "Comfortable with ambiguity and changing requirements",
    ],
    preferred: [
      "Experience building agentic workflows (multi-step AI pipelines with decision logic)",
      "Familiarity with Klaviyo, Gorgias, or Recharge integrations",
      "Exposure to Python for data processing or API orchestration",
      "Contribution to open-source Shopify tools or public automation templates",
    ],
    benefits: [
      "Competitive salary based on experience",
      "Remote-first, async-friendly environment",
      "Direct exposure to cutting-edge AI + automation stack",
      "Growth path into automation architecture and AI systems roles",
    ],
    note: "If your portfolio is only storefronts with no automation work, this is not the right fit. Show us something you built that runs on its own.",
    emailSubject: "Application — Shopify Developer",
  },
  {
    slug: "video-editor",
    title: "Video Editor (YouTube / Shorts / Repurposing)",
    overview:
      "We are looking for a skilled Video Editor to join our content team. This role is focused on producing high-quality YouTube long-form videos, short-form content for Facebook, Instagram, and TikTok, and repurposing existing content across platforms. You will play a central role in shaping how our brand is seen and felt across every channel we publish on.",
    responsibilities: [
      "Edit and produce YouTube long-form videos (10-60 min) from raw footage: cuts, transitions, color grading, audio mixing, and captions",
      "Create short-form vertical content (Reels, TikToks, YouTube Shorts) from long-form source material",
      "Repurpose existing video content into platform-native formats with appropriate pacing, aspect ratios, and hooks",
      "Add motion graphics, lower thirds, and text overlays aligned with brand guidelines",
      "Sync captions/subtitles accurately across all video formats",
      "Collaborate with the content strategist to align edits with the content calendar and platform goals",
      "Deliver final exports in correct specs for each platform (YouTube, Instagram, Facebook, TikTok)",
      "Maintain an organized project folder structure and version history",
    ],
    requiredExperience: [
      "2+ years of professional video editing experience",
      "Demonstrable portfolio of YouTube long-form and short-form content",
      "Experience editing for at least two of: YouTube, TikTok, Instagram Reels, Facebook",
    ],
    requiredTechnical: [
      "Proficient in Adobe Premiere Pro or DaVinci Resolve",
      "Familiar with After Effects or CapCut for motion graphics and short-form edits",
      "Understands platform export specs (resolution, bitrate, aspect ratio) for YouTube, TikTok, Instagram, Facebook",
      "Comfortable with audio cleanup tools (Audition, Descript, or similar)",
      "Able to work from a brief or content outline without heavy hand-holding",
    ],
    requiredSoft: [
      "Strong sense of pacing and storytelling",
      "Attention to detail on audio sync, color consistency, and caption accuracy",
      "Communicates clearly on timelines and flags blockers early",
      "Takes feedback without ego and iterates quickly",
    ],
    preferred: [
      "Experience with AI-assisted editing tools (Descript, OpusClip, Captions.ai)",
      "Background in content repurposing workflows or batch editing pipelines",
      "Understanding of YouTube retention metrics and how edit choices affect watch time",
      "Familiarity with brand kits and design systems",
    ],
    benefits: [
      "Competitive salary dependent on experience and location",
      "Remote-first position",
      "Flexible hours with clear weekly deliverable targets",
      "Growth path into senior editor or content strategist role",
    ],
    note: "Candidates should submit a portfolio with at least one long-form YouTube video and one short-form piece (Reel, Short, or TikTok) they personally edited.",
    emailSubject: "Application — Video Editor (YouTube / Shorts / Repurposing)",
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
