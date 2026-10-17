import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    let frame = 0
    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      s: Math.random() * 0.25 + 0.05,
    }))

    function resize() {
      if (!canvas) {
        return
      }
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }

    function draw() {
      if (!canvas || !context) {
        return
      }
      context.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.y -= particle.s / 400
        if (particle.y < 0) {
          particle.y = 1
        }
        context.beginPath()
        context.fillStyle = `rgba(192, 132, 252, ${0.18 + particle.r / 8})`
        context.arc(
          particle.x * canvas.width,
          particle.y * canvas.height,
          particle.r * window.devicePixelRatio,
          0,
          Math.PI * 2,
        )
        context.fill()
      })
      frame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  )
}
