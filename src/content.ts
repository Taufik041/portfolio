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
    slug: 'mini-vercel',
    title: 'Mini-Vercel',
    icon: 'layers',
    description:
      'Self-hosted Kubernetes PaaS. Push a GitHub URL, get a live subdomain. Nixpacks + Kaniko builds, KEDA scale-to-zero, Nginx ingress.',
    tags: ['Kubernetes', 'FastAPI', 'KEDA', 'Kaniko'],
    media: [],
    repo: 'https://github.com/Taufik041',
  },
  {
    slug: 'flow-generator',
    title: 'WhatsApp Flow Generator',
    icon: 'bubble',
    description:
      'RAG-backed LLM tool that turns specs into valid WhatsApp Flow JSON. FastAPI microservices, PostgreSQL + Qdrant, Next.js chat UI.',
    tags: ['RAG', 'Qdrant', 'FastAPI', 'Next.js'],
    media: [],
    repo: 'https://github.com/Taufik041',
  },
  {
    slug: 'odia-whisper',
    title: 'Odia Whisper',
    icon: 'wave',
    description:
      'Fine-tuned OpenAI Whisper for Odia speech recognition. Distributed inference backend with GPU autoscaling.',
    tags: ['PyTorch', 'Whisper', 'GPU autoscaling'],
    media: [],
    repo: 'https://github.com/Taufik041',
  },
];

// ─── Personal info ────────────────────────────────────────────────────────────
export const person = {
  name:         'Taufik Khan',
  role:         'Backend & platform engineer',
  location:     'Bhubaneswar, India',
  locationNote: 'Open to relocation / remote',
  headline:     'I build systems that stay calm when thousands of people hit them at once.',
  subline:
    'I work on government digital services - taking public services live on WhatsApp at high concurrency, fine-tuning speech AI for Odia, and running my own Kubernetes platform on the side.',
  // ↓ Replace these placeholders with your real links
  github:   'https://github.com/Taufik041',
  linkedin: 'https://www.linkedin.com/in/taufik-khan/',
  resume:   '/resume.pdf',          // drop resume.pdf into /public/
  email:    'taufik4051@gmail.com',
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
    period:   'Dec 2025 - Present',
    location: 'Bhubaneswar, Odisha',
    domain:   'Backend, DevOps',
    bullets: [
      'Built langgenie.ai, a fault-tolerant, message-driven backend using RabbitMQ, PostgreSQL, and FastAPI with streaming results and job lifecycle management for a distributed Speech AI platform.',
      'Engineered a data pipeline to fine-tune OpenAI Whisper models for Odia language detection, transcription, and translation, achieving about 90% accuracy on regional datasets.',
      'Implemented priority queues and handled concurrent speech jobs with 2 GPU workers that auto-scale based on load.',
      'Built a RAG-based internal agent that converts PDF/image/text specs into production WhatsApp Flow JSON (bilingual English/Odia), cutting manual flow authoring for government services by 90%.',
    ],
  },
  {
    company:  'Bipros',
    title:    'Software Engineer Trainee',
    period:   'May-Dec 2025',
    location: 'Bhubaneswar, Odisha',
    domain:   'Backend, DevOps',
    bullets: [
      "Took 23+ live government services to a high-concurrency WhatsApp backend. Built distributed speech-AI infrastructure with GPU autoscaling, and shipped the platform's RAG document-to-Flow tooling.",
      'Engineered a backend processing 1,000+ citizen requests daily with zero data loss; cut processing time ~60% by replacing legacy portals with WhatsApp Flows across 150+ services.',
      'Fine-tuned OpenAI Whisper for Odia - detection, transcription and translation at ~90% accuracy - served through priority queues across auto-scaling GPU workers.',
    ],
  },
];

// ─── About blurb ─────────────────────────────────────────────────────────────
export const about = {
  lead: "I'm a backend and DevOps engineer in Bhubaneswar, building the systems behind public digital services - speech AI, high-concurrency WhatsApp pipelines, and the infrastructure that runs them.",
  body: "I care about software that stays quiet under load: fault-tolerant queues, clean job lifecycles, and platforms that scale to zero when no one's looking. Lately I've been fine-tuning speech models for Odia and running a self-hosted Kubernetes PaaS for the fun of it.",
};

// ─── Stack pills ─────────────────────────────────────────────────────────────
export const stack = [
  'Python', 'SQL', 'FastAPI', 'Kubernetes', 'Docker', 'Terraform',
  'Helm', 'ArgoCD', 'PostgreSQL', 'Redis', 'RabbitMQ',
  'GitHub Actions', 'Nginx', 'OpenAI Whisper', 'PyTorch', 'Qdrant',
];
