<script setup lang="ts">
import type { Project } from '../../domain/entities/portfolio'

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="props.project"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style="background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);"
        @click.self="emit('close')"
      >
        <div
          class="bg-[#0d1117] border border-white/10 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black"
          @click.stop
        >
          <!-- Gradient topbar -->
          <div
            class="h-1 rounded-t-full sm:rounded-t-2xl"
            :style="{ background: `linear-gradient(to right, ${props.project.color}, ${props.project.color}40, transparent)` }"
          />
          <!-- Drag handle (mobile) -->
          <div class="flex justify-center pt-3 pb-1 sm:hidden">
            <div class="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div class="p-6">
            <!-- Title row -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <span
                  class="text-[10px] font-mono font-semibold uppercase tracking-widest block mb-1"
                  :style="{ color: props.project.color }"
                >{{ props.project.category }}</span>
                <h2 class="text-2xl font-black text-white">{{ props.project.title }}</h2>
                <p class="text-xs font-mono text-slate-500 mt-0.5">{{ props.project.role }}</p>
              </div>
              <button
                id="modal-close-btn"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all text-lg leading-none ml-4 mt-1 flex-shrink-0"
                @click="emit('close')"
              >×</button>
            </div>

            <!-- Divider -->
            <div class="h-px bg-white/8 mb-5" />

            <p class="text-sm text-slate-300 leading-relaxed mb-6">{{ props.project.description }}</p>

            <!-- Highlights -->
            <h4 class="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest mb-3">Key highlights</h4>
            <div class="space-y-3 mb-6">
              <div v-for="(h, i) in props.project.highlights" :key="i" class="flex gap-3 items-start">
                <div
                  class="mt-1.5 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0"
                  :style="{ borderColor: props.project.color + '50', color: props.project.color }"
                >
                  <span style="font-size:8px">✓</span>
                </div>
                <span class="text-sm text-slate-400">{{ h }}</span>
              </div>
            </div>

            <!-- Technologies -->
            <h4 class="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest mb-3">Technologies</h4>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="t in props.project.tech"
                :key="t"
                class="text-xs font-mono px-2.5 py-1 rounded-lg border"
                :style="{
                  color: props.project.color,
                  borderColor: props.project.color + '35',
                  backgroundColor: props.project.color + '0d',
                }"
              >{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active {
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.97);
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
</style>
