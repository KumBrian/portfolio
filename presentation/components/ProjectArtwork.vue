<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ title: string; index?: number }>(), { index: 0 })
const types: Record<string, string> = { 'CCA Pay': 'portal', Fluxoon: 'modules', 'Easy Trade': 'trajectory', Siren: 'waves', Henddu: 'atmosphere', RuralNexus: 'terrain', 'MUMA Solution': 'prism' }
const type = computed(() => types[props.title] || 'experiment')
const palettes: Record<string, string> = { portal: '#d4ed9e', modules: '#c8c4d9', trajectory: '#d9ac91', waves: '#abc4cf', atmosphere: '#e2dbc8', terrain: '#b8c6aa', prism: '#c5c2d4', experiment: '#c7c9bf' }
const concepts: Record<string, string> = { portal: 'Value in motion', modules: 'Order from complexity', trajectory: 'A clearer trajectory', waves: 'Connecting currents', atmosphere: 'An invisible landscape', terrain: 'Rooted in possibility', prism: 'A different perspective', experiment: 'Ideas into interfaces' }
const wavePaths = computed(() => Array.from({ length: 23 }, (_, i) => {
  const y = 154 + i * 11
  return `M-80 ${y + 70} C100 ${y - 200} 188 ${y + 200} 380 ${y} S620 ${y - 100} 880 ${y + 90}`
}))
const contourPaths = computed(() => Array.from({ length: 18 }, (_, i) => {
  const size = 95 + i * 14
  return `M${400 - size} 300 C${400 - size - 80} ${290 - size} ${400 - size / 2} ${280 - size - 60} 420 ${290 - size} C${400 + size} ${290 - size - 40} ${400 + size + 75} ${290 - size / 4} ${400 + size} 320 C${400 + size + 30} ${300 + size} ${410 - size / 2} ${310 + size + 45} ${400 - size} 300Z`
}))
</script>

