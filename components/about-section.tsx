'use client'

import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLayoutEffect, useRef, useState } from 'react'
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
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const sequenceRef = useRef<HTMLDivElement | null>(null)
  const sequenceWidthRef = useRef(0)

  const SPEED = 40 // px por segundo (ajuste para mudar velocidade)

  // Mede a largura total da sequência
  useLayoutEffect(() => {
    if (sequenceRef.current) {
      sequenceWidthRef.current = sequenceRef.current.scrollWidth / 2
    }
  }, [])

  // Loop de animação manual
  useAnimationFrame((t, delta) => {
    if (!sequenceWidthRef.current) return
    if (isHovered || isDragging) return // pausa quando hover ou drag

    const moveBy = (SPEED * delta) / 1000
    let newX = x.get() - moveBy

    // Loop infinito sem pulo visual
    if (newX <= -sequenceWidthRef.current) {
      newX += sequenceWidthRef.current
    }

    x.set(newX)
  })

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const handleDragStart = () => setIsDragging(true)
  const handleDragEnd = () => setIsDragging(false)

  // Duplicamos para criar o loop infinito
  const duplicatedCompanies = [...companies, ...companies]

  return (
    <div
      className="mb-24 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="text-2xl font-bold text-center mb-8">
        Cases de Sucesso
      </h3>

      <div className="relative">
        {/* Gradiente nas bordas */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          ref={sequenceRef}
          className="flex gap-12 cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragElastic={0.001}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {duplicatedCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0 w-40 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-[#050505]">
            {/* Fundo em grid */}
      <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,243,255,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,243,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-primary mr-4" />
            <span className="text-primary font-semibold uppercase tracking-wide">Sobre Nós</span>
            <div className="w-12 h-0.5 bg-primary ml-4" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Excelência em Segurança
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              A <b style={{color: 'white'}}>KATRINASEC</b> foi fundada com uma missão simples: tornar a cibersegurança acessível,
              eficaz e personalizada para as necessidades específicas de cada organização. Acreditamos que
              uma segurança robusta não deve ser um luxo reservado apenas para grandes empresas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nossa equipe de profissionais de segurança certificados combina profundo conhecimento técnico
              com visão de negócios para fornecer soluções que não apenas protegem, mas também impulsionam
              o crescimento. De startups a big techs, ajudamos organizações
              de diversos setores a construir posturas de segurança robustas.
            </p>

            {/* Key Points */}
            <div className="space-y-3 pt-4">
              {[
                'Conhecimento especializado e certificações líderes do setor',
                'Abordagem proativa para detecção e prevenção de ameaças',
                'Soluções personalizadas para empresas de todos os portes',
                'Inovação contínua e adaptação a novas ameaças'
              ].map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-full aspect-square">
              <div className="absolute inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl" />
              <div className="relative z-10 w-full h-full flex items-center justify-center bg-muted/20 rounded-2xl border border-border/50">
                {/* Using a different visual approach instead of duplicate image */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                      <img
                        src="/about-us.png"
                        alt="Katrinasec About Us"
                        className="w-full h-full object-cover"
                      />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Companies Marquee Section (substituindo Stats) */}
        <CompaniesMarquee />

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Os princípios que guiam cada decisão que tomamos e cada solução que entregamos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}