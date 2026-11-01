<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ motionPaused?: boolean }>(), { motionPaused: true })
const surface = ref<HTMLCanvasElement | null>(null)
const frame = ref<HTMLDivElement | null>(null)
const ready = ref(false)
type Point = { x: number; y: number; z: number }
type Vertex = Point & { nx: number; ny: number; nz: number; accent: boolean }
type Projected = Point & { shade: number; accent: boolean }
const ringCount = 112
const sides = 28
const vertices: Vertex[] = []
let context: CanvasRenderingContext2D | null = null
let resizeObserver: ResizeObserver | undefined
let visibilityObserver: IntersectionObserver | undefined
let animation = 0
let width = 500
let height = 500
let lastTime = 0
let elapsed = 0
let visible = true
let pointer = { x: 0, y: 0 }
let easedPointer = { x: 0, y: 0 }

function normalize(point: Point): Point {
  const length = Math.hypot(point.x, point.y, point.z)
  return { x: point.x / length, y: point.y / length, z: point.z / length }
}
function cross(a: Point, b: Point): Point {
  return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x }
}
function curve(t: number): Point {
  return { x: (2 + .72 * Math.cos(3 * t)) * Math.cos(2 * t), y: (2 + .72 * Math.cos(3 * t)) * Math.sin(2 * t), z: .9 * Math.sin(3 * t) }
}
// A continuous trefoil with ribs: three disciplines, one connected form.
function buildSculpture() {
  for (let ring = 0; ring < ringCount; ring++) {
    const t = ring / ringCount * Math.PI * 2
    const center = curve(t)
    const next = curve(t + .001)
    const tangent = normalize({ x: next.x - center.x, y: next.y - center.y, z: next.z - center.z })
    const normal = normalize(cross(tangent, { x: 0, y: 0, z: 1 }))
    const binormal = normalize(cross(tangent, normal))
    for (let side = 0; side < sides; side++) {
      const angle = side / sides * Math.PI * 2
      const nx = normal.x * Math.cos(angle) + binormal.x * Math.sin(angle)
      const ny = normal.y * Math.cos(angle) + binormal.y * Math.sin(angle)
      const nz = normal.z * Math.cos(angle) + binormal.z * Math.sin(angle)
      const radius = .49 + .035 * Math.cos(t * 3)
      vertices.push({ x: center.x + nx * radius, y: center.y + ny * radius, z: center.z + nz * radius, nx, ny, nz, accent: ring >= 13 && ring <= 39 })
    }
  }
}
function rotate(point: Point, ax: number, ay: number, az: number): Point {
  const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax), cz = Math.cos(az), sz = Math.sin(az)
  const x = point.x * cy + point.z * sy
  const z = -point.x * sy + point.z * cy
  const y = point.y * cx - z * sx
  const depth = point.y * sx + z * cx
  return { x: x * cz - y * sz, y: x * sz + y * cz, z: depth }
}
function draw() {
  if (!context) return
  const ctx = context
  ctx.clearRect(0, 0, width, height)
  const unit = Math.min(width, height) / 7.7
  const ax = .72 + Math.sin(elapsed * .09) * .12 + easedPointer.y * .12
  const ay = -.26 + Math.sin(elapsed * .07) * .18 + easedPointer.x * .16
  const az = -.42 + elapsed * .018
  const projected: Projected[] = vertices.map(vertex => {
    const point = rotate(vertex, ax, ay, az)
    const normal = rotate({ x: vertex.nx, y: vertex.ny, z: vertex.nz }, ax, ay, az)
    const perspective = 10 / (10 - point.z)
    return { x: width * .5 + point.x * unit * perspective, y: height * .48 + point.y * unit * perspective, z: point.z, shade: Math.max(0, Math.min(1, .6 + normal.x * -.19 + normal.y * -.26 + normal.z * .2)), accent: vertex.accent }
  })
  const faces: { a: number; b: number; c: number; d: number; depth: number }[] = []
  for (let ring = 0; ring < ringCount; ring++) {
    for (let side = 0; side < sides; side++) {
      const a = ring * sides + side
      const b = ring * sides + (side + 1) % sides
      const c = ((ring + 1) % ringCount) * sides + (side + 1) % sides
      const d = ((ring + 1) % ringCount) * sides + side
      faces.push({ a, b, c, d, depth: (projected[a]!.z + projected[b]!.z + projected[c]!.z + projected[d]!.z) / 4 })
    }
  }
  faces.sort((a, b) => a.depth - b.depth)
  for (const face of faces) {
    const a = projected[face.a]!, b = projected[face.b]!, c = projected[face.c]!, d = projected[face.d]!
    const shade = (a.shade + b.shade + c.shade + d.shade) / 4
    if (a.accent) {
      ctx.fillStyle = `rgb(${Math.round(135 + shade * 82)} ${Math.round(159 + shade * 91)} ${Math.round(59 + shade * 58)})`
    } else {
      const ink = Math.round(137 + shade * 103)
      ctx.fillStyle = `rgb(${ink} ${ink + 1} ${ink - 8})`
    }
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.lineTo(c.x, c.y)
    ctx.lineTo(d.x, d.y)
    ctx.closePath()
    ctx.fill()
    // Fine transverse lines describe the volume without a dense wireframe grid.
    ctx.strokeStyle = a.accent ? 'rgba(34, 44, 20, .67)' : 'rgba(31, 35, 29, .65)'
    ctx.lineWidth = Math.max(.45, width / 850)
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }
}
function tick(time: number) {
  if (props.motionPaused || !visible || document.hidden) { animation = 0; lastTime = 0; return }
  // Cap the artwork at 30 fps, and avoid catching up after a hidden tab.
  if (lastTime === 0 || time - lastTime >= 32) {
    elapsed += lastTime ? Math.min((time - lastTime) / 1000, .05) : 0
    lastTime = time
    easedPointer.x += (pointer.x - easedPointer.x) * .07
    easedPointer.y += (pointer.y - easedPointer.y) * .07
    draw()
  }
  animation = requestAnimationFrame(tick)
}
function syncAnimation() {
  cancelAnimationFrame(animation)
  animation = 0
  lastTime = 0
  if (!props.motionPaused && visible && !document.hidden) animation = requestAnimationFrame(tick)
}
function resize() {
  if (!surface.value || !frame.value || !context) return
  width = frame.value.clientWidth
  height = frame.value.clientHeight
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  surface.value.width = Math.round(width * pixelRatio)
  surface.value.height = Math.round(height * pixelRatio)
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  draw()
}
function onPointerMove(event: PointerEvent) {
  if (!frame.value || props.motionPaused || event.pointerType === 'touch') return
  const bounds = frame.value.getBoundingClientRect()
  pointer = { x: ((event.clientX - bounds.left) / bounds.width - .5) * 2, y: ((event.clientY - bounds.top) / bounds.height - .5) * 2 }
}
function resetPointer() { pointer = { x: 0, y: 0 } }
watch(() => props.motionPaused, () => { if (context) syncAnimation() })
onMounted(() => {
  context = surface.value?.getContext('2d') ?? null
  if (!context || !frame.value) return
  buildSculpture()
  resize()
  ready.value = true
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(frame.value)
  visibilityObserver = new IntersectionObserver(entries => {
    visible = entries[0]?.isIntersecting ?? false
    syncAnimation()
  }, { threshold: .05 })
  visibilityObserver.observe(frame.value)
  document.addEventListener('visibilitychange', syncAnimation)
  syncAnimation()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(animation)
  resizeObserver?.disconnect()
  visibilityObserver?.disconnect()
  document.removeEventListener('visibilitychange', syncAnimation)
})
</script>

