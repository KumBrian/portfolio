<script setup lang="ts">
const TABS = [
  { id: 'work', label: 'Work', icon: '◈' },
  { id: 'services', label: 'Services', icon: '◉' },
  { id: 'stack', label: 'Stack', icon: '⬡' },
] as const

type TabId = (typeof TABS)[number]['id']

const props = defineProps<{ activeSection: TabId }>()
const emit = defineEmits<{ (e: 'update:activeSection', value: TabId): void }>()
</script>

<template>
  <nav class="bg-[#050810]/90 backdrop-blur-lg border-b border-white/5 sticky top-0 z-40">
    <div class="max-w-5xl mx-auto px-6">
      <div class="flex items-center gap-1 py-2">
        <button
          v-for="tab in TABS"
          :key="tab.id"
          :id="`nav-tab-${tab.id}`"
          class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          :class="
            props.activeSection === tab.id
              ? 'bg-white/8 text-white border border-white/12'
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
          "
          @click="emit('update:activeSection', tab.id)"
        >
          <span class="text-xs" :class="props.activeSection === tab.id ? 'text-cyan-400' : 'text-slate-600'">
            {{ tab.icon }}
          </span>
          {{ tab.label }}
          <span
            v-if="props.activeSection === tab.id"
            class="ml-1 w-1.5 h-1.5 rounded-full bg-cyan-400"
          />
        </button>
      </div>
    </div>
  </nav>
</template>
