export interface Project {
  title: string
  category: string
  tech: string[]
  description: string
  role: string
  highlights: string[]
  color: string
  engagement?: string
  organization?: string
  contribution?: string
  filters?: string[]
  url?: string
  evidence?: string
}

export interface Service {
  icon: string
  title: string
  description: string
  tech: string
}

export type TechStack = Record<string, string[]>
