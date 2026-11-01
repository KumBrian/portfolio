<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Project } from '../domain/entities/portfolio'
import profile from '../domain/data/profile.json'
import { PROJECTS as OTHER_PROJECTS } from '../domain/data/projects'
import AppHeader from '../presentation/components/AppHeader.vue'
import AppNav from '../presentation/components/AppNav.vue'
import ProjectCard from '../presentation/components/ProjectCard.vue'
import ProjectModal from '../presentation/components/ProjectModal.vue'
import TechStackSection from '../presentation/components/TechStackSection.vue'
import ContactCta from '../presentation/components/ContactCta.vue'

const filters = ['All work', 'Mobile', 'Frontend', 'Backend', 'Enterprise', 'Client Sites', 'Other Work'] as const
const activeFilter = ref<(typeof filters)[number]>('All work')
const selectedProject = ref<Project | null>(null)
const professionalProjects = computed(() => profile.projects.filter(project => project.engagement === 'Professional' && (activeFilter.value === 'All work' || project.filters.includes(activeFilter.value))))
const clientProjects = computed(() => profile.projects.filter(project => project.engagement === 'Independent client' && (activeFilter.value === 'All work' || project.filters.includes(activeFilter.value))))
const projectCount = computed(() => activeFilter.value === 'Other Work' ? OTHER_PROJECTS.length : professionalProjects.value.length + clientProjects.value.length)
const updatedLabel = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${profile.updated}T00:00:00Z`))
let observer: IntersectionObserver | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.documentElement.classList.add('motion-ready')
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    })
  }, { threshold: .08, rootMargin: '0px 0px -30px 0px' })
  document.querySelectorAll('.reveal').forEach(element => observer?.observe(element))
})
onBeforeUnmount(() => {
  observer?.disconnect()
  document.documentElement.classList.remove('motion-ready')
})
</script>

<template>
  <div class="portfolio">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <AppNav />
    <AppHeader />
    <main id="main-content" tabindex="-1">
      <section id="work" class="work-section" aria-labelledby="work-title">
        <div class="page-shell">
          <div class="work-heading reveal">
            <div>
              <p class="section-label">01 / Selected work</p>
              <h2 id="work-title">Work, with<br />a purpose<span class="acid-dot">.</span></h2>
            </div>
            <div class="work-heading-aside">
              <svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M8 8 70 70M13 70h57V13" stroke="currentColor" stroke-width="2" /></svg>
              <p>Different domains. Real problems.<br />A selection of the things<br />I’ve helped bring to life.</p>
            </div>
          </div>
          <div class="work-toolbar">
            <div class="project-filters" role="group" aria-label="Filter projects">
              <button v-for="filter in filters" :key="filter" type="button" :aria-pressed="activeFilter === filter" aria-controls="project-results" @click="activeFilter = filter">{{ filter }}</button>
            </div>
            <span class="work-count mono" aria-hidden="true">[ {{ String(projectCount).padStart(2, '0') }} ]</span>
          </div>
          <p class="sr-only" role="status" aria-live="polite">{{ projectCount }} projects shown for {{ activeFilter }}.</p>
          <div id="project-results">
            <div v-if="professionalProjects.length" class="work-group">
              <div class="work-group-title"><h3>Professional work <span>/ {{ profile.experience[0].company }}</span></h3><p class="mono">Individual contributions · Team products</p></div>
              <TransitionGroup name="gallery" tag="div" class="project-grid">
                <ProjectCard v-for="project in professionalProjects" :key="project.title" :project="project" :index="profile.projects.findIndex(item => item.title === project.title)" @click="selectedProject = project" />
                <div v-if="activeFilter === 'All work'" key="work-note" class="work-note">
                  <svg viewBox="0 0 200 150" fill="none" aria-hidden="true"><path d="M13 117C40 17 105 16 127 72c18 45-47 72-67 37C21 38 161-19 186 39c18 41-27 96-63 95" stroke="currentColor" stroke-width="1.5"/><path d="m163 116-41 19 8-42" stroke="currentColor" stroke-width="1.5"/></svg>
                  <p>One curious mind.<br />Many ways to build.</p>
                  <span class="mono">Mobile / Frontend / Backend</span>
                </div>
              </TransitionGroup>
            </div>
            <div v-if="clientProjects.length" class="work-group client-work">
              <div class="work-group-title"><h3>Independent client work</h3><p class="mono">From concept to a live website</p></div>
              <TransitionGroup name="gallery" tag="div" class="project-grid">
                <ProjectCard v-for="project in clientProjects" :key="project.title" :project="project" :index="profile.projects.findIndex(item => item.title === project.title)" @click="selectedProject = project" />
              </TransitionGroup>
            </div>
            <div v-if="activeFilter === 'Other Work'" class="work-group">
              <div class="work-group-title"><h3>The explorations</h3><p class="mono">Earlier projects & experiments</p></div>
              <TransitionGroup name="gallery" tag="div" class="project-grid">
                <ProjectCard v-for="(project, i) in OTHER_PROJECTS" :key="project.title" :project="project" :index="i" @click="selectedProject = project" />
              </TransitionGroup>
            </div>
          </div>
          <div class="work-signoff mono"><span>A closer look is a click away.</span><span>Scroll to meet the builder ↓</span></div>
        </div>
      </section>

      <section id="about" class="about-section page-shell" aria-labelledby="about-title">
        <div class="about-intro reveal">
          <p class="section-label">02 / The person behind the work</p>
          <h2 id="about-title">A builder by nature.<br /><span>Curious by default.</span></h2>
        </div>
        <div class="about-story reveal">
          <div class="about-mark" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="76" stroke="currentColor"/><path d="M24 100h152M100 24v152M46 46l108 108M46 154 154 46" stroke="currentColor"/><circle cx="100" cy="100" r="39" fill="var(--paper)" stroke="currentColor"/><circle cx="100" cy="100" r="7" fill="currentColor"/></svg>
            <span class="mono">Cameroon → Wherever ideas go</span>
          </div>
          <div class="about-copy">
            <p>{{ profile.about }}</p>
            <div class="education-line"><span class="mono">The foundations</span><div><strong>{{ profile.education.degree }}</strong><span>{{ profile.education.institution }} · {{ profile.education.location }}</span></div></div>
          </div>
        </div>
        <div class="capabilities-heading"><h3>The tools change.<br />The curiosity stays.</h3><p class="mono">Capabilities / Proven in practice</p></div>
        <TechStackSection />
      </section>

      <section id="experience" class="journey-section page-shell" aria-labelledby="experience-title">
        <div class="journey-heading reveal">
          <p class="section-label">03 / The journey</p>
          <h2 id="experience-title">Learning.<br />Building.<br /><span>Moving forward.</span></h2>
          <p>Two chapters at {{ profile.experience[0].company }}.<br />A continuous practice of making things work.</p>
        </div>
        <div class="journey-roles">
          <article v-for="(role, i) in profile.experience" :key="role.title" class="journey-role reveal">
            <div class="journey-date mono"><span class="journey-node" :class="{ current: i === 0 }" /><span>{{ role.period }}</span><span>{{ role.type }}</span></div>
            <h3>{{ role.company }}<span>{{ role.title }}</span></h3>
            <ul><li v-for="highlight in role.highlights" :key="highlight">{{ highlight }}</li></ul>
          </article>
        </div>
      </section>

      <section id="cv" class="cv-section" aria-labelledby="cv-title">
        <div class="page-shell cv-inner reveal">
          <div class="cv-graphic" aria-hidden="true"><span>CV</span><svg viewBox="0 0 240 240" fill="none"><circle cx="120" cy="120" r="110" stroke="currentColor" stroke-dasharray="2 8"/><path d="M50 168 190 72M66 185 174 55" stroke="currentColor"/></svg></div>
          <div class="cv-copy"><p class="section-label">04 / The short version</p><h2 id="cv-title">One page.<br />The whole picture.</h2><p>Experience, projects and the skills behind them.<br />Ready to take with you.</p></div>
          <div class="cv-action"><a href="/Kum_Brian_Ihimbru_CV.pdf" download class="cv-download"><span>Download CV</span><span class="cv-download-arrow" aria-hidden="true">↓</span></a><span class="mono">PDF / Updated <time :datetime="profile.updated">{{ updatedLabel }}</time></span></div>
        </div>
      </section>
      <ContactCta />
    </main>
    <footer class="site-footer page-shell"><a href="#home" aria-label="Back to top">Kum Brian Ihimbru <span aria-hidden="true">↑</span></a><p class="mono">Thoughtfully built. Always evolving.</p><a :href="profile.github" target="_blank" rel="noopener noreferrer" class="mono">GitHub ↗<span class="sr-only"> (opens in a new tab)</span></a></footer>
    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </div>
</template>

<style scoped>
.work-section { padding: 110px 0 35px; background: var(--night); color: var(--paper); border-radius: 36px 36px 0 0; overflow: hidden; }
.work-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-bottom: 62px; }
.work-heading .section-label { color: var(--night-muted); margin-bottom: 34px; }
.work-heading h2 { font-family: var(--font-display); font-size: clamp(56px, 6.8vw, 98px); letter-spacing: -.055em; line-height: .97; font-weight: 600; }
.acid-dot { color: var(--acid); }
.work-heading-aside { width: 280px; padding-bottom: 5px; }
.work-heading-aside svg { width: 68px; margin-bottom: 28px; color: var(--acid); }
.work-heading-aside p { font-size: 15px; line-height: 1.65; color: var(--night-muted); }
.work-toolbar { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #3c4238; border-bottom: 1px solid #3c4238; margin-bottom: 45px; }
.project-filters { display: flex; flex-wrap: wrap; column-gap: 26px; }
.project-filters button { padding: 21px 0; position: relative; font-size: 12px; color: var(--night-muted); min-height: 50px; }
.project-filters button::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 2px; background: var(--acid); transform: scaleX(0); transform-origin: left; transition: transform .3s; }
.project-filters button[aria-pressed='true'], .project-filters button:hover { color: var(--acid); }
.project-filters button[aria-pressed='true']::after { transform: scaleX(1); }
.work-count { color: var(--night-muted); }
.work-group { margin-bottom: 64px; }
.work-group-title { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; margin-bottom: 24px; }
.work-group-title h3 { font-size: 13px; font-weight: 400; }
.work-group-title h3 span { color: var(--night-muted); }
.work-group-title p { color: var(--night-muted); font-size: 8px; }
.project-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 52px 32px; align-items: start; position: relative; }
.project-grid > :nth-child(2n) { margin-top: 76px; }
.gallery-enter-active { transition: opacity .45s ease, transform .45s ease; }
.gallery-enter-from { opacity: 0; transform: translateY(18px); }
.gallery-move { transition: transform .45s ease; }
.work-note { align-self: center; padding: 30px 50px 70px; }
.work-note svg { width: 160px; height: 120px; margin-bottom: 28px; color: var(--acid); }
.work-note p { font-family: var(--font-display); font-size: clamp(27px, 3vw, 43px); line-height: 1.2; letter-spacing: -.035em; margin-bottom: 25px; }
.work-note .mono { font-size: 8px; color: var(--night-muted); }
.client-work { padding-top: 38px; border-top: 1px solid #3c4238; }
.work-signoff { display: flex; justify-content: space-between; gap: 20px; border-top: 1px solid #3c4238; color: var(--night-muted); padding-top: 28px; font-size: 8px; }
.about-section { padding-block: 128px 90px; }
.about-intro .section-label { margin-bottom: 38px; }
.about-intro h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(36px, 5.5vw, 78px); line-height: 1.08; letter-spacing: -.055em; }
.about-intro h2 span { color: var(--muted); }
.about-story { display: grid; grid-template-columns: 1fr 1.35fr; gap: 80px; margin: 70px 0 110px; }
.about-mark svg { width: 190px; height: 190px; margin-bottom: 28px; }
.about-mark .mono { display: block; font-size: 8px; }
.about-copy > p { font-size: clamp(17px, 1.65vw, 22px); line-height: 1.7; letter-spacing: -.025em; }
.education-line { display: grid; grid-template-columns: 120px 1fr; gap: 20px; border-top: 1px solid var(--line); margin-top: 36px; padding-top: 26px; }
.education-line > .mono { font-size: 8px; color: var(--muted); padding-top: 5px; }
.education-line strong { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; }
.education-line div > span { font-size: 12px; color: var(--muted); }
.capabilities-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 36px; }
.capabilities-heading h3 { font-family: var(--font-display); font-size: 28px; font-weight: 500; line-height: 1.2; letter-spacing: -.035em; }
.capabilities-heading p { color: var(--muted); font-size: 8px; }
.journey-section { display: grid; grid-template-columns: .9fr 1.3fr; gap: 80px; padding-block: 45px 130px; }
.journey-heading { padding-top: 26px; border-top: 1px solid var(--line); }
.journey-heading h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(33px, 3.8vw, 52px); line-height: 1.1; letter-spacing: -.05em; margin-block: 34px 26px; }
.journey-heading h2 span { color: var(--muted); }
.journey-heading > p:last-child { font-size: 13px; line-height: 1.8; color: var(--muted); }
.journey-role { border-top: 1px solid var(--line); padding-block: 28px 40px; }
.journey-date { display: flex; align-items: center; gap: 10px; font-size: 8px; color: var(--muted); }
.journey-date > span:last-child { margin-left: auto; }
.journey-node { width: 7px; height: 7px; border: 1px solid var(--ink); border-radius: 50%; }
.journey-node.current { background: var(--ink); }
.journey-role h3 { font-family: var(--font-display); font-size: 36px; font-weight: 600; letter-spacing: -.04em; margin-block: 24px 24px; line-height: 1.2; }
.journey-role h3 span { display: block; font-family: var(--font-body); font-size: 18px; font-weight: 400; letter-spacing: -.02em; margin-top: 5px; }
.journey-role ul { display: grid; gap: 15px; }
.journey-role li { font-size: 13px; line-height: 1.75; color: var(--muted); position: relative; padding-left: 19px; }
.journey-role li::before { content: '↗'; position: absolute; left: 0; color: var(--ink); }
.cv-section { background: var(--night); color: var(--paper); padding-block: 76px; }
.cv-inner { display: grid; grid-template-columns: .7fr 1.4fr 1fr; align-items: center; gap: 48px; }
.cv-graphic { position: relative; width: 180px; aspect-ratio: 1; display: grid; place-items: center; color: var(--acid); }
.cv-graphic span { font-family: var(--font-display); font-size: 64px; font-weight: 500; letter-spacing: -.1em; }
.cv-graphic svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.cv-copy .section-label { color: var(--night-muted); font-size: 8px; margin-bottom: 25px; }
.cv-copy h2 { font-family: var(--font-display); font-size: clamp(31px, 3.2vw, 46px); line-height: 1.1; font-weight: 500; letter-spacing: -.04em; }
.cv-copy > p:last-child { color: var(--night-muted); font-size: 13px; line-height: 1.8; margin-top: 20px; }
.cv-action { display: grid; gap: 20px; justify-items: end; }
.cv-download { display: flex; align-items: center; gap: 26px; font-size: 14px; }
.cv-download-arrow { display: grid; place-items: center; width: 65px; height: 65px; border-radius: 50%; border: 1px solid var(--acid); color: var(--acid); font-size: 28px; transition: color .3s, background .3s, transform .3s; }
.cv-download:hover .cv-download-arrow { background: var(--acid); color: var(--ink); transform: translateY(4px); }
.cv-action > .mono { font-size: 8px; color: var(--night-muted); }
.site-footer { display: flex; justify-content: space-between; gap: 24px; align-items: center; padding-block: 30px; border-top: 1px solid var(--line); }
.site-footer > a:first-child { font-weight: 500; font-size: 12px; }
.site-footer > a:first-child span { margin-left: 20px; }
.site-footer p, .site-footer > a:last-child { font-size: 8px; color: var(--muted); }
@media(min-width:1600px) { .work-heading h2 { font-size: 108px; } }
@media(max-width: 1050px) {
  .project-filters { column-gap: 17px; }
  .work-count { display: none; }
  .about-story { gap: 45px; }
  .journey-section { gap: 45px; }
  .cv-inner { gap: 24px; grid-template-columns: .5fr 1.5fr 1fr; }
  .cv-graphic { width: 120px; }
  .cv-graphic span { font-size: 42px; }
  .cv-download { gap: 15px; }
}
@media(max-width: 760px) {
  .work-section { border-radius: 24px 24px 0 0; padding-top: 65px; }
  .work-heading { gap: 20px; align-items: flex-start; margin-bottom: 38px; }
  .work-heading .section-label { margin-bottom: 25px; font-size: 8px; }
  .work-heading h2 { font-size: clamp(45px, 10vw, 70px); }
  .work-heading-aside { width: auto; padding-top: 33px; }
  .work-heading-aside svg { width: 43px; margin: 0; }
  .work-heading-aside p { display: none; }
  .work-toolbar { margin-bottom: 30px; }
  .project-filters { column-gap: 19px; }
  .project-filters button { font-size: 10px; padding: 15px 0; min-height: 44px; }
  .work-group-title { align-items: flex-start; margin-bottom: 22px; }
  .work-group-title h3 { font-size: 11px; }
  .work-group-title p { display: none; }
  .project-grid { grid-template-columns: 1fr; gap: 38px; }
  .project-grid > :nth-child(2n) { margin-top: 0; }
  .work-note { display: none; }
  .work-group { margin-bottom: 45px; }
  .client-work { padding-top: 30px; }
  .work-signoff { font-size: 7px; }
  .work-signoff span:last-child { display: none; }
  .about-section { padding-block: 75px 60px; }
  .about-intro .section-label { font-size: 8px; margin-bottom: 30px; }
  .about-intro h2 { font-size: clamp(32px, 6.5vw, 50px); }
  .about-story { grid-template-columns: 1fr; gap: 30px; margin: 40px 0 65px; }
  .about-mark { display: flex; align-items: center; gap: 22px; }
  .about-mark svg { width: 90px; height: 90px; margin: 0; }
  .about-mark .mono { max-width: 150px; line-height: 1.8; }
  .about-copy > p { font-size: 17px; line-height: 1.7; }
  .education-line { grid-template-columns: 1fr; gap: 12px; margin-top: 25px; padding-top: 22px; }
  .capabilities-heading { margin-bottom: 25px; }
  .capabilities-heading h3 { font-size: 24px; }
  .capabilities-heading p { display: none; }
  .journey-section { padding-block: 10px 70px; grid-template-columns: 1fr; gap: 35px; }
  .journey-heading h2 { font-size: 41px; margin-block: 26px 18px; }
  .journey-heading > p:last-child { max-width: 270px; }
  .journey-date { font-size: 7px; gap: 7px; flex-wrap: wrap; }
  .journey-role h3 { font-size: 31px; }
  .journey-role h3 span { font-size: 17px; }
  .cv-section { padding-block: 55px; }
  .cv-inner { grid-template-columns: 1fr; gap: 30px; position: relative; }
  .cv-graphic { position: absolute; right: 22px; top: 0; width: 70px; opacity: .35; }
  .cv-graphic span { font-size: 24px; }
  .cv-copy h2 { font-size: 36px; }
  .cv-action { justify-items: start; gap: 14px; }
  .cv-download { flex-direction: row-reverse; }
  .cv-download-arrow { width: 50px; height: 50px; font-size: 23px; }
  .site-footer { flex-wrap: wrap; padding-block: 23px; gap: 18px; }
  .site-footer p { order: 3; flex-basis: 100%; }
  .site-footer > a:first-child { font-size: 10px; }
}
</style>
