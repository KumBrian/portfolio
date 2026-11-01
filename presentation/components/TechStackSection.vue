<script setup lang="ts">
import profile from '../../domain/data/profile.json'
</script>

<template>
  <div class="capabilities">
    <div class="capabilities-key" aria-hidden="true">
      <span>Discipline</span>
      <span>Working toolkit</span>
      <span>Put into practice</span>
    </div>
    <ol class="capability-list" aria-label="Technical capabilities and project experience">
      <li v-for="(skill, index) in profile.skills" :key="skill.category" class="capability-row">
        <div class="capability-discipline">
          <span class="capability-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ skill.category }}</h3>
        </div>
        <p class="capability-tools">{{ skill.tools }}</p>
        <p class="capability-evidence"><span class="evidence-caption">In practice</span>{{ skill.evidence }}</p>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.capabilities {
  --capability-columns: minmax(0, 1fr) minmax(0, 1.05fr) minmax(0, 1fr);
  color: var(--ink);
}
.capabilities-key,
.capability-row {
  display: grid;
  grid-template-columns: var(--capability-columns);
  column-gap: 2rem;
}
.capabilities-key {
  padding: 0 0 1.1rem;
  color: var(--muted);
  font: 0.625rem/1.5 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.capability-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--ink);
}
.capability-row {
  position: relative;
  align-items: center;
  padding: 1.7rem 0;
  border-bottom: 1px solid var(--line);
}
.capability-row::before {
  position: absolute;
  z-index: 0;
  inset: 0 -1rem;
  background: var(--acid);
  content: '';
  opacity: 0;
  transform: scaleY(0.8);
  transition: opacity 260ms ease, transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}
.capability-row > * { position: relative; }
.capability-discipline {
  display: flex;
  align-items: baseline;
  gap: clamp(0.75rem, 1.7vw, 1.75rem);
}
.capability-number {
  color: var(--muted);
  font: 0.625rem/1 var(--font-mono);
}
.capability-discipline h3 {
  margin: 0;
  font: 600 clamp(1.15rem, 2.25vw, 1.9rem)/1.2 var(--font-display);
  letter-spacing: -0.045em;
}
.capability-tools {
  margin: 0;
  max-width: 25rem;
  font: 400 0.9375rem/1.65 var(--font-body);
}
.capability-evidence {
  margin: 0;
  max-width: 22rem;
  color: var(--muted);
  font: 400 0.75rem/1.7 var(--font-body);
}
.evidence-caption { display: none; }
@media (hover: hover) {
  .capability-row:hover::before {
    opacity: 0.42;
    transform: scaleY(1);
  }
}
@media (max-width: 760px) {
  .capabilities { --capability-columns: minmax(0, 0.85fr) minmax(0, 1.2fr); }
  .capabilities-key > :last-child { display: none; }
  .capability-row { row-gap: 0.65rem; padding-block: 1.5rem; }
  .capability-evidence { grid-column: 2; }
  .capability-discipline { align-self: start; padding-top: 0.15rem; }
  .capability-discipline h3 { font-size: 1.35rem; }
  .capability-tools { font-size: 0.875rem; }
}
@media (max-width: 480px) {
  .capabilities-key { display: none; }
  .capability-row { grid-template-columns: 1fr; row-gap: 0.7rem; }
  .capability-discipline { gap: 1rem; margin-bottom: 0.15rem; }
  .capability-discipline h3 { font-size: 1.625rem; }
  .capability-tools,
  .capability-evidence { padding-left: 1.8rem; }
  .capability-evidence { grid-column: 1; }
  .evidence-caption {
    display: inline;
    margin-right: 0.65rem;
    font: 0.5625rem/1.5 var(--font-mono);
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }
}
:global(html[data-motion='paused'] .capability-row::before) { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .capability-row::before { transition: none; }
}
</style>
