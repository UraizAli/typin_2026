import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Code2,
  Link2,
  Mail,
  MessageSquare,
  Phone,
  PieChart,
  Zap,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  image: string;
  color: string;
  size: "big" | "small";
  heroTitle: string;
  heroSummary: string;
  metrics: Array<{ value: string; label: string }>;
  challenges: string[];
  deliverables: string[];
  process: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const services: Service[] = [
  {
    slug: "workflow-automation",
    icon: Zap,
    tag: "Workflow Automation",
    title: "Eliminate Repetitive Tasks",
    description:
      "Stop your team from doing the same thing over and over. We automate data entry, follow-ups, approvals, and handoffs so your people focus on the work that actually grows your business.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    color: "#16A34A",
    size: "big",
    heroTitle: "Workflow automation built around your real operating bottlenecks",
    heroSummary:
      "We map the repetitive work slowing your team down, remove manual handoffs, and turn scattered admin into automated flows that run cleanly in the background.",
    metrics: [
      { value: "20+", label: "hours recovered each week" },
      { value: "70%", label: "less manual admin" },
      { value: "1", label: "shared workflow system" },
    ],
    challenges: [
      "Teams re-entering the same data across forms, inboxes, and spreadsheets",
      "Approvals and task handoffs getting delayed because nobody owns the next step",
      "Important follow-ups depending on memory instead of a reliable system",
    ],
    deliverables: [
      "Workflow audit and automation map",
      "Rule-based triggers, approvals, and task routing",
      "Error handling, notifications, and fallback paths",
      "Visibility into what ran, what failed, and what needs attention",
    ],
    process: [
      {
        title: "Map the current flow",
        description:
          "We document each manual step, owner, decision point, and tool dependency before changing anything.",
      },
      {
        title: "Design the automation logic",
        description:
          "The new flow is built around triggers, conditions, approvals, and exception handling instead of ideal-case assumptions.",
      },
      {
        title: "Deploy and stabilize",
        description:
          "We launch in controlled phases, monitor edge cases, and tighten the workflow until it is dependable under real use.",
      },
    ],
    faqs: [
      {
        question: "Can you automate part of a process instead of the whole thing?",
        answer:
          "Yes. We usually start with the highest-friction segment first, then expand once the first automation proves stable.",
      },
      {
        question: "What if the workflow has exceptions?",
        answer:
          "We design exception paths and human review points upfront so unusual cases do not break the system.",
      },
    ],
  },
  {
    slug: "crm-pipeline-automation",
    icon: BarChart3,
    tag: "CRM & Pipeline",
    title: "Your CRM Runs Itself",
    description:
      "We connect your CRM, inbox, and pipeline so deals move forward and nothing gets lost.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    color: "#0D9488",
    size: "small",
    heroTitle: "A CRM that updates itself and pushes deals forward",
    heroSummary:
      "Lead capture, assignment, stage updates, reminders, and follow-up triggers should not depend on reps remembering admin. We automate that layer.",
    metrics: [
      { value: "0", label: "missed stage updates" },
      { value: "<1m", label: "lead routing time" },
      { value: "100%", label: "pipeline visibility" },
    ],
    challenges: [
      "Deals stalling because follow-ups are inconsistent",
      "Leads living in inboxes before they ever reach the CRM",
      "Management reporting based on incomplete or outdated records",
    ],
    deliverables: [
      "Inbound lead routing and ownership rules",
      "Automated stage movement and reminders",
      "CRM sync with forms, email, calendar, and sales tools",
      "Pipeline dashboards for managers and founders",
    ],
    process: [
      {
        title: "Audit the current pipeline",
        description:
          "We identify where leads are dropping, where reps are doing manual updates, and which fields actually matter.",
      },
      {
        title: "Standardize lifecycle rules",
        description:
          "Qualification, assignment, escalation, and inactivity logic are defined so the CRM behaves consistently.",
      },
      {
        title: "Connect the revenue stack",
        description:
          "Forms, inboxes, calendars, and deal stages are connected so one action updates the right systems automatically.",
      },
    ],
    faqs: [
      {
        question: "Do we need to change CRMs?",
        answer:
          "Usually no. We work with the system you already use and only recommend migration if the current setup is blocking the outcome.",
      },
      {
        question: "Can this support multiple sales reps or teams?",
        answer:
          "Yes. Assignment and routing rules can be built around territory, service line, availability, or custom ownership logic.",
      },
    ],
  },
  {
    slug: "ai-chatbots",
    icon: MessageSquare,
    tag: "AI Chatbots",
    title: "Handle 10x More Enquiries",
    description:
      "AI chatbots for sales, support, and bookings that work 24/7 without hiring more people.",
    image: "https://unsplash.com/photos/BlWbfrQrI5k/download?force=true&w=500",
    color: "#059669",
    size: "small",
    heroTitle: "AI chatbots that qualify, answer, and convert instead of just greeting visitors",
    heroSummary:
      "We build chatbot flows that capture intent, answer common questions, collect the right details, and pass clean context into your team or booking system.",
    metrics: [
      { value: "24/7", label: "instant first response" },
      { value: "10x", label: "more enquiries handled" },
      { value: "1", label: "consistent qualification flow" },
    ],
    challenges: [
      "Website enquiries going cold outside business hours",
      "Support teams answering the same questions repeatedly",
      "Leads arriving without enough context for the next action",
    ],
    deliverables: [
      "Conversation design for sales, support, or booking use cases",
      "Knowledge-grounded answers and escalation logic",
      "Lead capture with CRM and calendar handoff",
      "Analytics on intents, drop-off points, and conversion quality",
    ],
    process: [
      {
        title: "Define intent groups",
        description:
          "We separate the conversations your bot must handle well, such as sales enquiries, support questions, and appointment requests.",
      },
      {
        title: "Build the response system",
        description:
          "Prompting, guardrails, retrieval, and escalation paths are tuned around your business rather than a generic assistant template.",
      },
      {
        title: "Launch with measurement",
        description:
          "We monitor conversation outcomes, weak replies, and transfer quality, then improve the bot against real transcripts.",
      },
    ],
    faqs: [
      {
        question: "Will the chatbot hand over to a human?",
        answer:
          "Yes. We set clear escalation conditions so higher-risk or higher-value conversations move to the right person quickly.",
      },
      {
        question: "Can it work from our documents or FAQ content?",
        answer:
          "Yes. We can ground responses in approved business content so answers stay consistent with your actual policies and offers.",
      },
    ],
  },
  {
    slug: "voice-ai",
    icon: Phone,
    tag: "Voice AI",
    title: "AI Calling That Works",
    description:
      "Automated voice agents that qualify enquiries, capture intent, and book meetings into your calendar without a receptionist on the clock.",
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&q=80",
    color: "#CA8A04",
    size: "big",
    heroTitle: "Voice AI for inbound and outbound calls that need real business outcomes",
    heroSummary:
      "We design voice workflows for qualification, booking, reminders, and basic support so calls get handled immediately without adding headcount.",
    metrics: [
      { value: "30s", label: "response time" },
      { value: "24/7", label: "call coverage" },
      { value: "2x", label: "more booked conversations" },
    ],
    challenges: [
      "Missed calls turning into lost revenue",
      "Staff spending time on repetitive qualification and scheduling",
      "No clean record of why callers reached out and what happened next",
    ],
    deliverables: [
      "Voice conversation flows with qualification logic",
      "Booking, reminder, and routing integrations",
      "Call summaries pushed into CRM or inbox workflows",
      "Fallback to human agents when confidence or complexity drops",
    ],
    process: [
      {
        title: "Script the business logic",
        description:
          "We define what the agent should ask, what counts as qualified, and when it should route or escalate.",
      },
      {
        title: "Connect telephony and systems",
        description:
          "Phone numbers, calendars, CRMs, and notifications are tied together so each call produces a usable next step.",
      },
      {
        title: "Refine against live calls",
        description:
          "We review outcomes, tune phrasing, and improve handling for interruptions, ambiguity, and edge cases.",
      },
    ],
    faqs: [
      {
        question: "Can the agent transfer calls to a real person?",
        answer:
          "Yes. Transfer and fallback rules are part of the core design so callers do not get trapped in automation.",
      },
      {
        question: "Is this only for inbound calls?",
        answer:
          "No. It can also support outbound reminders, follow-ups, reactivation, and qualification campaigns.",
      },
    ],
  },
  {
    slug: "dashboards-reporting",
    icon: PieChart,
    tag: "Dashboards & Reporting",
    title: "See Everything at a Glance",
    description:
      "Live dashboards that show pipeline health, team performance, and campaign ROI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    color: "#0891B2",
    size: "small",
    heroTitle: "Reporting that turns disconnected data into decisions",
    heroSummary:
      "We build dashboards that show what matters operationally and commercially, without forcing your team to pull numbers manually every week.",
    metrics: [
      { value: "Live", label: "reporting visibility" },
      { value: "1", label: "source of truth" },
      { value: "0", label: "manual report chasing" },
    ],
    challenges: [
      "Leadership decisions being made from stale spreadsheets",
      "Teams wasting time assembling reports instead of acting on them",
      "No shared view of pipeline, performance, or service delivery health",
    ],
    deliverables: [
      "Executive dashboards tailored to business KPIs",
      "Automated data sync from CRM, ads, ops, and finance tools",
      "Role-specific views for management and teams",
      "Alerting for threshold breaches and exceptions",
    ],
    process: [
      {
        title: "Choose decision-driving metrics",
        description:
          "We strip reporting down to the numbers that actually influence action, not vanity metrics.",
      },
      {
        title: "Unify the data inputs",
        description:
          "Source systems are cleaned up and mapped so the dashboard stays consistent and trustworthy.",
      },
      {
        title: "Publish and train",
        description:
          "Teams get a dashboard they can read quickly, plus clear definitions for what each metric means and how to use it.",
      },
    ],
    faqs: [
      {
        question: "Can you work with messy source data?",
        answer:
          "Yes, but we will usually standardize key fields and naming first so the reporting layer stays reliable.",
      },
      {
        question: "Do dashboards update automatically?",
        answer:
          "Yes. The goal is live or scheduled syncs so nobody is manually preparing reporting packs.",
      },
    ],
  },
  {
    slug: "system-integrations",
    icon: Link2,
    tag: "System Integrations",
    title: "All Your Tools, One Flow",
    description:
      "Connect your forms, calendars, email, CRM, and tools into one smooth automated process.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
    color: "#15803D",
    size: "small",
    heroTitle: "System integrations that remove the gaps between your tools",
    heroSummary:
      "Most operational friction comes from handoffs between apps. We connect the stack so information moves once and the right action happens automatically.",
    metrics: [
      { value: "1", label: "connected operating flow" },
      { value: "0", label: "duplicate entry loops" },
      { value: "Fast", label: "handoff speed" },
    ],
    challenges: [
      "Teams copying data from one tool into another",
      "Disconnected apps creating blind spots and duplicate work",
      "Critical workflows breaking because integrations are partial or fragile",
    ],
    deliverables: [
      "API and no-code integration architecture",
      "Data mapping and field normalization",
      "Webhook or scheduled sync orchestration",
      "Monitoring for failed syncs and recovery paths",
    ],
    process: [
      {
        title: "Audit the toolchain",
        description:
          "We identify where data is created, where it needs to travel, and which systems should be authoritative.",
      },
      {
        title: "Define the integration rules",
        description:
          "Field mappings, sync direction, triggers, and validation rules are specified before any connection goes live.",
      },
      {
        title: "Deploy with observability",
        description:
          "We make failures visible and recoverable so the integration layer does not become another hidden operational risk.",
      },
    ],
    faqs: [
      {
        question: "Can you connect legacy or niche tools?",
        answer:
          "Often yes. We assess API access, webhook support, and fallback options before committing to the integration design.",
      },
      {
        question: "What happens when a sync fails?",
        answer:
          "We set up alerting, retry logic, and exception handling so failures are surfaced quickly instead of silently corrupting the process.",
      },
    ],
  },
  {
    slug: "ai-assistants",
    icon: Bot,
    tag: "AI Assistants",
    title: "Your 24/7 Digital Employee",
    description:
      "Deploy AI assistants that handle qualification, appointment booking, FAQs, and client nurture around the clock, without breaks or sick days.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    color: "#D97706",
    size: "big",
    heroTitle: "AI assistants that support revenue and operations continuously",
    heroSummary:
      "We build assistants that can own narrow but high-value responsibilities across qualification, support, scheduling, and internal knowledge access.",
    metrics: [
      { value: "24/7", label: "coverage window" },
      { value: "Consistent", label: "response quality" },
      { value: "Scaled", label: "service capacity" },
    ],
    challenges: [
      "Teams losing time to repetitive inbound questions and coordination",
      "Customers expecting immediate responses outside working hours",
      "Internal knowledge trapped in a few experienced employees",
    ],
    deliverables: [
      "Role-specific AI assistant design",
      "Knowledge retrieval, permissions, and guardrails",
      "Task execution against approved tools and systems",
      "Escalation pathways for human review",
    ],
    process: [
      {
        title: "Define the assistant role",
        description:
          "We scope the responsibilities tightly so the assistant has a clear job rather than a vague mandate.",
      },
      {
        title: "Connect approved knowledge and actions",
        description:
          "The assistant is grounded in trusted content and only given the actions it needs to perform safely.",
      },
      {
        title: "Measure business impact",
        description:
          "We track completion quality, deflection, escalation, and time saved so the assistant is managed like an operational asset.",
      },
    ],
    faqs: [
      {
        question: "Is this the same as a chatbot?",
        answer:
          "Not exactly. A chatbot is one interface. An assistant usually has broader workflow context, memory, and task execution responsibilities.",
      },
      {
        question: "Can an assistant be internal-facing only?",
        answer:
          "Yes. Many useful assistants support staff with knowledge access, routing, drafting, and repetitive internal processes.",
      },
    ],
  },
  {
    slug: "custom-solutions",
    icon: Code2,
    tag: "Custom Solutions",
    title: "Built Around Your Workflow",
    description:
      "Tailored portals, dashboards, and apps designed specifically for how your team works.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80",
    color: "#DC2626",
    size: "small",
    heroTitle: "Custom systems when off-the-shelf tools stop fitting the business",
    heroSummary:
      "When your workflow is too specific for generic software, we build the operational layer you actually need instead of forcing compromises.",
    metrics: [
      { value: "Tailored", label: "fit to workflow" },
      { value: "1", label: "central operating layer" },
      { value: "Less", label: "tool sprawl" },
    ],
    challenges: [
      "Teams stitching together too many tools with too many limitations",
      "Critical processes depending on spreadsheets or manual workarounds",
      "Off-the-shelf software forcing the business into the wrong shape",
    ],
    deliverables: [
      "Custom internal tools, portals, or client-facing workflows",
      "Automation logic embedded into the product experience",
      "Reporting, permissions, and role-based access",
      "Roadmap for future expansion once the first release is live",
    ],
    process: [
      {
        title: "Define the real use case",
        description:
          "We focus on the operational outcome the system needs to create, not just the screens it should contain.",
      },
      {
        title: "Build the smallest useful release",
        description:
          "The first version is scoped to replace the most painful workaround and create a stable foundation.",
      },
      {
        title: "Expand from production feedback",
        description:
          "Once real users are in the system, we evolve it around actual usage patterns instead of assumptions.",
      },
    ],
    faqs: [
      {
        question: "Do you only build full apps?",
        answer:
          "No. Sometimes the right answer is a focused internal tool or portal that removes one major operational bottleneck.",
      },
      {
        question: "Can custom solutions include automations too?",
        answer:
          "Yes. Automation is often part of the product logic, not a separate layer.",
      },
    ],
  },
  {
    slug: "email-outreach",
    icon: Mail,
    tag: "Email & Outreach",
    title: "Automated Outreach That Converts",
    description:
      "Smart email sequences and drip campaigns that nurture leads on autopilot.",
    image: "https://unsplash.com/photos/wAZ8pS2D_OA/download?force=true&w=500",
    color: "#7C3AED",
    size: "small",
    heroTitle: "Automated outreach systems that keep warm leads moving",
    heroSummary:
      "We build email and outreach journeys that trigger from real buyer behavior, segment intelligently, and keep follow-up consistent without manual chasing.",
    metrics: [
      { value: "Always-on", label: "lead nurture" },
      { value: "Faster", label: "follow-up cadence" },
      { value: "Higher", label: "pipeline consistency" },
    ],
    challenges: [
      "Leads going cold because follow-up is delayed or inconsistent",
      "One-size-fits-all outreach that ignores intent and stage",
      "No visibility into which sequences are creating meetings or replies",
    ],
    deliverables: [
      "Lifecycle email flows and follow-up sequences",
      "Segmentation rules based on source, behavior, or stage",
      "CRM-triggered nurture automation",
      "Performance reporting on opens, replies, meetings, and drop-off",
    ],
    process: [
      {
        title: "Define lifecycle segments",
        description:
          "We separate cold prospects, active leads, no-shows, old opportunities, and clients so messaging matches intent.",
      },
      {
        title: "Build the sequence logic",
        description:
          "Timing, triggers, suppression rules, and branch conditions are set so contacts do not get messy or conflicting messaging.",
      },
      {
        title: "Improve through signal",
        description:
          "We review response data and conversion outcomes, then tighten messaging and cadence where it matters.",
      },
    ],
    faqs: [
      {
        question: "Can this work with our CRM and forms?",
        answer:
          "Yes. Sequence entry and exit rules are usually tied directly to CRM status, lead source, and engagement data.",
      },
      {
        question: "Do you write the automation logic only or also the content?",
        answer:
          "We can do both. The stronger result comes from aligning message content with the workflow and qualification logic together.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
