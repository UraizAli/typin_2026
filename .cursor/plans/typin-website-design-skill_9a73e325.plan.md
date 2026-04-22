---
name: typin-website-design-skill
overview: Create a Cursor skill that acts as a frontend designer for Typin You's website, guiding the agent to build bold, non-traditional, image-rich designs for an AI agentic workflows and smart automation company -- replacing the current conventional layout with a modern, visually striking experience.
todos:
  - id: create-skill-dir
    content: Create ~/.cursor/skills/typin-website-designer/ directory
    status: completed
  - id: write-skill-md
    content: Write SKILL.md with frontmatter and comprehensive design directives
    status: completed
  - id: write-design-system
    content: Write references/design-system.md with dark palette, typography, gradients, glassmorphism tokens
    status: completed
  - id: write-section-blueprints
    content: Write references/section-blueprints.md with per-section layout and animation specs
    status: completed
  - id: write-recommended-libs
    content: Write references/recommended-libraries.md with Framer Motion, Swiper, tsparticles usage
    status: completed
isProject: false
---

# Typin You Website Design Skill

## Context

The workspace at `/Users/uraizali/Desktop/TYPIN/typin_website_2026/typin_temp` contains a **Vite + React 19 + TypeScript + Tailwind CSS v4** site. The entire UI is in [`src/App.tsx`](src/App.tsx) -- a single-file landing page with a conventional card-based layout. The user wants a **bold, non-traditional, image-heavy redesign** that reflects the AI/automation identity of "Typin You."

Skills live at `~/.cursor/skills/<skill-name>/SKILL.md` and follow the standard frontmatter + markdown body format.

## Skill Structure

```
~/.cursor/skills/typin-website-designer/
├── SKILL.md                          (main skill file)
└── references/
    ├── design-system.md              (color tokens, typography, spacing, gradients)
    ├── section-blueprints.md         (per-section layout + animation specs)
    └── recommended-libraries.md      (Framer Motion, Three.js, Lottie, Swiper, etc.)
```

## SKILL.md Content Plan

### Frontmatter
- **name**: `typin-website-designer`
- **description**: Triggers on requests to design, redesign, style, or build the Typin You website. Covers hero sections, service showcases, about pages, case studies, testimonials, contact forms, and footers with bold non-traditional design patterns. Triggers on phrases like "design my website", "make it look modern", "redesign the landing page", "add animations", "make it bold/creative", "non-traditional layout".

### Body -- Key Design Directives

The SKILL.md body will instruct the agent to follow these non-traditional design principles:

1. **Dark-first palette** with electric accent gradients (deep navy/charcoal base, neon purple/cyan/magenta accents) instead of the current white/light theme
2. **Full-bleed hero** with animated gradient mesh or particle background, large typography with animated text reveal, and a floating 3D or isometric illustration
3. **Bento grid layout** for services (asymmetric card sizes, glassmorphism cards with backdrop-blur, hover micro-interactions) instead of uniform grids
4. **Horizontal scroll showcases** and parallax sections for case studies
5. **Image-heavy approach**: every section must include high-quality visuals -- hero illustrations, service icons/screenshots, team photos, client logos with hover effects, full-width background images between sections
6. **Scroll-driven animations** using Framer Motion (fade-in, stagger, parallax, scale reveals)
7. **Interactive service cards** with 3D tilt on hover, gradient borders, animated icons
8. **Testimonial carousel** with autoplay, blurred background cards, avatar rings
9. **Sticky navigation** with blur backdrop, progress indicator, and smooth scroll
10. **CTA sections** with animated gradient backgrounds and floating elements
11. **Footer** with animated brand mark, newsletter input, and social hover effects

### References

- **`references/design-system.md`**: Color palette (dark mode tokens), typography scale (Inter + display font), spacing system, gradient definitions, shadow/glow tokens, border-radius standards, glassmorphism recipe
- **`references/section-blueprints.md`**: Detailed layout specs for each section (Hero, Services Bento, About with video, Logo marquee, Testimonials, Case Studies, How It Works timeline, Tech stack, Blog carousel, CTA, Footer) including responsive breakpoints and image placement
- **`references/recommended-libraries.md`**: Framer Motion (animations), Swiper (carousels), react-tilt (3D card hover), tsparticles (particle backgrounds) -- with install commands and basic usage patterns compatible with the existing Vite + React 19 + Tailwind v4 stack

## Key Technical Details

- Stack stays the same: **Vite + React 19 + TypeScript + Tailwind CSS v4**
- The skill will instruct breaking `src/App.tsx` into component files under `src/components/` for maintainability
- All images referenced via Unsplash/Pexels URLs or AI-generated placeholders for services, hero, and backgrounds
- Animations via Framer Motion (to be added as a dependency)
- The skill preserves the existing content/copy from the current site but transforms the visual presentation
