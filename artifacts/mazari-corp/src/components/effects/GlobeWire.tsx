import { useEffect, useRef } from 'react'

/**
 * Globo wireframe 3D real. Canvas 2D com projeção esférica:
 * - meridianos e paralelos rotacionando em Y
 * - hubs pulsantes com lat/lon reais
 * - halo ambiente + sombra interna pra sensação de volume
 */

interface Hub {
  name: string
  lat: number   // graus
  lon: number   // graus
}

const HUBS: Hub[] = [
  { name: 'Bahamas', lat: 25.03, lon: -77.4 },
  { name: 'Paraguai', lat: -25.26, lon: -57.58 },
  { name: 'Marrocos', lat: 31.63, lon: -7.99 },
  { name: 'Malta', lat: 35.93, lon: 14.37 },
  { name: 'Dubai', lat: 25.2, lon: 55.27 },
]

export function GlobeWire({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let radius = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = width / 2
      cy = height / 2
      radius = Math.min(width, height) * 0.4
    }
    resize()
    window.addEventListener('resize', resize)

    // Projeta (lat, lon) no canvas considerando rotação Y atual
    // Retorna { x, y, z } onde z > 0 = visível (hemisfério da frente)
    const project = (latDeg: number, lonDeg: number, yaw: number) => {
      const lat = (latDeg * Math.PI) / 180
      const lon = ((lonDeg + yaw) * Math.PI) / 180
      const x = radius * Math.cos(lat) * Math.sin(lon)
      const y = -radius * Math.sin(lat)
      const z = radius * Math.cos(lat) * Math.cos(lon)
      return { x: cx + x, y: cy + y, z }
    }

    let raf = 0
    const t0 = performance.now()

    const render = (now: number) => {
      const t = (now - t0) / 1000
      const yaw = (t * 10) % 360 // 10°/s — rotação lenta

      ctx.clearRect(0, 0, width, height)

      // Halo externo (glow ambiente)
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.5)
      glow.addColorStop(0, 'rgba(210,255,40,0.08)')
      glow.addColorStop(0.6, 'rgba(210,255,40,0.02)')
      glow.addColorStop(1, 'rgba(210,255,40,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // Sombra interna (volumetria)
      const shade = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.25,
        0,
        cx,
        cy,
        radius,
      )
      shade.addColorStop(0, 'rgba(30,45,32,0.3)')
      shade.addColorStop(1, 'rgba(8,9,8,0)')
      ctx.fillStyle = shade
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()

      // Contorno do globo
      ctx.strokeStyle = 'rgba(210,255,40,0.22)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Paralelos (latitudes) — linhas horizontais fixas
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath()
        let first = true
        for (let lon = 0; lon <= 360; lon += 4) {
          const p = project(lat, lon, yaw)
          const alpha = p.z > 0 ? 0.12 : 0.04
          ctx.strokeStyle = `rgba(210,255,40,${alpha})`
          if (first) {
            ctx.moveTo(p.x, p.y)
            first = false
          } else {
            ctx.lineTo(p.x, p.y)
          }
        }
        ctx.stroke()
      }

      // Meridianos (longitudes) — rotacionam com yaw
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath()
        let first = true
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lon, yaw)
          const alpha = p.z > 0 ? 0.18 : 0.05
          ctx.strokeStyle = `rgba(210,255,40,${alpha})`
          if (first) {
            ctx.moveTo(p.x, p.y)
            first = false
          } else {
            ctx.lineTo(p.x, p.y)
          }
        }
        ctx.stroke()
      }

      // Hubs pulsantes
      HUBS.forEach((hub, i) => {
        const p = project(hub.lat, hub.lon, yaw)
        if (p.z < 0) return // hemisfério oposto — esconde
        const pulse = 0.5 + 0.5 * Math.sin((t + i * 0.6) * Math.PI * 1.2)
        const frontness = Math.max(0, p.z / radius) // 0..1

        // Glow
        const r = 4 + pulse * 4 + frontness * 3
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3)
        glowGrad.addColorStop(0, `rgba(210,255,40,${0.5 * frontness})`)
        glowGrad.addColorStop(1, 'rgba(210,255,40,0)')
        ctx.fillStyle = glowGrad
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2)
        ctx.fill()

        // Núcleo
        ctx.fillStyle = `rgba(210,255,40,${0.85 + frontness * 0.15})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2 + frontness * 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      if (!reduce) raf = requestAnimationFrame(render)
    }

    if (reduce) {
      render(performance.now())
    } else {
      raf = requestAnimationFrame(render)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
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
