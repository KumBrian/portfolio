# Kum Brian Ihimbru — Portfolio

Nuxt 3 / Vue 3 portfolio with professional case studies, independent client work, an experience timeline and a downloadable one-page CV.

The visual system combines warm ivory, charcoal and acid green with Syne display typography. A native canvas trefoil connects the mobile, web and backend disciplines; each project has an original abstract SVG cover. Motion includes subtle sculpture rotation, hover-driven artwork and section reveals, with a global pause control and reduced-motion support. The gallery, case studies and navigation adapt to mobile and keyboard use.

## Development

Install with `bun install` (the repository includes `bun.lock`), then run `bun run dev`. Development and preview use `http://127.0.0.1:4173` to leave ports 3000 and 3001 available for other applications. The equivalent npm scripts also work. Run `bun run typecheck` and `bun run build` before shipping.

## Content and CV

`domain/data/profile.json` contains the shared profile, DHI experience, seven featured projects, skills and education used by the website and CV. `domain/data/projects.ts` preserves the earlier portfolio entries under Other Work.

After editing the shared content, run `python3 scripts/generate_cv.py` with ReportLab installed. It writes `public/Kum_Brian_Ihimbru_CV.pdf`; commit that generated file alongside the content change. Update the `updated` field when publishing a content revision. The original source documents remain outside the public site.

The current version uses the supplied October 2026 career blueprint and public CV draft, with the user's corrections: **DHI** and **CCA Pay**. It describes individual contributions to team products and does not claim unverified adoption, revenue or partner endorsement. The graduation year is omitted because the blueprint marks it for confirmation. Exact project dates are also omitted.

Before publishing, review project names and disclosure permissions, the education award year if you want it shown, and any additional public contact details. The existing GitHub profile is the contact destination; replace or supplement it with an approved email or LinkedIn URL when available.

## Deployment

`bun run build` creates the Nitro server output. `bun run generate` creates a static site in `.output/public` suitable for static hosting. Production metadata uses `website` from the shared content file.
