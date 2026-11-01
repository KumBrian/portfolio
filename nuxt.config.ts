import profile from './domain/data/profile.json'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  typescript: { strict: true, typeCheck: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: `${profile.name} — Mobile, Web & Backend Developer`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: profile.intro },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: profile.website },
        { property: 'og:title', content: `${profile.name} — ${profile.title}` },
        { property: 'og:description', content: profile.intro },
        { property: 'og:image', content: `${profile.website}social-preview.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: `${profile.name} — Mobile, Web and Backend Systems` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${profile.website}social-preview.png` },
      ],
      link: [
        { rel: 'canonical', href: profile.website },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;700&family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@500;600;700;800&display=swap' },
      ],
    },
  },
})
