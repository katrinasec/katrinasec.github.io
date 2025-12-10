'use client'

import { useEffect, useRef } from 'react'

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let w = canvas.width
    let h = canvas.height

    const xGap = 25
    const yGap = 40
    let points: any[][] = []

    let mouse = { x: -1000, y: -1000 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    // gerar grid
    function initGrid() {
      points = []
      for (let x = 0; x < w + xGap; x += xGap) {
        let row = []
        for (let y = 0; y < h + yGap; y += yGap) {
          row.push({ x, y, offsetX: 0, offsetY: 0, force: 0 })
        }
        points.push(row)
      }
    }

    function animate(t: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      ctx.shadowBlur = 0

      points.forEach((col, ci) => {
        col.forEach((p, ri) => {
          let angle = (t * 0.001 + ci * 0.3) * 0.8
          p.offsetX = Math.sin(angle + ri * 0.3) * 20
          p.offsetY = Math.cos(angle + ci * 0.3) * 10

          let dx = mouse.x - p.x
          let dy = mouse.y - p.y
          let dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 200) {
            let force = 1 - dist / 200
            p.offsetX += (dx / dist) * 80 * force
            p.offsetY += (dy / dist) * 40 * force
            p.force = force
          } else {
            p.force = 0
          }
        })
      })

      points.forEach((col) => {
        for (let ri = 0; ri < col.length - 1; ri++) {
          let p1 = col[ri]
          let p2 = col[ri + 1]

          let baseOpacity = 0.15
          let maxOpacity = 0.6
          let localOpacity = baseOpacity + Math.max(p1.force, p2.force) * (maxOpacity - baseOpacity)

          ctx.strokeStyle = `rgba(0, 157, 255, ${localOpacity})`
          ctx.shadowColor = 'rgba(0, 157, 255, 0.2)'
          ctx.shadowBlur = 15 * Math.max(p1.force, p2.force)

          ctx.beginPath()
          ctx.moveTo(p1.x + p1.offsetX, p1.y + p1.offsetY)
          ctx.lineTo(p2.x + p2.offsetX, p2.y + p2.offsetY)
          ctx.stroke()
        }
      })

      requestAnimationFrame(animate)
    }

    initGrid()
    animate(0)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      w = canvas.width
      h = canvas.height
      initGrid()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}