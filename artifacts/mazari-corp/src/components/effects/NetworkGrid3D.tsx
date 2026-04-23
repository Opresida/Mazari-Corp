import { useEffect, useRef } from 'react'

interface Node {
  x: number           // -1..1 (horizontal no mundo)
  z: number           // 0..1 (distância do ponto de fuga; 0 = fundo, 1 = frente)
  phase: number       // 0..1 para pulso
  speed: number
  links: number[]     // índices de outros nós
}

/**
 * Grade 3D em perspectiva + nós pulsantes com linhas de conexão.
 * Canvas 2D puro. Desliga em prefers-reduced-motion. Respeita o scroll:
 * a câmera recua levemente conforme rola pra baixo.
 */
export function NetworkGrid3D({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onScroll = () => {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Geração dos nós: 30 nós, aleatórios em x/z com redes próximas
    const rand = (min: number, max: number) => min + Math.random() * (max - min)
    const NODE_COUNT = 30
    const nodes: Node[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: rand(-1.2, 1.2),
        z: rand(0.02, 0.95),
        phase: Math.random(),
        speed: rand(0.3, 0.7),
        links: [],
      })
    }
    // Conecta cada nó aos 2 mais próximos em 3D (x+z)
    for (let i = 0; i < NODE_COUNT; i++) {
      const dists = nodes
        .map((n, j) => ({
          j,
          d: j === i ? Infinity : Math.hypot(n.x - nodes[i].x, (n.z - nodes[i].z) * 2),
        }))
        .sort((a, b) => a.d - b.d)
      nodes[i].links = [dists[0].j, dists[1].j]
    }

    const LIME = 'rgba(210,255,40,'

    // Projeção pseudo-3D: z=0 (fundo/longe) → ponto de fuga; z=1 (frente) → base
    const project = (x: number, z: number, cameraZ: number) => {
      const effectiveZ = Math.max(0.001, z - cameraZ)
      const perspective = 0.35 + effectiveZ * 1.2
      const vanishingX = width * 0.5
      const vanishingY = height * 0.42 // vanishing point ligeiramente acima do centro
      const baseY = height * 1.05
      const px = vanishingX + x * perspective * (width * 0.55)
      const py = vanishingY + (baseY - vanishingY) * perspective
      return { px, py, perspective }
    }

    const drawGrid = (cameraZ: number, t: number) => {
      const gridLines = 14
      const depthLines = 8
      ctx.lineWidth = 1

      // Linhas horizontais (profundidade)
      for (let i = 0; i < depthLines; i++) {
        let z = i / (depthLines - 1)
        // animação de fluxo — desloca a grade pra frente com o tempo
        z = (z + t * 0.04) % 1
        const { py, perspective } = project(0, z, cameraZ)
        const alpha = 0.03 + perspective * 0.12
        const leftX = project(-1.4, z, cameraZ).px
        const rightX = project(1.4, z, cameraZ).px
        ctx.strokeStyle = LIME + alpha + ')'
        ctx.beginPath()
        ctx.moveTo(leftX, py)
        ctx.lineTo(rightX, py)
        ctx.stroke()
      }

      // Linhas verticais (radiais pro vanishing)
      for (let i = 0; i <= gridLines; i++) {
        const x = -1.4 + (i / gridLines) * 2.8
        const a = project(x, 0, cameraZ)
        const b = project(x, 1, cameraZ)
        ctx.strokeStyle = LIME + '0.06)'
        ctx.beginPath()
        ctx.moveTo(a.px, a.py)
        ctx.lineTo(b.px, b.py)
        ctx.stroke()
      }
    }

    const drawNodes = (cameraZ: number, t: number) => {
      // primeiro as linhas de conexão
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const p1 = project(n.x, n.z, cameraZ)
        if (p1.perspective < 0.02) continue
        for (const j of n.links) {
          if (j <= i) continue
          const m = nodes[j]
          const p2 = project(m.x, m.z, cameraZ)
          if (p2.perspective < 0.02) continue
          const avg = (p1.perspective + p2.perspective) / 2
          const alpha = Math.min(0.35, avg * 0.25)
          ctx.strokeStyle = LIME + alpha + ')'
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(p1.px, p1.py)
          ctx.lineTo(p2.px, p2.py)
          ctx.stroke()
        }
      }

      // nós por cima
      for (const n of nodes) {
        const p = project(n.x, n.z, cameraZ)
        if (p.perspective < 0.02) continue
        const pulse = 0.5 + 0.5 * Math.sin((t * n.speed + n.phase) * Math.PI * 2)
        const baseR = 1.2 + p.perspective * 3
        const r = baseR * (0.85 + pulse * 0.5)
        const glowR = r * 6 * p.perspective

        // Glow
        const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, glowR)
        grad.addColorStop(0, LIME + (0.35 + pulse * 0.35) * p.perspective + ')')
        grad.addColorStop(1, LIME + '0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.px, p.py, glowR, 0, Math.PI * 2)
        ctx.fill()

        // Núcleo
        ctx.fillStyle = LIME + (0.85 + pulse * 0.15) + ')'
        ctx.beginPath()
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf = 0
    let t0 = performance.now()
    const render = (now: number) => {
      const t = (now - t0) / 1000

      // câmera recua com scroll (0.15 = muito sutil)
      const cameraZ = Math.min(0.5, (scrollYRef.current / window.innerHeight) * 0.35)

      // Limpa com leve fade pra gerar rastro sutil dos nós
      ctx.fillStyle = 'rgba(8, 9, 8, 1)'
      ctx.fillRect(0, 0, width, height)

      drawGrid(cameraZ, t)
      drawNodes(cameraZ, t)

      if (!reduce) raf = requestAnimationFrame(render)
    }

    if (reduce) {
      // render estático único
      render(performance.now())
    } else {
      raf = requestAnimationFrame(render)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  )
}
