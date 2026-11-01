<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import profile from '../../domain/data/profile.json'
import AbstractSculpture from './AbstractSculpture.vue'

const motionPaused = ref(true)
let motionPreference: MediaQueryList | undefined

function setMotion(paused: boolean) {
  motionPaused.value = paused
  document.documentElement.dataset.motion = paused ? 'paused' : 'running'
}
function syncMotionPreference(event: MediaQueryListEvent) { setMotion(event.matches) }
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  setMotion(motionPreference.matches)
  motionPreference.addEventListener('change', syncMotionPreference)
})
onBeforeUnmount(() => { motionPreference?.removeEventListener('change', syncMotionPreference) })
</script>

<template>
  <header id="home" class="editorial-hero">
    <div class="page-shell">
      <div class="editorial-hero__intro">
        <p class="editorial-hero__identity"><span class="editorial-hero__identity-mark" aria-hidden="true" />{{ profile.name }}</p>
        <p class="editorial-hero__location">Based in {{ profile.location }} <span aria-hidden="true">↗</span></p>
      </div>
      <div class="editorial-hero__grid">
        <div class="editorial-hero__copy">
          <p class="editorial-hero__role">{{ profile.title }}</p>
          <h1>Good ideas.<br><span>Built to work.</span></h1>
          <p class="editorial-hero__description">{{ profile.intro }}</p>
          <div class="editorial-hero__actions">
            <a class="editorial-hero__primary" href="#work">View selected work<span class="editorial-hero__button-icon" aria-hidden="true">↗</span></a>
            <a class="editorial-hero__download" href="/Kum_Brian_Ihimbru_CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
          </div>
          <p class="editorial-hero__note"><span aria-hidden="true">↳</span> From the first interaction to the system behind it.</p>
        </div>
        <figure class="editorial-hero__artwork">
          <div class="editorial-hero__artwork-top" aria-hidden="true"><span>Ideas, connected.</span><span>Fig. 001</span></div>
          <AbstractSculpture :motion-paused="motionPaused" />
          <figcaption class="editorial-hero__artwork-caption">
            <span class="editorial-hero__artwork-label"><span aria-hidden="true">✳</span> A study in connection</span>
            <button class="editorial-hero__motion" type="button" :aria-pressed="motionPaused" :aria-label="motionPaused ? 'Resume decorative motion' : 'Pause decorative motion'" @click="setMotion(!motionPaused)">
              <svg v-if="motionPaused" viewBox="0 0 12 12" aria-hidden="true"><path d="m4 2 6 4-6 4Z" fill="currentColor" /></svg>
              <svg v-else viewBox="0 0 12 12" aria-hidden="true"><path d="M3 2h2v8H3zm4 0h2v8H7z" fill="currentColor" /></svg>
              {{ motionPaused ? 'Play motion' : 'Pause motion' }}
            </button>
          </figcaption>
        </figure>
      </div>
      <div class="editorial-hero__footer">
        <p>Thoughtful interfaces. <span>Dependable systems.</span></p>
        <div class="editorial-hero__disciplines" aria-label="Development disciplines"><span>Mobile</span><span>Web</span><span>Backend</span></div>
        <a href="#work" class="editorial-hero__scroll" aria-label="Explore selected work below"><span aria-hidden="true">↓</span></a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.editorial-hero { color: var(--ink, #1b1d19); background: var(--paper, #efeee8); overflow: hidden; }
.editorial-hero__intro { display: flex; align-items: center; justify-content: space-between; padding-top: 36px; gap: 24px; }
.editorial-hero__identity, .editorial-hero__location, .editorial-hero__role, .editorial-hero__artwork-top, .editorial-hero__artwork-caption, .editorial-hero__disciplines, .editorial-hero__note { font-family: var(--font-mono, monospace); font-size: 11px; line-height: 1.5; }
.editorial-hero__identity { display: flex; align-items: center; gap: 10px; text-transform: uppercase; letter-spacing: .075em; }
.editorial-hero__identity-mark { width: 7px; height: 7px; background: var(--ink, #1b1d19); display: inline-block; border-radius: 50%; }
.editorial-hero__location { color: var(--muted, #66695f); }
.editorial-hero__location span { margin-left: 24px; color: var(--ink, #1b1d19); }
.editorial-hero__grid { display: grid; grid-template-columns: 1.06fr 1fr; gap: 22px; align-items: center; padding: 54px 0 64px; }
.editorial-hero__copy { position: relative; z-index: 1; padding-bottom: 4px; }
.editorial-hero__role { color: var(--muted, #66695f); text-transform: uppercase; letter-spacing: .07em; margin: 0 0 30px; }
.editorial-hero h1 { font-family: var(--font-display, sans-serif); font-size: clamp(64px, 7.2vw, 112px); font-weight: 600; line-height: .99; letter-spacing: -.07em; margin: 0 0 32px; }
.editorial-hero h1 span { white-space: nowrap; }
.editorial-hero__description { max-width: 440px; font-family: var(--font-body, sans-serif); font-size: clamp(15px, 1.2vw, 17px); line-height: 1.7; color: var(--muted, #66695f); margin: 0; }
.editorial-hero__actions { display: flex; align-items: center; flex-wrap: wrap; gap: 18px 26px; margin-top: 32px; font-family: var(--font-body, sans-serif); font-size: 13px; font-weight: 500; }
.editorial-hero__primary { display: inline-flex; align-items: center; gap: 25px; min-height: 54px; background: var(--ink, #1b1d19); color: var(--paper, #efeee8); border-radius: 30px; padding: 7px 8px 7px 23px; text-decoration: none; transition: background .2s, transform .2s; }
.editorial-hero__button-icon { width: 38px; height: 38px; border-radius: 50%; background: var(--acid, #d4fa72); color: var(--ink, #1b1d19); display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 400; transition: transform .25s; }
.editorial-hero__primary:hover .editorial-hero__button-icon { transform: rotate(45deg); }
.editorial-hero__primary:hover { background: #35392f; }
.editorial-hero__download { text-decoration: none; display: inline-flex; gap: 16px; align-items: center; min-height: 44px; border-bottom: 1px solid var(--line, #d3d5c9); color: var(--ink, #1b1d19); }
.editorial-hero__download span { font-size: 20px; }
.editorial-hero__download:hover { border-bottom-color: var(--ink, #1b1d19); }
.editorial-hero__note { margin-top: 26px; color: var(--muted, #66695f); font-size: 10px; letter-spacing: -.015em; }
.editorial-hero__note span { margin-right: 6px; }
.editorial-hero__artwork { margin: 0; align-self: center; min-width: 0; }
.editorial-hero__artwork-top { display: flex; align-items: center; justify-content: space-between; padding: 0 12px 12px; color: var(--muted, #66695f); text-transform: uppercase; letter-spacing: .08em; font-size: 9px; }
.editorial-hero__artwork-caption { border-top: 1px solid var(--line, #d3d5c9); padding-top: 9px; display: flex; justify-content: space-between; align-items: center; gap: 12px; color: var(--muted, #66695f); font-size: 9px; }
.editorial-hero__artwork-label { display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: .05em; }
.editorial-hero__artwork-label > span { font-family: serif; color: var(--ink, #1b1d19); font-size: 23px; }
.editorial-hero__motion { appearance: none; background: none; border: 0; font: inherit; color: var(--ink, #1b1d19); display: inline-flex; align-items: center; gap: 7px; padding: 10px 0 10px 8px; cursor: pointer; min-height: 44px; white-space: nowrap; }
.editorial-hero__motion svg { width: 12px; height: 12px; }
.editorial-hero__footer { display: flex; align-items: center; gap: 24px; min-height: 88px; border-top: 1px solid var(--line, #d3d5c9); }
.editorial-hero__footer > p { font-family: var(--font-body, sans-serif); font-size: 12px; margin-right: auto; }
.editorial-hero__footer > p > span { color: var(--muted, #66695f); margin-left: 4px; }
.editorial-hero__disciplines { display: flex; align-items: center; gap: 24px; text-transform: uppercase; font-size: 10px; letter-spacing: .07em; }
.editorial-hero__disciplines span + span::before { content: '/'; margin-right: 24px; color: #a3a69a; }
.editorial-hero__scroll { display: flex; align-items: center; justify-content: center; border: 1px solid var(--line, #d3d5c9); border-radius: 50%; width: 42px; height: 42px; font-size: 22px; text-decoration: none; color: var(--ink, #1b1d19); margin-left: 20px; transition: background .2s; }
.editorial-hero__scroll:hover { background: var(--acid, #d4fa72); }
.editorial-hero a:focus-visible, .editorial-hero button:focus-visible { outline: 2px solid var(--ink, #1b1d19); outline-offset: 5px; }
@media (min-width: 1440px) { .editorial-hero__grid { gap: 48px; padding-top: 66px; padding-bottom: 78px; } }
@media (max-width: 1100px) { .editorial-hero__grid { gap: 8px; } .editorial-hero h1 { font-size: clamp(58px, 7.3vw, 80px); } .editorial-hero__note { max-width: 290px; } .editorial-hero__description { max-width: 365px; } .editorial-hero__footer > p > span { display: block; margin-left: 0; margin-top: 4px; } }
@media (max-width: 760px) { .editorial-hero__intro { padding-top: 25px; } .editorial-hero__identity, .editorial-hero__location { font-size: 9px; } .editorial-hero__location span { margin-left: 7px; } .editorial-hero__grid { grid-template-columns: 1fr; padding-top: 50px; padding-bottom: 28px; gap: 38px; } .editorial-hero__role { font-size: 10px; margin-bottom: 24px; } .editorial-hero h1 { font-size: clamp(56px, 12.4vw, 88px); margin-bottom: 27px; } .editorial-hero__description { font-size: 15px; max-width: 430px; } .editorial-hero__note { max-width: none; } .editorial-hero__artwork { width: 100%; max-width: 540px; justify-self: center; } .editorial-hero__artwork-top { padding-left: 0; padding-right: 0; } .editorial-hero__footer { flex-wrap: wrap; padding: 22px 0; gap: 18px; } .editorial-hero__footer > p { flex: 1; font-size: 11px; } .editorial-hero__disciplines { order: 3; width: 100%; gap: 16px; font-size: 9px; } .editorial-hero__disciplines span + span::before { margin-right: 16px; } .editorial-hero__scroll { margin-left: 0; } }
@media (max-width: 360px) { .editorial-hero h1 { font-size: 50px; } .editorial-hero__location { max-width: 77px; text-align: right; } .editorial-hero__actions { gap: 12px; } .editorial-hero__primary { gap: 14px; padding-left: 18px; font-size: 12px; } .editorial-hero__download { font-size: 12px; gap: 10px; } }
@media (prefers-reduced-motion: reduce) { .editorial-hero *, .editorial-hero *::before { transition: none !important; } }
:global(html[data-motion='paused'] .editorial-hero *) { transition: none !important; }
</style>
