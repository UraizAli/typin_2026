import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Code2,
  LayoutTemplate,
  MonitorSmartphone,
  Rocket,
  Settings2,
  ShieldCheck,
  Sparkles,
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
    slug: "mvp-development",
    icon: Rocket,
    tag: "MVP Development",
    title: "Launch a Strong MVP",
    description:
      "We help founders go from idea to working product with a focused MVP that proves the concept, gets user feedback fast, and avoids wasting budget on the wrong features.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    color: "#16A34A",
    size: "big",
    heroTitle: "MVP development for founders who need speed without chaos",
    heroSummary:
      "Typin positions itself as a technical co-founder for ambitious teams. This service translates that promise into a lean, production-minded MVP that is fast to launch and credible with users and investors.",
    metrics: [
      { value: "6-10", label: "weeks for focused MVPs" },
      { value: "1", label: "clear product roadmap" },
      { value: "Fast", label: "feedback loop to market" },
    ],
    challenges: [
      "Founders are unsure what the first version should include and what should wait",
      "Early teams need something launchable, not a bloated backlog full of guesses",
      "Bad architecture decisions at MVP stage create expensive rewrites later",
    ],
    deliverables: [
      "MVP scope definition with feature prioritization",
      "Product architecture and development roadmap",
      "Frontend and backend implementation for launch",
      "Launch support, QA, and post-release iteration plan",
    ],
    process: [
      {
        title: "Define the smallest useful product",
        description:
          "We map the core user journey, strip away distraction, and decide what must exist for a meaningful first release.",
      },
      {
        title: "Build for launch, not just demo",
        description:
          "The product is engineered to work in production with stable foundations rather than hacked together for screenshots.",
      },
      {
        title: "Iterate from real usage",
        description:
          "After launch, we use product signal and user feedback to shape the next phase instead of guessing ahead of the market.",
      },
    ],
    faqs: [
      {
        question: "Can you help define the MVP if the idea is still rough?",
        answer:
          "Yes. That is usually where we add the most value. We help shape the product before engineering starts.",
      },
      {
        question: "Will the MVP be scalable later?",
        answer:
          "Yes. We keep the first release lean, but we avoid shortcuts that make later growth unnecessarily painful.",
      },
    ],
  },
  {
    slug: "ai-powered-solutions",
    icon: Bot,
    tag: "AI-Powered Solutions",
    title: "Add AI Where It Creates Real Value",
    description:
      "We design and ship AI features that solve actual business problems, from automation and recommendations to assistants, analytics, and intelligent product experiences.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&q=80",
    color: "#059669",
    size: "small",
    heroTitle: "AI features built around business outcomes, not hype",
    heroSummary:
      "Typin's site consistently emphasizes AI-powered development. This service turns that positioning into applied AI systems that improve workflows, user experience, and decision-making.",
    metrics: [
      { value: "AI", label: "embedded into product flows" },
      { value: "Faster", label: "decision and task execution" },
      { value: "Smarter", label: "customer interactions" },
    ],
    challenges: [
      "Teams want AI in the product but do not have a clear use case worth building",
      "Generic automations do not fit the product or customer workflow",
      "Founders need help turning raw models into reliable business features",
    ],
    deliverables: [
      "AI use-case discovery and feasibility planning",
      "Model integration, prompting, and guardrail design",
      "AI workflows inside product, support, or internal operations",
      "Measurement framework for quality, accuracy, and business impact",
    ],
    process: [
      {
        title: "Find the highest-leverage use case",
        description:
          "We identify where AI can create an operational or product advantage instead of forcing it into the stack for marketing reasons.",
      },
      {
        title: "Design the system around trust",
        description:
          "The experience, prompts, validation, and fallback logic are designed so the output is useful in real business conditions.",
      },
      {
        title: "Tune against actual usage",
        description:
          "We monitor failures, refine outputs, and improve the feature based on live user behavior.",
      },
    ],
    faqs: [
      {
        question: "Do you only build chatbots?",
        answer:
          "No. AI can power copilots, internal tools, search, classification, personalization, analytics, and workflow automation.",
      },
      {
        question: "Can AI be added to an existing product?",
        answer:
          "Yes. Many teams start by embedding AI into an existing workflow instead of building a new product from scratch.",
      },
    ],
  },
  {
    slug: "web-app-development",
    icon: Code2,
    tag: "Web Development",
    title: "High-Performance Web Applications",
    description:
      "We build modern web products with clean architecture, strong UX, and production-ready code for startups and growing companies.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80",
    color: "#0D9488",
    size: "small",
    heroTitle: "Web apps engineered for usability, speed, and long-term growth",
    heroSummary:
      "Typin publicly highlights React, Next.js, TypeScript, and cloud-native delivery. This service covers the full web application layer behind that promise.",
    metrics: [
      { value: "Modern", label: "frontend architecture" },
      { value: "Scalable", label: "backend foundations" },
      { value: "Smooth", label: "user experience" },
    ],
    challenges: [
      "Teams outgrow no-code tools and need a proper product foundation",
      "Existing web apps become slow, brittle, or hard to extend",
      "Founders need a polished web product that feels credible from day one",
    ],
    deliverables: [
      "Frontend development with responsive UI",
      "Backend APIs, auth flows, and data modeling",
      "Admin panels, dashboards, and internal tools",
      "Deployment, QA, and performance optimization",
    ],
    process: [
      {
        title: "Plan the product structure",
        description:
          "We decide how the product should be organized technically before screens and features multiply.",
      },
      {
        title: "Build the critical paths first",
        description:
          "The most important user journeys are implemented early so quality is visible where it matters.",
      },
      {
        title: "Stabilize for production",
        description:
          "Performance, reliability, and release readiness are treated as part of the product, not an afterthought.",
      },
    ],
    faqs: [
      {
        question: "Do you work with existing codebases?",
        answer:
          "Yes. We can improve or extend an existing application when the current foundation is worth keeping.",
      },
      {
        question: "Can you build internal tools too?",
        answer:
          "Yes. Internal systems are often just as valuable as customer-facing products when operations are the bottleneck.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    icon: MonitorSmartphone,
    tag: "Mobile Apps",
    title: "Mobile Products Users Keep Coming Back To",
    description:
      "We design and build mobile applications with strong usability, product clarity, and a technical foundation that supports growth after launch.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    color: "#2563EB",
    size: "big",
    heroTitle: "Mobile app development with startup speed and product discipline",
    heroSummary:
      "Typin frames itself as a partner from concept to market success. Mobile product delivery is part of that positioning, especially for startups building customer-facing experiences.",
    metrics: [
      { value: "iOS", label: "and Android coverage" },
      { value: "Strong", label: "retention-first UX" },
      { value: "Ready", label: "for app store launch" },
    ],
    challenges: [
      "Founders need a mobile product but lack technical leadership on architecture and scope",
      "Design concepts do not translate cleanly into real mobile interactions",
      "Teams need a mobile release that feels premium without dragging the timeline",
    ],
    deliverables: [
      "Mobile product planning and screen flow design",
      "Native or cross-platform application development",
      "Authentication, APIs, notifications, and core app logic",
      "Store submission support and post-launch improvements",
    ],
    process: [
      {
        title: "Validate the mobile use case",
        description:
          "We make sure the mobile product solves the right problem and that the app experience is justified by the workflow.",
      },
      {
        title: "Design for real usage patterns",
        description:
          "Navigation, onboarding, and repeat actions are shaped around mobile behavior instead of porting web thinking onto a phone.",
      },
      {
        title: "Launch and refine",
        description:
          "After release, we review adoption, friction points, and product metrics to improve the next version intelligently.",
      },
    ],
    faqs: [
      {
        question: "Can you build both web and mobile together?",
        answer:
          "Yes. Many products need both, and we can align them under one roadmap and shared backend.",
      },
      {
        question: "Do you help with app store submission?",
        answer:
          "Yes. We handle the practical launch steps as part of getting the product into users' hands.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    icon: LayoutTemplate,
    tag: "UI/UX Design",
    title: "Design That Clarifies the Product",
    description:
      "We craft interfaces and user flows that make complex products easier to understand, easier to use, and more likely to convert.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=700&q=80",
    color: "#7C3AED",
    size: "small",
    heroTitle: "UI and UX design that improves both adoption and confidence",
    heroSummary:
      "Typin's public messaging includes elegant, high-performance software and user-centric execution. This service covers the product design layer that makes that credible.",
    metrics: [
      { value: "Clear", label: "user journeys" },
      { value: "Better", label: "product conversion" },
      { value: "Polished", label: "brand perception" },
    ],
    challenges: [
      "Founders know what the product should do but not how the experience should feel",
      "Products become hard to use when features pile up without design discipline",
      "Weak interface quality hurts trust, onboarding, and conversion",
    ],
    deliverables: [
      "Wireframes, user flows, and interface systems",
      "High-fidelity screen design for web or mobile",
      "Design direction aligned with market and brand",
      "Developer-ready assets and interaction guidance",
    ],
    process: [
      {
        title: "Reduce complexity first",
        description:
          "We clarify the product structure before styling the interface so the experience feels coherent, not just attractive.",
      },
      {
        title: "Design key moments deliberately",
        description:
          "Onboarding, core actions, and conversion points are designed with extra care because they shape user perception fastest.",
      },
      {
        title: "Hand off for clean execution",
        description:
          "The final output is prepared so engineering can build it accurately without guessing through the design intent.",
      },
    ],
    faqs: [
      {
        question: "Do you design only, or also build the product?",
        answer:
          "We can do either, but the strongest outcome usually comes when design and development are handled together.",
      },
      {
        question: "Can you redesign an existing product?",
        answer:
          "Yes. We often improve usability and clarity without requiring a full rebuild from scratch.",
      },
    ],
  },
  {
    slug: "saas-development",
    icon: Settings2,
    tag: "SaaS Development",
    title: "Custom SaaS Platforms Built to Scale",
    description:
      "We build SaaS products with the core systems founders need early: authentication, billing, dashboards, permissions, workflows, and a roadmap that supports growth.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80",
    color: "#EA580C",
    size: "small",
    heroTitle: "SaaS products built with the foundations founders regret skipping",
    heroSummary:
      "LinkedIn signals SaaS development and custom software as part of Typin's service mix. This service packages that clearly for founders building subscription products.",
    metrics: [
      { value: "Core", label: "SaaS architecture in place" },
      { value: "Ready", label: "for recurring revenue flows" },
      { value: "Built", label: "for phased expansion" },
    ],
    challenges: [
      "Founders need more than a landing page and basic prototype",
      "SaaS products require product logic, user roles, billing, and admin visibility from early on",
      "Short-term builds often ignore the systems that become essential after traction starts",
    ],
    deliverables: [
      "Multi-user SaaS product architecture",
      "Billing, subscriptions, and account management flows",
      "Permissions, dashboards, and internal admin tools",
      "Roadmap planning for post-MVP expansion",
    ],
    process: [
      {
        title: "Define the SaaS core loop",
        description:
          "We map how users sign up, activate, derive value, and stay engaged so the product has a clear revenue and retention structure.",
      },
      {
        title: "Build the operational foundations",
        description:
          "Account logic, permissions, billing, and analytics are treated as product essentials, not optional extras.",
      },
      {
        title: "Prepare for the next phase",
        description:
          "The product is structured so new modules, roles, and workflows can be added without starting over.",
      },
    ],
    faqs: [
      {
        question: "Can you build B2B SaaS and client portals?",
        answer:
          "Yes. Both fit naturally within this service depending on the business model and user roles.",
      },
      {
        question: "Do you help with product roadmap after launch?",
        answer:
          "Yes. We can continue as a build partner while the product grows beyond the first release.",
      },
    ],
  },
  {
    slug: "technical-cofounder-partnership",
    icon: ShieldCheck,
    tag: "Technical Co-Founder Support",
    title: "Technical Partnership for Non-Technical Founders",
    description:
      "We act as a strategic technical partner for founders who need product direction, architecture decisions, execution oversight, and a team that thinks beyond tickets.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    color: "#0891B2",
    size: "big",
    heroTitle: "A technical co-founder mindset without the typical agency gap",
    heroSummary:
      "This is the strongest repeated message across Typin's public positioning. The offer is not just software delivery. It is product thinking, execution guidance, and long-term technical partnership.",
    metrics: [
      { value: "Strategic", label: "technical decision support" },
      { value: "Shared", label: "ownership mindset" },
      { value: "Clear", label: "product direction" },
    ],
    challenges: [
      "Non-technical founders struggle to evaluate architecture, timelines, and tradeoffs",
      "Many agencies build what is asked for without helping define what should be built",
      "Startups need a partner who understands both product risk and engineering execution",
    ],
    deliverables: [
      "Technical planning and architecture direction",
      "Feature scoping, tradeoff analysis, and roadmap input",
      "Execution leadership across design and development",
      "Ongoing support as the product and company mature",
    ],
    process: [
      {
        title: "Align on the business goal",
        description:
          "We start from the founder's market, users, and growth constraints instead of treating engineering as an isolated function.",
      },
      {
        title: "Make the technical path legible",
        description:
          "The roadmap, architecture, and milestone plan are shaped so founders can make decisions confidently.",
      },
      {
        title: "Execute with accountability",
        description:
          "We stay close to outcomes, not just tasks, and keep the build aligned with the company's actual priorities.",
      },
    ],
    faqs: [
      {
        question: "Is this fractional CTO work or product development?",
        answer:
          "It can be both. The value is in combining strategic guidance with real execution capability.",
      },
      {
        question: "Can you work with an internal team?",
        answer:
          "Yes. We can lead delivery ourselves or work alongside an internal team where that is the better structure.",
      },
    ],
  },
  {
    slug: "end-to-end-product-development",
    icon: Sparkles,
    tag: "End-to-End Delivery",
    title: "From Concept to Launch and Beyond",
    description:
      "We handle strategy, design, development, deployment, and ongoing support so founders do not have to stitch together multiple vendors to get a product live.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80",
    color: "#DC2626",
    size: "small",
    heroTitle: "End-to-end product development with one team carrying the full arc",
    heroSummary:
      "The website explicitly presents Typin as a partner from concept to market success. This service makes that promise clear for buyers who need one accountable team across the entire product lifecycle.",
    metrics: [
      { value: "One", label: "delivery partner across stages" },
      { value: "Less", label: "handoff friction" },
      { value: "Ongoing", label: "support after launch" },
    ],
    challenges: [
      "Founders lose momentum when strategy, design, and engineering are split across disconnected vendors",
      "Launch quality suffers when nobody owns the full product journey",
      "Products need continued support after release, not just a handoff and goodbye",
    ],
    deliverables: [
      "Discovery, planning, and product definition",
      "UI/UX design and engineering execution",
      "Deployment, monitoring, and release support",
      "Maintenance, optimization, and next-phase planning",
    ],
    process: [
      {
        title: "Turn the idea into an execution plan",
        description:
          "We convert the vision into scope, milestones, and a delivery sequence that the team can actually execute.",
      },
      {
        title: "Ship with one accountable team",
        description:
          "Design, engineering, QA, and launch support stay coordinated under one delivery structure.",
      },
      {
        title: "Support the product after release",
        description:
          "We stay available for stabilization, improvements, and the next wave of feature or growth work.",
      },
    ],
    faqs: [
      {
        question: "Do you stay involved after launch?",
        answer:
          "Yes. Ongoing support is part of the offer when the product needs active improvement after release.",
      },
      {
        question: "Can this include AI, web, and mobile in one engagement?",
        answer:
          "Yes. End-to-end delivery is specifically useful when several product layers need to move together under one roadmap.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
