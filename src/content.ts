// ─── Content model ────────────────────────────────────────────────────────────
// Edit THIS FILE ONLY to update copy, links, and media.
//
// Adding / swapping media is a ONE-LINE edit inside the media[] array.
// Drop files into public/media/ and reference them as '/media/filename.mp4'.
// Mix freely - type is auto-detected from the extension or URL:
//   .mp4 / .webm / .mov   → <video autoPlay muted playsInline>
//   .png / .jpg / .gif / .webp / .avif / .svg → <img>
//   youtube.com / youtu.be → YouTube iframe embed
//   vimeo.com              → Vimeo iframe embed
//   empty array            → "Walkthrough coming soon" fallback
//
// Résumé: replace public/resume.pdf (same filename) and push - the link never changes.
// ─────────────────────────────────────────────────────────────────────────────

export type IconType = 'wave' | 'bubble' | 'layers' | 'code';

export interface Project {
  slug: string;
  title: string;
  icon: IconType;
  description: string;
  tags: string[];
  /** Drop in any mix of file paths or URLs - type auto-detected. */
  media: string[];
  repo?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    slug: 'otto',
    title: 'Otto - autonomous cloud coding agent',
    icon: 'code',
    description:
      'Give it a GitHub repo and a task in chat; it works in an isolated Kubernetes sandbox and comes back with a pull request. Stateless async LLM worker, one sandbox Job per session over per-session RabbitMQ queues, event-sourced session log in Postgres streamed live over LISTEN/NOTIFY + WebSockets, GitHub App auth, 600+ tests.',
    tags: ['Python', 'Go', 'FastAPI', 'Kubernetes', 'RabbitMQ', 'PostgreSQL', 'GitHub Apps', 'React'],
    media: [],
    demo: 'https://otto.taufi.dev',
    repo: 'https://github.com/Taufik041',
  },
  {
    slug: 'flow-generator',
    title: 'Spec-to-WhatsApp-Flow RAG agent',
    icon: 'bubble',
    description:
      'Internal agent that turns PDF, image and text specs into production WhatsApp Flow JSON, bilingual English/Odia. RAG over the Flows spec and existing services, FastAPI microservices, PostgreSQL, Next.js chat UI. Cut manual flow authoring by ~90% across government services.',
    tags: ['RAG', 'Agentic workflows', 'LangChain', 'FastAPI', 'WhatsApp Flows', 'Next.js'],
    media: [],
  },
  {
    slug: 'langgenie',
    title: 'langgenie.ai - distributed speech AI',
    icon: 'wave',
    description:
      'Fault-tolerant, message-driven speech platform: RabbitMQ, PostgreSQL and FastAPI with streaming results and priority queues across autoscaling GPU workers. Fine-tuned OpenAI Whisper for Odia detection, transcription and translation at ~90% accuracy. Now being re-architected onto Kubernetes with KServe/vLLM serving and KEDA queue-depth autoscaling.',
    tags: ['RabbitMQ', 'FastAPI', 'Whisper', 'GPU autoscaling', 'KEDA', 'vLLM'],
    media: [],
  },
  {
    slug: 'eks-gitops',
    title: 'Production GitOps platform on AWS EKS',
    icon: 'layers',
    description:
      'EKS 1.31 provisioned with Terraform (S3 remote state), a multi-service FastAPI + Postgres + Redis + RabbitMQ stack shipped as a Helm chart through ArgoCD. GitHub Actions builds SHA-tagged images per service and commits them to Helm values; traffic via Gateway API (NGINX Gateway Fabric), secrets via External Secrets Operator with EKS Pod Identity - no static credentials.',
    tags: ['Terraform', 'AWS EKS', 'Helm', 'ArgoCD', 'Gateway API', 'External Secrets', 'GitHub Actions'],
    media: [],
    repo: 'https://github.com/Taufik041/todo',
  },
];