<template>
  <div class="project-artwork" :class="`project-artwork--${type}`" :style="{ background: palettes[type] }" aria-hidden="true">
    <div class="project-artwork__annotation"><span>{{ concepts[type] }}</span><span>KB / {{ String(index + 1).padStart(2, '0') }}</span></div>
    <svg viewBox="0 0 800 590" class="project-artwork__canvas" fill="none" preserveAspectRatio="xMidYMid slice" focusable="false">
      <g class="art-registration" stroke="currentColor" stroke-width="1" opacity=".25"><path d="M380 295h40m-20-20v40M35 295h15m-7.5-7.5v15M750 295h15m-7.5-7.5v15" /></g>

      <template v-if="type === 'portal'">
        <g class="art-orbit" transform="rotate(-28 400 295)">
          <ellipse v-for="n in 25" :key="n" cx="400" cy="295" :rx="70 + n * 7.8" :ry="83 + n * 5.1" stroke="#223025" :stroke-width="n > 18 ? '1.8' : '1.3'" :opacity=".25 + n * .028" />
          <ellipse cx="400" cy="295" rx="71" ry="84" fill="#253528" />
          <ellipse cx="410" cy="285" rx="41" ry="64" fill="#d4ed9e" />
        </g>
        <circle cx="583" cy="158" r="16" fill="#253528" /><circle cx="212" cy="404" r="6" fill="#253528" />
        <path d="M174 466h100m-50-5v10M526 124h100m-50-5v10" stroke="#253528" stroke-width="1" />
      </template>

      <template v-else-if="type === 'modules'">
        <g class="art-modules">
          <path d="m400 116 197 114v228L400 344 203 458V230Z" fill="#26232d" />
          <path d="m400 116 197 114-197 114-197-114Z" fill="#eeece7" />
          <path d="m400 344 197-114v228L400 572Z" fill="#9188a5" transform="translate(0 -114)" />
          <path d="m400 230-197 114V230l197-114Z" fill="#5d576a" />
          <path d="m400 182 83 48-83 48-83-48Z" fill="#b9b3ca" />
          <path d="m317 230 83 48v96l-83-48Z" fill="#27242f" /><path d="m400 278 83-48v96l-83 48Z" fill="#a49ab7" />
          <path d="m400 344 98 57-98 57-98-57Z" fill="#eceae5" /><path d="m302 401 98 57v55l-98-56Z" fill="#27242f" /><path d="m400 458 98-57v56l-98 56Z" fill="#8f85a2" />
        </g>
        <path d="m147 264 253-146 253 146M147 376l253 146 253-146" stroke="#26232d" stroke-dasharray="3 7" opacity=".3" />
      </template>

      <template v-else-if="type === 'trajectory'">
        <g stroke="#43291e" stroke-width="1" opacity=".17"><path v-for="n in 9" :key="n" :d="`M${100 + n * 60} 100V490M100 ${105 + n * 40}H700`" /></g>
        <g class="art-traces" stroke="#39251d" fill="none">
          <path v-for="n in 17" :key="n" :d="`M${64 + n * 6} ${490 - n * 5} C${220 + n * 3} ${490 - n * 6} ${180 + n * 6} ${164 + n * 8} ${348 + n * 6} ${164 + n * 8} S${543 + n * 4} ${398 - n * 6} ${650 + n * 5} ${88 + n * 5}`" :stroke-width="n === 9 ? 3 : 1.2" :opacity=".32 + n * .035" />
        </g>
        <circle cx="462" cy="279" r="31" fill="#f1e5d3" /><circle cx="462" cy="279" r="6" fill="#39251d" />
        <path d="m678 102 26 5-11 24" stroke="#39251d" stroke-width="2" /><path d="M462 235v-35m0 123v35m-44-79h-35m123 0h35" stroke="#39251d" opacity=".5" />
      </template>

      <template v-else-if="type === 'waves'">
        <circle cx="400" cy="292" r="176" fill="#dbe6e6" />
        <g class="art-waves" stroke="#243f4d" stroke-width="1.4"><path v-for="(path, i) in wavePaths" :key="i" :d="path" :opacity=".35 + i * .026" /></g>
        <circle cx="400" cy="292" r="213" stroke="#243f4d" stroke-width=".7" stroke-dasharray="2 8" opacity=".5" />
        <circle cx="400" cy="79" r="5" fill="#243f4d" /><circle cx="400" cy="505" r="5" fill="#243f4d" />
      </template>

      <template v-else-if="type === 'atmosphere'">
        <g class="art-atmosphere" stroke="#5a6550" stroke-width="1.2"><ellipse v-for="n in 23" :key="n" :cx="400 + Math.sin(n * .24) * 34" :cy="290 + Math.cos(n * .2) * 20" :rx="35 + n * 9.7" :ry="21 + n * 7.5" :opacity=".2 + n * .028" :transform="`rotate(${-25 + n * 2.7} 400 290)`" /></g>
        <circle cx="400" cy="295" r="40" fill="#7a8867" /><circle cx="400" cy="295" r="24" fill="#bac6a1" />
        <path d="M400 90v90m0 230v90M140 295h90m340 0h90" stroke="#5a6550" opacity=".35" />
        <circle cx="618" cy="244" r="6" fill="#5a6550" />
      </template>

      <template v-else-if="type === 'terrain'">
        <g class="art-terrain" stroke="#354835" stroke-width="1.1"><path v-for="(path, i) in contourPaths" :key="i" :d="path" :opacity=".3 + i * .035" /></g>
        <path d="M270 408 353 330l78 31 115-138" stroke="#f0efdf" stroke-width="3" stroke-dasharray="5 8" />
        <circle cx="270" cy="408" r="9" fill="#354835" /><circle cx="546" cy="223" r="9" fill="#f0efdf" /><circle cx="546" cy="223" r="20" stroke="#f0efdf" />
        <path d="M112 450v30h30M658 110h30v30" stroke="#354835" stroke-width="1" />
      </template>

      <template v-else-if="type === 'prism'">
        <g class="art-prism">
          <path d="m400 111 204 354H196Z" fill="#36323f" />
          <path d="m400 111 22 354H196Z" fill="#ece9e4" />
          <path d="m400 111 204 354H422Z" fill="#837a98" />
          <path v-for="n in 13" :key="n" :d="`M${400 - n * 14.5} ${111 + n * 25.3} ${400 + n * 1.57} ${111 + n * 25.3} ${400 + n * 14.5} ${111 + n * 25.3}`" stroke="#36323f" stroke-width="1" opacity=".5" />
          <path v-for="n in 9" :key="`edge-${n}`" :d="`M400 111 ${196 + n * 40.8} 465`" stroke="#36323f" stroke-width=".8" opacity=".4" />
        </g>
        <path d="M97 335h126m354 0h126" stroke="#36323f" opacity=".5" /><circle cx="97" cy="335" r="4" fill="#36323f" /><circle cx="703" cy="335" r="4" fill="#36323f" />
        <path d="m245 503 155 30 155-30" stroke="#36323f" stroke-dasharray="3 5" opacity=".4" />
      </template>

      <template v-else>
        <g class="art-orbit" :transform="`rotate(${index * 13} 400 295)`"><ellipse v-for="n in 21" :key="n" cx="400" cy="295" :rx="55 + n * 8" :ry="180" :transform="`rotate(${n * 5} 400 295)`" stroke="#333c31" stroke-width="1" :opacity=".25 + n * .03" /></g>
        <circle cx="400" cy="295" r="28" fill="#333c31" />
      </template>
    </svg>
    <div class="project-artwork__footer"><span>Form / {{ type === 'experiment' ? 'Studies' : 'Systems' }}</span><span class="project-artwork__cross">+</span><span>Digital objects, human purpose.</span></div>
  </div>
