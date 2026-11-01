<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../../domain/entities/portfolio'
import ProjectArtwork from './ProjectArtwork.vue'

const props = defineProps<{ project: Project; index: number }>()
const emit = defineEmits<{ (e: 'click'): void }>()
const engagement = computed(() => props.project.engagement === 'Professional'
  ? `${props.project.organization || 'DHI'} / Team project`
  : props.project.engagement === 'Independent client' ? 'Independent / Client project' : 'Independent / Exploration')
</script>

<template>
  <button type="button" aria-haspopup="dialog" :aria-label="`View ${project.title} case study`" class="project-card" @click="emit('click')">
    <div class="project-card__cover">
      <ProjectArtwork :title="project.title" :index="index" />
      <span class="project-card__open" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5" /></svg></span>
      <span class="project-card__cover-cta" aria-hidden="true">Explore project <span>↗</span></span>
    </div>
    <div class="project-card__caption">
      <div class="project-card__meta"><span>{{ engagement }}</span><span>{{ String(index + 1).padStart(2, '0') }}</span></div>
      <div class="project-card__heading"><h3>{{ project.title }}</h3><span aria-hidden="true">↗</span></div>
      <p class="project-card__category">{{ project.category }}</p>
      <p class="project-card__description">{{ project.description }}</p>
      <div class="project-card__tech"><span v-for="tool in project.tech.slice(0, 3)" :key="tool">{{ tool }}</span><span v-if="project.tech.length > 3">+{{ project.tech.length - 3 }}</span></div>
    </div>
  </button>
</template>

<style scoped>
.project-card { --art-play-state: paused; display: flex; flex-direction: column; width: 100%; min-width: 0; padding: 0; border: 0; background: transparent; color: var(--paper, #efeee8); text-align: left; cursor: pointer; }
.project-card__cover { position: relative; width: 100%; overflow: hidden; isolation: isolate; }
.project-card__open { display: grid; position: absolute; right: 22px; top: 22px; width: 46px; height: 46px; place-items: center; border: 1px solid rgb(27 29 25 / .3); border-radius: 50%; color: var(--ink, #1b1d19); transition: background .3s, color .3s, transform .5s cubic-bezier(.2,.8,.2,1); }
.project-card__open svg { width: 19px; height: 19px; }
.project-card__cover-cta { position: absolute; inset: auto 20px 20px auto; display: flex; gap: 24px; align-items: center; padding: 13px 18px; font-family: var(--font-mono, monospace); font-size: 10px; text-transform: uppercase; letter-spacing: .08em; background: var(--ink, #1b1d19); color: var(--paper, #efeee8); opacity: 0; transform: translateY(10px); transition: opacity .25s, transform .4s; }
.project-card__cover-cta span { font-size: 20px; line-height: 1; }
.project-card__caption { padding: 22px 0 11px; width: 100%; }
.project-card__meta { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 12px; font-family: var(--font-mono, monospace); font-size: 9px; letter-spacing: .1em; line-height: 1.6; text-transform: uppercase; color: var(--night-muted, #a6ada0); }
.project-card__heading { display: flex; gap: 20px; align-items: center; justify-content: space-between; }
.project-card h3 { margin: 0; font-family: var(--font-display, sans-serif); font-size: clamp(27px, 2.6vw, 38px); font-weight: 600; line-height: 1.2; letter-spacing: -.055em; }
.project-card__heading > span { font-size: 28px; font-weight: 300; transition: transform .3s, color .3s; }
.project-card__category { margin: 7px 0 11px; font-family: var(--font-body, sans-serif); font-size: 13px; line-height: 1.5; color: var(--night-muted, #a6ada0); }
.project-card__description { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; max-width: 40em; min-height: 3.2em; margin: 0 0 19px; font-family: var(--font-body, sans-serif); font-size: 13px; line-height: 1.6; color: #c1c6ba; }
.project-card__tech { display: flex; flex-wrap: wrap; gap: 7px; font-family: var(--font-mono, monospace); font-size: 9px; line-height: 1.4; color: #c1c6ba; }
.project-card__tech span { padding: 6px 9px; border: 1px solid rgb(239 238 232 / .18); }
.project-card:focus-visible { outline: 2px solid var(--acid, #d4fa72); outline-offset: 8px; }
.project-card:is(:hover, :focus-visible) { --art-play-state: running; }
.project-card:is(:hover, :focus-visible) .project-card__open { background: var(--ink, #1b1d19); color: var(--paper, #efeee8); transform: rotate(45deg); }
.project-card:is(:hover, :focus-visible) .project-card__cover-cta { transform: translateY(0); opacity: 1; }
.project-card:is(:hover, :focus-visible) .project-card__heading > span { transform: translate(3px, -3px); color: var(--acid, #d4fa72); }
@media (max-width: 600px) { .project-card__open { width: 40px; height: 40px; right: 16px; top: 16px; } .project-card__caption { padding-top: 18px; } .project-card__meta { font-size: 8px; } .project-card__cover-cta { display: none; } }
@media (prefers-reduced-motion: reduce) { .project-card *, .project-card *::before { transition: none !important; } }
</style>
