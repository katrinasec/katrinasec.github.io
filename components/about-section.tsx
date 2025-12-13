'use client'

import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Award, 
  Shield, 
  Users, 
  Globe,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

const motion = lazy(() => import('framer-motion').then(mod => ({ 
  default: { 
    div: mod.motion.div 
  } 
})))

const useMotionValue = lazy(() => import('framer-motion').then(mod => ({ default: mod.useMotionValue })))
const useAnimationFrame = lazy(() => import('framer-motion').then(mod => ({ default: mod.useAnimationFrame })))

const companies = [
  { name: 'Coca-Cola', logo: '/companies/coca-cola-logo.svg' },
  { name: 'Nestle', logo: '/companies/nestle-logo.svg' },
  { name: 'AT&T', logo: '/companies/att-logo.svg' },
  { name: 'BMW Group', logo: '/companies/bmw-logo.svg' },
  { name: 'IBM', logo: '/companies/ibm-logo.svg' },
  { name: 'Red Bull', logo: '/companies/red-bull-logo.svg' },
  { name: 'Sony', logo: '/companies/sony-logo.svg' },
  { name: 'Henkel', logo: '/companies/Henkel-Logo.png' },
  { name: 'Itau', logo: '/companies/itau-logo.avif' },
  { name: 'Priceline', logo: '/companies/priceline-logo.png' },
  { name: 'ifood', logo: '/companies/ifood-logo.png' },
  { name: 'DOD', logo: '/companies/dod-logo.png' },
  { name: 'Dyson', logo: '/companies/dyson-logo.png' },
]

const values = [
  {
    icon: Shield,
    title: 'Segurança Primeiro',
    description: 'Todas as soluções são construídas com a segurança como fundamento, e não como uma reflexão tardia.'
  },
  {
    icon: TrendingUp,
    title: 'Inovação',
    description: 'Nos mantemos à frente das ameaças emergentes com tecnologia e metodologias de ponta.'
  },
  {
    icon: Users,
    title: 'Parceria',
    description: 'Trabalhamos como uma extensão da sua equipe para atingir seus objetivos de segurança.'
  },
  {
    icon: Globe,
    title: 'Alcance Global',
    description: 'Protegendo empresas em todo o mundo com conhecimento especializado.'
  }
]

function CompaniesMarquee() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const duplicatedCompanies = [...companies, ...companies]

  return (
    <div ref={containerRef} className="mb-24 overflow-hidden">
      <h3 className="text-2xl font-bold text-center mb-8">
        Cases de Sucesso
      </h3>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        {isVisible ? (
          <Suspense fallback={<MarqueeStatic companies={duplicatedCompanies} />}>
            <MarqueeAnimated companies={duplicatedCompanies} />
          </Suspense>
        ) : (
          <MarqueeStatic companies={duplicatedCompanies} />
        )}
      </div>
    </div>
  )
}

function MarqueeStatic({ companies }: { companies: typeof companies }) {
  return (
    <div className="flex gap-12 animate-marquee">
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
    </div>
  )
}

function MarqueeAnimated({ companies }: { companies: typeof companies }) {
  const { motion, useMotionValue, useAnimationFrame } = require('framer-motion')
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

export default function AboutSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)


  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1, triggerOnce: true }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,243,255,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,243,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
      />
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center mb-16">Carregando...</div>}>
          {inView && (
            <>
              {/* Header */}
              <div className="text-center mb-16 animate-fade-in">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-0.5 bg-primary mr-4" />
                  <span className="text-primary font-semibold uppercase tracking-wide">Sobre Nós</span>
                  <div className="w-12 h-0.5 bg-primary ml-4" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Excelência em Segurança
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                {/* Left Column */}
                <div className="space-y-6 animate-slide-in-left">
                  <p className="text-muted-foreground leading-relaxed">
                    A <b style={{color: 'white'}}>KATRINASEC</b> foi fundada com uma missão simples: tornar a cibersegurança acessível,
                    eficaz e personalizada para as necessidades específicas de cada organização.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Nossa equipe de profissionais de segurança certificados combina profundo conhecimento técnico
                    com visão de negócios para fornecer soluções que não apenas protegem, mas também impulsionam
                    o crescimento.
                  </p>

                  <div className="space-y-3 pt-4">
                    {[
                      'Conhecimento especializado e certificações líderes do setor',
                      'Abordagem proativa para detecção e prevenção de ameaças',
                      'Soluções personalizadas para empresas de todos os portes',
                      'Inovação contínua e adaptação a novas ameaças'
                    ].map((point) => (
                      <div key={point} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative animate-slide-in-right">
                  <div className="relative w-full h-full aspect-square">
                    <div className="absolute inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center bg-muted/20 rounded-2xl border border-border/50">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="relative w-full h-full overflow-hidden rounded-2xl">
                          <Image
                            src="/about-us.png"
                            alt="Katrinasec About Us"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CompaniesMarquee />

              {/* Values */}
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Os princípios que guiam cada decisão que tomamos
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="animate-fade-in-up">
                    <Card className="h-full p-6 text-center card-glow hover:border-primary/50 transition-all duration-300 group">
                      <CardContent className="space-y-4">
                        <div className="w-12 h-12 mx-auto bg-gradient-to-r from-primary to-accent rounded-lg p-2.5 group-hover:scale-110 transition-transform duration-300">
                          <value.icon className="w-full h-full text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{value.title}</h4>
                          <p className="text-sm text-muted-foreground">{value.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </>
          )}
        </Suspense>
      </div>
    </section>
  )
}