</template>

<style scoped>
.project-artwork { position: relative; aspect-ratio: 1.36; color: #283126; overflow: hidden; }
.project-artwork__canvas { display: block; width: 100%; height: 100%; }
.project-artwork__annotation, .project-artwork__footer { position: absolute; z-index: 1; display: flex; justify-content: space-between; gap: 20px; left: 26px; right: 26px; font-family: var(--font-mono, monospace); font-size: 8px; line-height: 1.5; text-transform: uppercase; letter-spacing: .09em; }
.project-artwork__annotation { top: 26px; padding-right: 66px; }
.project-artwork__annotation > :last-child { display: none; }
.project-artwork__footer { bottom: 23px; align-items: center; }
.project-artwork__footer > :last-child { text-align: right; }
.project-artwork__cross { font-size: 17px; line-height: .7; margin-left: auto; }
.art-orbit, .art-atmosphere, .art-terrain, .art-modules, .art-prism, .art-traces, .art-waves { transform-origin: center; transform-box: fill-box; animation-play-state: var(--art-play-state, paused) !important; }
.art-orbit { animation: orbit-drift 22s linear infinite; }
.art-atmosphere { animation: atmosphere-drift 18s ease-in-out infinite alternate; }
.art-terrain { animation: terrain-drift 12s ease-in-out infinite alternate; }
.art-modules, .art-prism { animation: object-drift 7s ease-in-out infinite alternate; }
.art-traces { animation: trace-drift 9s ease-in-out infinite alternate; }
.art-waves { animation: wave-drift 8s ease-in-out infinite alternate; }
@keyframes orbit-drift { from { rotate: 0deg; } to { rotate: 360deg; } }
@keyframes atmosphere-drift { to { rotate: 20deg; scale: 1.06; } }
@keyframes terrain-drift { to { rotate: -10deg; scale: 1.04; } }
@keyframes object-drift { to { translate: 0 -12px; } }
@keyframes trace-drift { to { translate: 10px -10px; } }
@keyframes wave-drift { to { translate: 20px 12px; } }
@media (max-width: 600px) { .project-artwork__annotation, .project-artwork__footer { left: 18px; right: 18px; font-size: 6.5px; } .project-artwork__annotation { top: 20px; } .project-artwork__footer { bottom: 18px; gap: 10px; } }
@media (prefers-reduced-motion: reduce) { .project-artwork * { animation: none !important; } }
</style>
