import type { Service } from '../entities/portfolio'

export const SERVICES: Service[] = [
  {
    icon: '📱',
    title: 'Mobile Apps',
    description: 'Cross-platform mobile apps with clean architecture — one codebase, iOS + Android, pixel-perfect UI.',
    tech: 'Flutter · Dart · Riverpod · React Native · Expo',
  },
  {
    icon: '🌐',
    title: 'Web Applications',
    description: 'Modern, fast web apps with SSR, type safety, and great developer experience.',
    tech: 'Nuxt 3 · Vue · TypeScript · Tailwind',
  },
  {
    icon: '⚙️',
    title: 'Backend & APIs',
    description: 'Scalable REST APIs and microservices with clean layering and solid architecture.',
    tech: 'Spring Boot · Go · PostgreSQL · Supabase',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'High-fidelity prototypes, design systems, and motion design that translate directly to production.',
    tech: 'Figma · Adobe Photoshop · Rive',
  },
  {
    icon: '🔧',
    title: 'WordPress',
    description: 'Custom plugins, admin dashboards, theme work, and debugging for complex WordPress sites.',
    tech: 'PHP · Elementor · WooCommerce · Custom Plugins',
  },
]