<template>
  <div ref="frame" class="connection-sculpture" aria-hidden="true" @pointermove="onPointerMove" @pointerleave="resetPointer">
    <div class="connection-sculpture__grid" />
    <span class="connection-sculpture__cross connection-sculpture__cross--tl">+</span>
    <span class="connection-sculpture__cross connection-sculpture__cross--tr">+</span>
    <span class="connection-sculpture__cross connection-sculpture__cross--bl">+</span>
    <span class="connection-sculpture__cross connection-sculpture__cross--br">+</span>
    <span class="connection-sculpture__axis connection-sculpture__axis--vertical" />
    <span class="connection-sculpture__axis connection-sculpture__axis--horizontal" />
    <svg v-if="!ready" class="connection-sculpture__fallback" viewBox="0 0 500 500" fill="none">
      <g transform="translate(250 250) rotate(-25)" stroke="#1b1d19" stroke-width="1">
        <ellipse v-for="index in 14" :key="index" :rx="125 + index * 3" :ry="60 + index * 4" :transform="`rotate(${index * 12})`" />
        <circle r="66" stroke="#b8db60" stroke-width="28" />
      </g>
    </svg>
    <canvas ref="surface" class="connection-sculpture__canvas" />
    <span class="connection-sculpture__coordinate">X / Y / Z</span>
    <span class="connection-sculpture__caption">Form. Flow. Function.</span>
  </div>
</template>

<style scoped>
.connection-sculpture { position: relative; width: 100%; aspect-ratio: 1.07; isolation: isolate; }
.connection-sculpture__canvas, .connection-sculpture__fallback { width: 100%; height: 100%; position: absolute; inset: 0; z-index: 2; }
.connection-sculpture__grid { position: absolute; inset: 0; opacity: .35; background-image: radial-gradient(var(--muted, #66695f) .65px, transparent .65px); background-size: 24px 24px; mask-image: radial-gradient(ellipse, black 15%, transparent 72%); }
.connection-sculpture__axis { position: absolute; z-index: 0; opacity: .5; }
.connection-sculpture__axis--vertical { left: 50%; top: 10%; bottom: 10%; width: 1px; background: linear-gradient(transparent, var(--line, #d3d5c9) 30%, var(--line, #d3d5c9) 70%, transparent); }
.connection-sculpture__axis--horizontal { top: 48%; left: 3%; right: 3%; height: 1px; background: linear-gradient(90deg, transparent, var(--line, #d3d5c9) 30%, var(--line, #d3d5c9) 70%, transparent); }
.connection-sculpture__cross { position: absolute; font-family: var(--font-mono, monospace); font-size: 14px; color: #92978a; line-height: 1; }
.connection-sculpture__cross--tl { top: 0; left: 0; }
.connection-sculpture__cross--tr { top: 0; right: 0; }
.connection-sculpture__cross--bl { bottom: 13px; left: 0; }
.connection-sculpture__cross--br { bottom: 13px; right: 0; }
.connection-sculpture__coordinate, .connection-sculpture__caption { position: absolute; bottom: 10px; color: var(--muted, #66695f); font-family: var(--font-mono, monospace); font-size: 8px; letter-spacing: .07em; }
.connection-sculpture__coordinate { left: 24px; }
.connection-sculpture__caption { right: 24px; text-transform: uppercase; }
</style>
