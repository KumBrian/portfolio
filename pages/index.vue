<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '../domain/entities/portfolio'
import { PROJECTS } from '../domain/data/projects'
import { SERVICES } from '../domain/data/services'
import { TECH_STACK } from '../domain/data/techStack'
import AppHeader from '../presentation/components/AppHeader.vue'
import AppNav from '../presentation/components/AppNav.vue'
import ProjectCard from '../presentation/components/ProjectCard.vue'
import ProjectModal from '../presentation/components/ProjectModal.vue'
import ServiceCard from '../presentation/components/ServiceCard.vue'
import TechStackSection from '../presentation/components/TechStackSection.vue'
import ContactCta from '../presentation/components/ContactCta.vue'

type Section = 'work' | 'services' | 'stack'

const activeSection = ref<Section>('work')
const selectedProject = ref<Project | null>(null)
</script>

<template>
  <div class="min-h-screen bg-[#050810] font-sans">
    <AppHeader />
    <AppNav :active-section="activeSection" @update:active-section="activeSection = $event" />

    <main class="max-w-5xl mx-auto px-6 py-10">
      <!-- Work -->
      <section v-if="activeSection === 'work'" id="section-work">
        <p class="text-[11px] font-mono text-slate-600 mb-6">
          <span class="text-cyan-600">const</span> projects = [<span class="text-slate-500">{{ PROJECTS.length }} selected</span>]
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard
            v-for="(project, i) in PROJECTS"
            :key="project.title"
            :project="project"
            :index="i"
            @click="selectedProject = project"
          />
        </div>
      </section>

      <!-- Services -->
      <section v-else-if="activeSection === 'services'" id="section-services">
        <p class="text-[11px] font-mono text-slate-600 mb-6">
          <span class="text-cyan-600">const</span> services = [<span class="text-slate-500">{{ SERVICES.length }} offerings</span>]
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ServiceCard
            v-for="(service, i) in SERVICES"
            :key="service.title"
            :service="service"
            :index="i"
          />
        </div>
      </section>

      <!-- Stack -->
      <section v-else-if="activeSection === 'stack'" id="section-stack">
        <p class="text-[11px] font-mono text-slate-600 mb-6">
          <span class="text-cyan-600">const</span> stack = { <span class="text-slate-500">tools &amp; technologies</span> }
        </p>
        <TechStackSection :tech-stack="TECH_STACK" />
      </section>

      <ContactCta />
    </main>

    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </div>
</template>
