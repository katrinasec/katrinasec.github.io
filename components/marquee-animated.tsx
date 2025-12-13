'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'

interface Company {
  name: string
  logo: string
}

interface MarqueeAnimatedProps {
  companies: Company[]
}

export default function MarqueeAnimated({ companies }: MarqueeAnimatedProps) {
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const sequenceRef = useRef<HTMLDivElement | null>(null)
  const sequenceWidthRef = useRef(0)

  const SPEED = 40

  useLayoutEffect(() => {
    if (sequenceRef.current) {
      sequenceWidthRef.current = sequenceRef.current.scrollWidth / 2
    }
  }, [])

  useAnimationFrame((t: number, delta: number) => {
    if (!sequenceWidthRef.current) return
    if (isHovered || isDragging) return

    const moveBy = (SPEED * delta) / 1000
    let newX = x.get() - moveBy

    if (newX <= -sequenceWidthRef.current) {
      newX += sequenceWidthRef.current
    }

    x.set(newX)
  })

  return (
    <motion.div
      ref={sequenceRef}
      className="flex gap-12 cursor-grab active:cursor-grabbing"
      style={{ x }}
      drag="x"
      dragElastic={0.001}
      dragMomentum={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      {companies.map((company, index) => (
        <div
          key={`${company.name}-${index}`}
          className="flex-shrink-0 w-40 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
        >
          <Image
            src={company.logo}
            alt={company.name}
            width={160}
            height={96}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  )
}
