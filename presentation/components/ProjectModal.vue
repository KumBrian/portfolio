<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { Project } from '../../domain/entities/portfolio'
import ProjectArtwork from './ProjectArtwork.vue'

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ (e: 'close'): void }>()
const dialog = ref<HTMLDialogElement | null>(null)
let previousOverflow = ''
let returnFocus: HTMLElement | null = null
let hasScrollLock = false

function close() { emit('close') }

function restorePage() {
  if (hasScrollLock) document.body.style.overflow = previousOverflow
  hasScrollLock = false
  returnFocus?.focus({ preventScroll: true })
  returnFocus = null
}

function keepFocusInside(event: KeyboardEvent) {
  if (event.key !== 'Tab' || !dialog.value) return
  const controls = Array.from(dialog.value.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'))
    .filter(control => control.getClientRects().length > 0)
  const first = controls[0]
  const last = controls[controls.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

watch(() => props.project, async (project) => {
  if (project) {
    if (!hasScrollLock) {
      returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
      previousOverflow = document.body.style.overflow
    }
    await nextTick()
    if (!props.project || !dialog.value) return
    if (!dialog.value.open) dialog.value.showModal()
    dialog.value.scrollTop = 0
    document.body.style.overflow = 'hidden'
    hasScrollLock = true
  } else {
    dialog.value?.close()
    restorePage()
  }
})

onBeforeUnmount(() => {
  dialog.value?.close()
  if (hasScrollLock) restorePage()
})
</script>

<template>
  <dialog ref="dialog" aria-labelledby="project-title" aria-describedby="project-context" class="project-dialog" @cancel.prevent="close" @keydown="keepFocusInside" @click="($event.target === dialog) && close()">
    <article v-if="project" class="case-study">
      <div class="case-study__toolbar">
        <span class="case-study__kicker">Selected work <span>/</span> Case study</span>
        <button type="button" autofocus aria-label="Close case study" class="case-study__close" @click="close"><span>Close</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.5" /></svg></button>
      </div>
      <header class="case-study__header">
        <p class="case-study__category">{{ project.category }}</p>
        <h2 id="project-title">{{ project.title }}<span aria-hidden="true">.</span></h2>
        <div class="case-study__engagement"><span class="case-study__dot" /><span>{{ project.engagement || 'Independent exploration' }}<template v-if="project.organization"> / {{ project.organization }}</template></span></div>
      </header>
      <div class="case-study__art"><ProjectArtwork :title="project.title" /></div>
      <div class="case-study__body">
        <div class="case-study__section">
          <h3 class="case-study__label">01 / The context</h3>
          <div><p id="project-context" class="case-study__intro">{{ project.description }}</p><div class="case-study__role"><span>My role</span><p>{{ project.role }}</p></div></div>
        </div>
        <div class="case-study__section">
          <h3 class="case-study__label">02 / Contribution</h3>
          <div><p v-if="project.contribution" class="case-study__contribution">{{ project.contribution }}</p><ul class="case-study__highlights"><li v-for="(highlight, index) in project.highlights" :key="highlight"><span aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span><p>{{ highlight }}</p></li></ul></div>
        </div>
        <div class="case-study__section">
          <h3 class="case-study__label">03 / Built with</h3>
          <div class="case-study__tech"><span v-for="tool in project.tech" :key="tool">{{ tool }}</span></div>
        </div>
        <div v-if="project.evidence" class="case-study__section case-study__section--evidence"><h3 class="case-study__label">Project notes</h3><p>{{ project.evidence }}</p></div>
        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="case-study__live">Visit live website <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>
        <footer class="case-study__footer"><span>Kum Brian Ihimbru</span><span>Built with intention.</span></footer>
      </div>
    </article>
  </dialog>
</template>

<style scoped>
.project-dialog { --case-line: rgb(27 29 25 / .17); width: calc(100% - 48px); max-width: 980px; max-height: 92dvh; margin: auto; padding: 0; border: 0; border-radius: 0; background: var(--paper, #efeee8); color: var(--ink, #1b1d19); overflow-y: auto; overscroll-behavior: contain; font-family: var(--font-body, sans-serif); box-shadow: 0 28px 120px rgb(0 0 0 / .3); }
.project-dialog::backdrop { background: rgb(15 20 15 / .7); backdrop-filter: blur(8px); }
.project-dialog[open] { animation: case-arrive .45s cubic-bezier(.2,.7,.2,1) both; }
.project-dialog[open]::backdrop { animation: backdrop-arrive .35s ease both; }
.case-study__toolbar { position: sticky; top: 0; z-index: 3; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 14px 42px; border-bottom: 1px solid var(--case-line); background: var(--paper, #efeee8); }
.case-study__kicker, .case-study__close, .case-study__category, .case-study__engagement, .case-study__label, .case-study__role > span, .case-study__tech, .case-study__footer { font-family: var(--font-mono, monospace); font-size: 10px; letter-spacing: .07em; line-height: 1.6; }
.case-study__kicker, .case-study__category, .case-study__label, .case-study__role > span { text-transform: uppercase; }
.case-study__kicker span { margin: 0 13px; opacity: .4; }
.case-study__close { display: flex; align-items: center; gap: 18px; min-height: 44px; padding: 0; border: 0; background: transparent; color: inherit; text-transform: uppercase; cursor: pointer; }
.case-study__close svg { display: block; width: 36px; height: 36px; padding: 7px; border: 1px solid var(--case-line); border-radius: 50%; transition: rotate .3s, background .3s; }
.case-study__close:hover svg { rotate: 90deg; background: var(--acid, #d4fa72); }
.case-study__close:focus-visible, .case-study__live:focus-visible { outline: 2px solid var(--ink, #1b1d19); outline-offset: 5px; }
.case-study__header { padding: 45px 54px 40px; }
.case-study__category { margin: 0 0 14px; color: var(--muted, #61675b); }
.case-study h2 { margin: 0 0 18px; font-family: var(--font-display, sans-serif); font-size: clamp(48px, 7vw, 94px); font-weight: 600; line-height: .98; letter-spacing: -.065em; }
.case-study h2 > span { color: #718a36; }
.case-study__engagement { display: flex; align-items: center; gap: 9px; color: var(--muted, #61675b); }
.case-study__dot { width: 6px; height: 6px; border-radius: 50%; background: #718a36; }
.case-study__art { margin: 0 54px; }
.case-study__art :deep(.project-artwork) { aspect-ratio: 2.35; }
.case-study__art :deep(.project-artwork__canvas) { height: 100%; }
.case-study__art :deep(.project-artwork__annotation), .case-study__art :deep(.project-artwork__footer) { display: none; }
.case-study__body { padding: 44px 54px 0; }
.case-study__section { display: grid; grid-template-columns: 155px minmax(0, 1fr); gap: 24px; padding: 30px 0; border-top: 1px solid var(--case-line); }
.case-study__label { margin: 3px 0 0; font-weight: 400; color: var(--muted, #61675b); }
.case-study__intro { margin: 0; font-size: 20px; line-height: 1.5; letter-spacing: -.025em; }
.case-study__role { margin-top: 28px; padding-left: 16px; border-left: 2px solid #879c59; }
.case-study__role > span { color: var(--muted, #61675b); font-size: 9px; }
.case-study__role p { margin: 4px 0 0; font-size: 13px; line-height: 1.6; }
.case-study__contribution { margin: 0 0 25px; font-size: 15px; line-height: 1.65; }
.case-study__highlights { list-style: none; margin: 0; padding: 0; }
.case-study__highlights li { display: flex; align-items: baseline; gap: 19px; padding: 15px 0; border-top: 1px solid var(--case-line); }
.case-study__highlights li:first-child { padding-top: 0; border-top: 0; }
.case-study__highlights li:last-child { padding-bottom: 0; }
.case-study__highlights li > span { font-family: var(--font-mono, monospace); font-size: 9px; color: var(--muted, #61675b); }
.case-study__highlights p { margin: 0; font-size: 14px; line-height: 1.7; }
.case-study__tech { display: flex; flex-wrap: wrap; align-content: start; gap: 8px; }
.case-study__tech > span { padding: 7px 11px; border: 1px solid var(--case-line); }
.case-study__section--evidence p { margin: 0; color: var(--muted, #61675b); font-size: 12px; line-height: 1.75; }
.case-study__live { display: flex; justify-content: space-between; align-items: center; width: fit-content; min-height: 52px; min-width: 240px; gap: 32px; margin: 8px 0 38px auto; padding: 13px 19px; border: 1px solid var(--ink, #1b1d19); color: var(--ink, #1b1d19); background: var(--acid, #d4fa72); font-size: 13px; text-decoration: none; transition: background .2s, color .2s; }
.case-study__live > span[aria-hidden] { font-size: 23px; line-height: 1; }
.case-study__live:hover { color: var(--paper, #efeee8); background: var(--ink, #1b1d19); }
.case-study__footer { display: flex; justify-content: space-between; gap: 20px; padding: 22px 0; border-top: 1px solid var(--case-line); font-size: 8px; color: var(--muted, #61675b); text-transform: uppercase; }
@keyframes case-arrive { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes backdrop-arrive { from { opacity: 0; } to { opacity: 1; } }
@media (max-width: 680px) { .project-dialog { width: calc(100% - 20px); max-height: 95dvh; } .case-study__toolbar { padding: 8px 20px; } .case-study__kicker, .case-study__close { font-size: 8px; } .case-study__kicker span { margin: 0 7px; } .case-study__close { gap: 10px; } .case-study__header { padding: 33px 24px 28px; } .case-study__category, .case-study__engagement { font-size: 8px; } .case-study__art { margin: 0 24px; } .case-study__art :deep(.project-artwork) { aspect-ratio: 1.6; } .case-study__body { padding: 28px 24px 0; } .case-study__section { grid-template-columns: 1fr; gap: 18px; padding: 25px 0; } .case-study__label { font-size: 9px; } .case-study__intro { font-size: 18px; } .case-study__contribution { font-size: 14px; } .case-study__role { margin-top: 23px; } .case-study__live { width: 100%; min-width: 0; } .case-study__footer { font-size: 7px; } }
@media (prefers-reduced-motion: reduce) { .project-dialog[open], .project-dialog[open]::backdrop { animation: none; } .case-study * { transition: none !important; } }
</style>
