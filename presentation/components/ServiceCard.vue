<script setup lang="ts">
import type { Service } from '../../domain/entities/portfolio'

const props = defineProps<{ service: Service; index: number }>()
</script>

<template>
  <div class="group relative rounded-2xl bg-[#0d1117] border border-white/8 p-6 overflow-hidden transition-all duration-300 hover:border-white/18 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
    <!-- Ghost index number -->
    <span class="absolute right-4 bottom-4 text-[60px] font-black leading-none text-white/4 select-none pointer-events-none">
      {{ String(index + 1).padStart(2, '0') }}
    </span>

    <!-- Icon + title row -->
    <div class="flex items-center gap-3 mb-4">
      <div class="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
        {{ service.icon }}
      </div>
      <h3 class="text-base font-bold text-white">{{ service.title }}</h3>
    </div>

    <!-- Divider -->
    <div class="h-px bg-gradient-to-r from-white/10 to-transparent mb-4" />

    <p class="text-sm text-slate-400 leading-relaxed mb-4">{{ service.description }}</p>

    <!-- Tech pills -->
    <div class="flex flex-wrap gap-1.5">
      <span
        v-for="t in service.tech.split(' · ')"
        :key="t"
        class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-500 border border-white/8"
      >
        {{ t }}
      </span>
    </div>
  </div>
</template>
