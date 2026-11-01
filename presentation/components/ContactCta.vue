<script setup lang="ts">
import profile from '../../domain/data/profile.json'
</script>

<template>
  <section id="contact" aria-labelledby="contact-title" class="contact-section">
    <div class="contact-inner">
      <div class="contact-topline">
        <span class="contact-kicker"><span class="contact-mark" aria-hidden="true" />Let's connect</span>
        <span class="contact-coordinate" aria-hidden="true">Ideas → possibilities</span>
      </div>
      <div class="contact-main">
        <h2 id="contact-title">Have something<br /><span>in mind?</span></h2>
        <div class="contact-artwork" aria-hidden="true">
          <svg class="contact-asterisk" viewBox="0 0 240 240" fill="none">
            <path d="M120 18V222M18 120H222M48 48L192 192M48 192L192 48" stroke="currentColor" stroke-width="37" />
          </svg>
          <span class="artwork-origin" />
        </div>
      </div>
      <div class="contact-bottomline">
        <p>Explore the code.<br />Start a conversation.</p>
        <div class="contact-actions">
          <a class="contact-primary" :href="profile.github" target="_blank" rel="noopener noreferrer">
            <span>Find me on GitHub</span>
            <span class="contact-arrow" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none"><path d="M7 25L25 7M7 7H25V25" stroke="currentColor" stroke-width="1.5" /></svg>
            </span>
            <span class="contact-sr-only"> (opens in a new tab)</span>
          </a>
          <a class="contact-cv" href="/Kum_Brian_Ihimbru_CV.pdf" download>
            <span>Download my CV</span><span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  overflow: hidden;
  color: var(--ink);
  background: var(--acid);
  scroll-margin-top: 5rem;
}
.contact-inner {
  max-width: 1440px;
  margin-inline: auto;
  padding: clamp(2rem, 4.5vw, 4.5rem) 48px clamp(2.5rem, 5vw, 5rem);
}
.contact-topline,
.contact-bottomline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.contact-topline {
  padding-bottom: 1.3rem;
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 32%, transparent);
  font: 0.625rem/1.5 var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.contact-kicker { display: inline-flex; align-items: center; gap: 0.65rem; }
.contact-mark { width: 0.375rem; height: 0.375rem; background: currentColor; }
.contact-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(8rem, 0.27fr);
  align-items: center;
  gap: 2rem;
  padding-block: clamp(3rem, 6vw, 6rem);
}
.contact-main h2 {
  margin: 0;
  font: 600 clamp(3rem, 7.4vw, 7rem)/1.02 var(--font-display);
  letter-spacing: -0.065em;
}
.contact-main h2 > span { display: inline-block; margin-left: 9%; }
.contact-artwork {
  position: relative;
  width: 100%;
  max-width: 15rem;
  aspect-ratio: 1;
  justify-self: end;
}
.contact-asterisk {
  display: block;
  width: 100%;
  height: 100%;
  animation: contact-turn 48s linear infinite;
}
.artwork-origin {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  background: var(--acid);
  transform: translate(-50%, -50%);
}
.contact-bottomline { align-items: end; }
.contact-bottomline > p { margin: 0; font: 400 0.875rem/1.65 var(--font-body); }
.contact-actions {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3.5vw, 3.5rem);
}
.contact-primary,
.contact-cv {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  color: inherit;
  text-decoration: none;
}
.contact-primary {
  gap: 1.5rem;
  min-height: 3.5rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px solid var(--ink);
  font: 500 clamp(1rem, 1.8vw, 1.5rem)/1.3 var(--font-body);
  letter-spacing: -0.035em;
}
.contact-arrow { display: block; overflow: hidden; width: 2rem; height: 2rem; }
.contact-arrow svg {
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}
.contact-primary::after,
.contact-cv::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 2px;
  background: currentColor;
  content: '';
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}
.contact-cv {
  min-height: 2.75rem;
  gap: 1.25rem;
  font: 400 0.6875rem/1.5 var(--font-mono);
}
.contact-cv > span:last-child { font-size: 1.15rem; }
.contact-primary:focus-visible,
.contact-cv:focus-visible { outline: 2px solid var(--ink); outline-offset: 6px; }
.contact-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
@media (hover: hover) {
  .contact-primary:hover .contact-arrow svg { transform: translate(3px, -3px); }
  .contact-primary:hover::after,
  .contact-cv:hover::after { transform: scaleX(1); }
}
@media (max-width: 900px) {
  .contact-bottomline { align-items: start; }
  .contact-actions { flex-direction: column; align-items: start; gap: 0.75rem; }
}
@media (max-width: 600px) {
  .contact-inner { padding-inline: 22px; }
  .contact-topline { font-size: 0.5625rem; letter-spacing: 0.05em; }
  .contact-coordinate { text-align: right; }
  .contact-main { position: relative; display: block; padding-block: 3.25rem 5.5rem; }
  .contact-main h2 { font-size: clamp(2.625rem, 10.8vw, 4.25rem); }
  .contact-main h2 > span { margin-left: 6%; }
  .contact-artwork { position: absolute; right: 0; bottom: 1.7rem; width: 4.75rem; }
  .artwork-origin { width: 0.375rem; height: 0.375rem; }
  .contact-bottomline { flex-direction: column; gap: 1.75rem; }
  .contact-bottomline > p { font-size: 0.8125rem; }
  .contact-actions { width: 100%; }
  .contact-primary { width: 100%; font-size: 1.25rem; }
}
@keyframes contact-turn {
  to { transform: rotate(360deg); }
}
:global(html[data-motion='paused'] .contact-asterisk) { animation-play-state: paused; }
:global(html[data-motion='paused'] .contact-arrow svg),
:global(html[data-motion='paused'] .contact-primary::after),
:global(html[data-motion='paused'] .contact-cv::after) { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .contact-asterisk { animation: none; }
  .contact-arrow svg,
  .contact-primary::after,
  .contact-cv::after { transition: none; }
}
</style>
