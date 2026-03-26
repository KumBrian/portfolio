<script setup lang="ts">
import type { Project } from '../../domain/entities/portfolio'

const props = defineProps<{
  project: Project
  index: number
}>()
const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button
    class="group relative text-left w-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#0d1117] to-[#0a0e15] transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1"
    @click="emit('click')"
  >
    <!-- Large background number -->
    <span
      class="absolute right-4 top-2 text-[80px] font-black leading-none pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
      :style="{ color: props.project.color + '10' }"
    >
      {{ String(index + 1).padStart(2, '0') }}
    </span>

    <!-- Left colour strip -->
    <div
      class="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl transition-all duration-300 group-hover:w-1"
      :style="{ backgroundColor: project.color }"
    />

    <div class="relative p-6 pl-7">
      <!-- Header row -->
      <div class="flex items-start justify-between mb-3">
        <div>
          <span
            class="text-[10px] font-mono font-semibold uppercase tracking-widest mb-1.5 block"
            :style="{ color: project.color }"
          >
            {{ project.category }}
          </span>
          <h3 class="text-lg font-bold text-white leading-tight group-hover:text-cyan-50 transition-colors">
            {{ project.title }}
          </h3>
        </div>
        <!-- Arrow icon -->
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-slate-500 group-hover:text-white group-hover:border-white/30 transition-all duration-300 flex-shrink-0 ml-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </div>
      </div>

      <p class="text-sm text-slate-400 leading-relaxed mb-4">{{ project.description }}</p>

      <!-- Tech tags -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="t in project.tech"
          :key="t"
          class="text-[11px] font-mono px-2 py-0.5 rounded border"
          :style="{
            color: project.color + 'cc',
            borderColor: project.color + '25',
            backgroundColor: project.color + '0c',
          }"
        >
          {{ t }}
        </span>
      </div>
    </div>
  </button>
</template>
