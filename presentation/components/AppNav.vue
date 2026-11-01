<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Journey' },
  { id: 'cv', label: 'CV' },
]
const menuOpen = ref(false)
const activeSection = ref('home')
const progress = ref(0)
const menuButton = ref<HTMLButtonElement | null>(null)
let frame = 0

function updateScroll() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    const available = document.documentElement.scrollHeight - window.innerHeight
    progress.value = available > 0 ? window.scrollY / available : 0
    const current = [...links, { id: 'contact' }].reverse().find(link => {
      const section = document.getElementById(link.id)
      return section && section.getBoundingClientRect().top < window.innerHeight * .4
    })
    activeSection.value = current?.id ?? 'home'
  })
}
function closeMenu(event?: KeyboardEvent) {
  if (event && event.key !== 'Escape') return
  if (menuOpen.value) {
    menuOpen.value = false
    if (event) menuButton.value?.focus()
  }
}
onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('keydown', closeMenu)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('keydown', closeMenu)
})
</script>

<template>
  <nav class="site-nav" aria-label="Main navigation">
    <div class="nav-inner page-shell">
      <a href="#home" class="nav-brand" aria-label="Kum Brian Ihimbru — home" @click="closeMenu()">
        <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M7 7v26M7 21 23 7M7 21l16 12M26 7v26M26 21c13-15 13 15 0 0" stroke="currentColor" stroke-width="3.8" stroke-linejoin="round" /></svg>
        <span>Kum Brian<span class="nav-brand-sub">Developer & builder</span></span>
      </a>
      <div class="nav-desktop">
        <a v-for="link in links" :key="link.id" :href="`#${link.id}`" :aria-current="activeSection === link.id ? 'location' : undefined" class="nav-link"><span class="nav-dot" />{{ link.label }}</a>
      </div>
      <a href="#contact" class="nav-contact">Let's talk <span aria-hidden="true">↗</span></a>
      <button ref="menuButton" type="button" class="nav-menu" :aria-expanded="menuOpen" aria-controls="mobile-navigation" :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'" @click="menuOpen = !menuOpen"><span :class="{ open: menuOpen }" /><span :class="{ open: menuOpen }" /></button>
    </div>
    <div v-if="menuOpen" id="mobile-navigation" class="nav-mobile">
      <a v-for="(link, i) in [...links, { id: 'contact', label: 'Contact' }]" :key="link.id" :href="`#${link.id}`" @click="closeMenu()"><span class="mono">0{{ i + 1 }}</span>{{ link.label }}<span aria-hidden="true">↗</span></a>
    </div>
    <span class="nav-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
  </nav>
</template>

<style scoped>
.site-nav { position: sticky; top: 0; z-index: 40; background: var(--paper); border-bottom: 1px solid var(--line); }
.nav-inner { height: 96px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.nav-brand { display: flex; align-items: center; gap: 15px; font-size: 15px; font-weight: 700; letter-spacing: -.02em; line-height: 1.35; }
.nav-brand svg { width: 40px; height: 40px; }
.nav-brand-sub { display: block; font-family: var(--font-mono); text-transform: uppercase; font-size: 8px; letter-spacing: .1em; font-weight: 400; margin-top: 3px; }
.nav-desktop { display: flex; gap: 34px; }
.nav-link { position: relative; padding: 14px 0; display: flex; gap: 8px; align-items: center; font-size: 13px; }
.nav-dot { width: 5px; height: 5px; background: currentColor; border-radius: 50%; transform: scale(0); transition: transform .25s; }
.nav-link:hover .nav-dot, .nav-link[aria-current] .nav-dot { transform: scale(1); }
.nav-contact { border: 1px solid var(--ink); border-radius: 100px; padding: 12px 19px; font-size: 12px; display: flex; align-items: center; gap: 30px; transition: background .25s, color .25s; }
.nav-contact:hover { color: var(--paper); background: var(--ink); }
.nav-contact span { font-size: 20px; line-height: 1; }
.nav-menu { display: none; }
.nav-progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--ink); transform-origin: left; pointer-events: none; }
.nav-mobile { padding: 12px 22px 24px; border-top: 1px solid var(--line); }
.nav-mobile a { display: flex; align-items: center; gap: 20px; padding: 16px 0; font-family: var(--font-display); font-size: 25px; border-bottom: 1px solid var(--line); }
.nav-mobile a > span:last-child { margin-left: auto; }
.nav-mobile .mono { font-size: 10px; color: var(--muted); }
@media(min-width: 761px) { .nav-mobile { display: none; } }
@media(max-width: 760px) {
  .nav-inner { height: 76px; gap: 15px; }
  .nav-desktop, .nav-contact { display: none; }
  .nav-brand svg { width: 34px; height: 34px; }
  .nav-brand { gap: 10px; font-size: 13px; }
  .nav-menu { width: 44px; height: 44px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; border: 1px solid var(--line); border-radius: 50%; }
  .nav-menu span { width: 17px; height: 1px; background: var(--ink); transition: transform .3s; }
  .nav-menu span.open:first-child { transform: translateY(3.5px) rotate(45deg); }
  .nav-menu span.open:last-child { transform: translateY(-3.5px) rotate(-45deg); }
}
</style>
