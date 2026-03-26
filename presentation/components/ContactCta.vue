<template>
  <div class="mt-14 relative rounded-2xl overflow-hidden border border-white/8">
    <!-- Animated gradient mesh -->
    <div class="absolute inset-0 bg-[#0d1117] pointer-events-none" />
    <div class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse at 0% 100%, rgba(6,182,212,0.12) 0%, transparent 50%), radial-gradient(ellipse at 100% 0%, rgba(139,92,246,0.10) 0%, transparent 50%)"
    />
    <!-- Animated border glow -->
    <div class="absolute inset-0 rounded-2xl pointer-events-none border-glow" />

    <div class="relative grid sm:grid-cols-2 gap-8 items-center p-8">
      <!-- Left copy -->
      <div>
        <div class="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-400/8 border border-cyan-400/20 px-3 py-1.5 rounded-full mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Open to work
        </div>
        <h2 class="text-2xl font-black text-white leading-tight mb-2">
          Got a project<br />in mind?
        </h2>
        <p class="text-sm text-slate-400 leading-relaxed">
          Available for freelance on Fiverr. Mobile, web, backend, or design — let's ship something great.
        </p>
      </div>

      <!-- Right CTA -->
      <div class="flex sm:justify-end">
        <a
          id="fiverr-cta-link"
          href="https://www.fiverr.com"
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#1dbf73] hover:bg-[#19a864] transition-all duration-200 shadow-lg shadow-[#1dbf73]/20 hover:shadow-[#1dbf73]/30 hover:-translate-y-0.5"
        >
          <span>Find me on Fiverr</span>
          <span class="group-hover:translate-x-0.5 transition-transform duration-200">↗</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes border-pulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.8; }
}
.border-glow {
  box-shadow: inset 0 0 0 1px rgba(6,182,212,0.08);
  animation: border-pulse 3s ease-in-out infinite;
}
</style>