// ─── Personal info ────────────────────────────────────────────────────────────
export const person = {
  name:         'Taufik Khan',
  role:         'Backend & platform engineer',
  location:     'Bhubaneswar, India',
  locationNote: 'Open to relocation / remote',
  availability: 'Open to backend, platform and DevOps roles - remote or relocation.',
  headline:     'I build systems that stay calm when thousands of people hit them at once.',
  subline:
    'I run the Revenue department services on Odisha’s WhatsApp government platform - 156k+ sessions, 75k+ citizens - and build the infrastructure behind it: message-driven backends, speech AI, GitOps on Kubernetes, and an autonomous coding agent on the side.',
  github:   'https://github.com/Taufik041',
  linkedin: 'https://www.linkedin.com/in/taufik-khan/',
  resume:   '/resume.pdf',          // replace public/resume.pdf to update
  email:    'hello@taufi.dev',
};

// ─── Experience (newest first) ───────────────────────────────────────────────
export interface Experience {
  company:  string;
  title:    string;
  period:   string;
  location: string;
  domain:   string;
  bullets:  string[];
}

export const experiences: Experience[] = [
  {
    company:  'Bipros',
    title:    'Software Engineer',
    period:   'May 2025 - Present',
    location: 'Bhubaneswar, Odisha',
    domain:   'Backend, DevOps, GenAI',
    bullets: [
      'Own the Revenue Department services on Odisha’s WhatsApp government-services platform (team-built, 320,000+ sessions across 30+ departments) running on FastAPI and RabbitMQ.',
      'Scaled Revenue to 75,000+ citizens and 156,000+ sessions - nearly half of all platform traffic - absorbing a launch peak of 10,800+ sessions in a single day with 99% of sessions free of system errors.',
      'Delivered 15+ Revenue services as WhatsApp Flows: residence, income and caste certificates, mutation, legal heir, land conversion and partition, Bhulekh RoR lookup, and grievances. Citizens finish an application in a median of 1.4 minutes.',
      'Launched CHSE Odisha services on WhatsApp - marksheet and certificate verification, migration and provisional certificates, authentication of originals - serving 230+ students in the first month.',
      'Built a RAG-based internal agent that converts PDF, image and text specs into production WhatsApp Flow JSON (bilingual English/Odia), cutting manual flow authoring by 90%.',
      'Architected langgenie.ai, a distributed speech AI platform with a fault-tolerant, message-driven backend (RabbitMQ, PostgreSQL, FastAPI), streaming results, and priority queues across autoscaling GPU workers.',
      'Engineered the data pipeline to fine-tune OpenAI Whisper for Odia detection, transcription and translation, reaching ~90% accuracy on regional datasets.',
      'Re-architecting langgenie onto Kubernetes with KServe/vLLM model serving and KEDA queue-depth autoscaling (in progress).',
    ],
  },
];

// ─── About blurb ─────────────────────────────────────────────────────────────
export const about = {
  lead: "I'm a backend and platform engineer in Bhubaneswar. I build the systems behind public digital services - high-concurrency WhatsApp pipelines, speech AI, and the Kubernetes infrastructure that keeps them running.",
  body: "I care about software that stays quiet under load: fault-tolerant queues, clean job lifecycles, GitOps you can trust, and platforms that scale to zero when no one's looking. Lately that means LLM agents too - a RAG agent that writes WhatsApp Flows at work, and Otto, an autonomous coding agent that turns a chat message into a pull request.",
};

// ─── Stack (grouped) ─────────────────────────────────────────────────────────
export interface StackGroup {
  label: string;
  items: string[];
}

export const stack: StackGroup[] = [
  {
    label: 'Languages & Backend',
    items: ['Python', 'Go', 'SQL', 'Bash', 'FastAPI', 'REST APIs', 'WebSockets', 'Microservices'],
  },
  {
    label: 'GenAI & Agents',
    items: ['Agentic workflows', 'RAG', 'MCP', 'LangChain', 'OpenAI Whisper', 'vLLM'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS (EKS, EC2, S3)', 'Docker', 'Kubernetes', 'Helm', 'Argo CD', 'Terraform', 'GitHub Actions', 'KEDA'],
  },
  {
    label: 'Data & Integrations',
    items: ['PostgreSQL', 'Redis', 'RabbitMQ', 'WhatsApp Cloud API (Flows, Webhooks)', 'GitHub Apps', 'Git'],
  },
];
