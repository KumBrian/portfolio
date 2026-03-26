<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// --- Spotlight ---
const mouseX = ref(50)
const mouseY = ref(50)
const headerRef = ref<HTMLElement | null>(null)

// --- Trail ---
interface TrailPoint {
  x: number
  y: number
  id: number
  isBrace: boolean
  opacity: number
}

const trail = ref<TrailPoint[]>([])
let trailCounter = 0
const MAX_TRAIL = 36
// Each point is randomly a brace OR a glow — decided at creation
const BRACE_CHANCE = 0.4

let animFrame: number
let lastX = 0
let lastY = 0

function onMouseMove(e: MouseEvent) {
  const el = headerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // Spotlight (percentage)
  mouseX.value = (x / rect.width) * 100
  mouseY.value = (y / rect.height) * 100

  // Only add trail point if cursor moved enough (hysteresis)
  const dx = x - lastX
  const dy = y - lastY
  if (Math.sqrt(dx * dx + dy * dy) < 6) return
  lastX = x
  lastY = y

  trail.value.push({
    x,
    y,
    id: trailCounter++,
    isBrace: Math.random() < BRACE_CHANCE,
    opacity: 1,
  })

  if (trail.value.length > MAX_TRAIL) {
    trail.value.shift()
  }
}

function onMouseLeave() {
  mouseX.value = 50
  mouseY.value = 50
}

// Slow fade — ~0.018/frame ≈ ~3s lifetime at 60fps
function tickFade() {
  trail.value = trail.value
    .map(p => ({ ...p, opacity: p.opacity - 0.018 }))
    .filter(p => p.opacity > 0)
  animFrame = requestAnimationFrame(tickFade)
}

onMounted(() => { animFrame = requestAnimationFrame(tickFade) })
onUnmounted(() => cancelAnimationFrame(animFrame))

const letters = 'Kum Brian Ihimbru'.split('')
</script>

<template>
  <header
    ref="headerRef"
    class="relative overflow-hidden bg-[#050810] border-b border-white/5"
    style="min-height: 340px;"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <!-- Spotlight — smaller, sharper -->
    <div
      class="absolute inset-0 pointer-events-none transition-[background] duration-75"
      :style="{
        background: `radial-gradient(280px circle at ${mouseX}% ${mouseY}%, rgba(6,182,212,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)`
      }"
    />

    <!-- Trail points -->
    <template v-for="(pt, i) in trail" :key="pt.id">
      <!-- {} brace — random color from booster palette -->
      <span
        v-if="pt.isBrace"
        class="absolute pointer-events-none select-none font-mono font-black leading-none"
        :style="{
          left: `${pt.x}px`,
          top: `${pt.y}px`,
          opacity: pt.opacity * 0.85,
          fontSize: `${8 + (i / trail.length) * 10}px`,
          transform: 'translate(-50%, -50%)',
          color: i / trail.length > 0.6 ? '#fff' : i / trail.length > 0.3 ? '#06b6d4' : '#a78bfa',
          textShadow: `0 0 ${6 + (i / trail.length) * 10}px ${
            i / trail.length > 0.6 ? 'rgba(255,255,255,0.9)' : i / trail.length > 0.3 ? 'rgba(6,182,212,0.9)' : 'rgba(167,139,250,0.9)'
          }`,
        }"
      >{}</span>

      <!-- Booster glow dot — white-hot core → cyan ring → violet tail -->
      <div
        v-else
        class="absolute rounded-full pointer-events-none"
        :style="{
          left: `${pt.x}px`,
          top: `${pt.y}px`,
          width: `${5 + (i / trail.length) * 12}px`,
          height: `${5 + (i / trail.length) * 12}px`,
          opacity: pt.opacity,
          background: i / trail.length > 0.65
            ? `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(6,182,212,0.8) 35%, rgba(139,92,246,0.3) 70%, transparent 100%)`
            : i / trail.length > 0.3
            ? `radial-gradient(circle, rgba(6,182,212,0.9) 0%, rgba(139,92,246,0.5) 50%, transparent 100%)`
            : `radial-gradient(circle, rgba(139,92,246,0.7) 0%, rgba(59,7,100,0.2) 70%, transparent 100%)`,
          transform: 'translate(-50%, -50%)',
          filter: `blur(${1 + (1 - i / trail.length) * 2}px)`,
        }"
      />
    </template>

    <!-- Static ambient glows -->
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
    <div class="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none" />

    <!-- Dot grid -->
    <div class="absolute inset-0 pointer-events-none dot-grid opacity-40" />

    <div class="relative max-w-5xl mx-auto px-6 py-16">
      <!-- Status chip -->
      <div class="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/8 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-8">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Available for work
      </div>

      <!-- Animated name -->
      <h1 class="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4 leading-none">
        <span
          v-for="(char, i) in letters"
          :key="i"
          class="letter-hover inline-block transition-all duration-300"
          :style="{ animationDelay: `${i * 40}ms` }"
        >{{ char === ' ' ? '\u00a0' : char }}</span>
      </h1>

      <!-- Role tags -->
      <div class="flex flex-wrap gap-4 mb-6">
        <span
          v-for="tag in ['Full Stack Developer', '3 Years Exp.', 'BSc. Comp. Sci. · UBa']"
          :key="tag"
          class="text-sm text-slate-400 font-mono"
        >
          <span class="text-cyan-500">//</span> {{ tag }}
        </span>
      </div>

      <!-- Bio -->
      <p class="text-slate-400 text-base max-w-xl leading-relaxed mb-8">
        I design and build mobile apps, web platforms, and backend systems — clean architecture, shipped fast.
      </p>

      <!-- Tech badges -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="badge in ['Flutter', 'React Native', 'Nuxt 3', 'Spring Boot', 'Go', 'Figma', 'Rive', 'Photoshop']"
          :key="badge"
          class="text-xs font-mono px-3 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-200 cursor-default"
        >
          {{ badge }}
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.dot-grid {
  background-image: radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px);
  background-size: 28px 28px;
}

@keyframes letter-drop {
  0%   { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.letter-hover {
  animation: letter-drop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.letter-hover:hover {
  color: #67e8f9;
  transform: translateY(-4px) scale(1.1);
}
</style>
