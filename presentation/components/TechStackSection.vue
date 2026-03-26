<script setup lang="ts">
import type { TechStack } from '../../domain/entities/portfolio'

defineProps<{ techStack: TechStack }>()

const categoryMeta: Record<string, { icon: string; color: string }> = {
  Mobile:   { icon: '📱', color: '#06b6d4' },
  Web:      { icon: '🌐', color: '#8b5cf6' },
  Backend:  { icon: '⚙️', color: '#10b981' },
  iOS:      { icon: '🍎', color: '#f59e0b' },
  Design:   { icon: '🎨', color: '#ec4899' },
  CMS:      { icon: '📝', color: '#3b82f6' },
  Practices:{ icon: '✦',  color: '#64748b' },
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(techs, category) in techStack"
      :key="category"
      class="group flex items-start gap-4 rounded-xl border border-white/8 bg-[#0d1117] p-4 transition-all duration-300 hover:border-white/15"
    >
      <!-- Category label column -->
      <div class="flex-shrink-0 w-28 flex items-center gap-2 pt-0.5">
        <span class="text-base">{{ categoryMeta[category]?.icon ?? '◆' }}</span>
        <span
          class="text-[11px] font-mono font-semibold uppercase tracking-wider"
          :style="{ color: categoryMeta[category]?.color ?? '#64748b' }"
        >{{ category }}</span>
      </div>

      <!-- Vertical divider -->
      <div
        class="self-stretch w-px rounded-full"
        :style="{ backgroundColor: (categoryMeta[category]?.color ?? '#64748b') + '30' }"
      />

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 flex-1">
        <span
          v-for="t in techs"
          :key="t"
          class="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/8 hover:bg-white/10 hover:text-white transition-all duration-150 cursor-default"
        >
          {{ t }}
        </span>
      </div>
    </div>
  </div>
</template>
