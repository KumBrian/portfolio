import type { Project } from '../entities/portfolio'

export const PROJECTS: Project[] = [
  {
    title: 'FrancTrac',
    category: 'Mobile App',
    tech: ['Flutter', 'Dart', 'Hive', 'SMS Parsing'],
    description:
      'Personal finance app for tracking Cameroonian mobile money transactions (MTN MoMo, Orange Money). Automatic SMS parsing, spending analytics, and local currency support.',
    role: 'Solo Developer — Architecture to Deployment',
    highlights: [
      'Clean Architecture with Riverpod',
      'Offline-first with Hive persistence',
      'SMS permission handling & parsing engine',
    ],
    color: '#0D9488',
  },
  {
    title: 'CleanSweep',
    category: 'Desktop App',
    tech: ['Swift', 'SwiftUI', 'macOS'],
    description:
      'Native macOS system cleaner with a triple-gate safety system for file deletion. 48 source files following Clean Architecture across presentation, domain, and data layers.',
    role: 'Solo Developer',
    highlights: [
      'Triple-gate safety system',
      'In-memory scan pruning for performance',
      'List-based row virtualization',
    ],
    color: '#6366F1',
  },
  {
    title: 'NomVote',
    category: 'Web App',
    tech: ['Nuxt 3', 'TypeScript', 'Tailwind', 'Supabase', 'Pinia'],
    description:
      'Internal employee recognition and voting platform with role-based access control, blind voting enforcement, and database-level constraints.',
    role: 'Full Stack Developer',
    highlights: [
      'RBAC with Supabase RLS',
      'Blind voting enforcement',
      'TanStack Query for data fetching',
    ],
    color: '#F59E0B',
  },
  {
    title: 'Idle Empire',
    category: 'Mobile Game',
    tech: ['Flutter', 'Dart', 'Riverpod', 'Hive'],
    description:
      'Idle investment simulation game using Hexagonal Clean Architecture. Real-time market simulation with custom probability distributions.',
    role: 'Solo Developer',
    highlights: [
      'Hexagonal Clean Architecture',
      'Custom Box-Muller RNG implementation',
      'Hive persistence layer',
    ],
    color: '#EF4444',
  },
  {
    title: 'Phantom',
    category: 'Full Stack Platform',
    tech: ['Go', 'Bun', 'Hono', 'TypeScript', 'PostgreSQL', 'Flutter'],
    description:
      'Self-hosted VPN/privacy proxy platform with Go node agents, a coordination API, and a Flutter client. Zero paid third-party dependencies.',
    role: 'Architect & Developer',
    highlights: [
      'Go-based exit node agent',
      'Bun + Hono coordination API',
      'Flutter cross-platform client',
    ],
    color: '#8B5CF6',
  },
  {
    title: 'Cinema',
    category: 'Web App',
    tech: ['Vue 3', 'TypeScript', 'Pinia', 'Appwrite', 'Axios', 'Tailwind'],
    description:
      'Movie recommendation and favorites platform integrating the OMDB API and Appwrite for auth and database. Supports search, filtering by type and year, pagination, and persisted user favourites.',
    role: 'Solo Developer',
    highlights: [
      'Layered service architecture (types → config → services → stores)',
      'Appwrite auth with navigation guards',
      'Type-safe localStorage wrapper & centralized error handling',
    ],
    color: '#EC4899',
  },
  {
    title: 'Vizzi',
    category: 'iOS App',
    tech: ['Swift', 'SwiftUI', 'MVVM', 'Xcode'],
    description:
      'Native iOS application built with SwiftUI following an MVVM pattern with dedicated Views, ViewModels, Models, and Services layers.',
    role: 'Solo Developer',
    highlights: [
      'SwiftUI declarative UI',
      'MVVM architecture with clean layer separation',
      'Native iOS experience',
    ],
    color: '#0EA5E9',
  },
  {
    title: 'WordPress Custom Sites',
    category: 'WordPress',
    tech: ['WordPress', 'PHP', 'Elementor', 'Custom Plugins'],
    description:
      'Custom WordPress development including theme debugging, plugin conflict resolution, and admin dashboard creation. Deep experience with Gavias themes and Elementor.',
    role: 'WordPress Developer',
    highlights: [
      'Custom plugin admin dashboards',
      'Complex theme debugging',
      'Performance optimization',
    ],
    color: '#3B82F6',
  },
]
