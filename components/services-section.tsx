
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Search, 
  Lock, 
  Eye, 
  FileCheck, 
  Users, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Fish,
  Code
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Shield,
    title: 'Penetration Testing',
    description: 'Replicamos o comportamento de invasores, adaptando os vetores conforme o contexto de cada ambiente.',
    features: ['Pentest Web', 'Pentest em APIs', 'Pentest de Infraestrutura', 'Pentest Mobile'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Fish,
    title: 'Engenharia Social',
    description: 'Realizamos campanhas realistas de phishing e simulações de ataque humano, testando o fator mais crítico da segurança: as pessoas.',
    features: ['Phishing Direcionado (Spear Phishing)', 'Vishing e Pretexting', 'Relatórios de comportamento', 'Conscientização dos usuários'],
    color: 'from-cyan-500 to-teal-500'
  },
  {
    icon: Code,
    title: 'Code Review',
    description: 'Analisamos o código‑fonte com olhar ofensivo para identificar falhas de lógica, autenticação e autorização.',
    features: ['Revisão manual de código crítico', 'Identificação de lógicas inseguras', 'Identificação de dependências vulneráveis', 'Recomendação técnica'],
    color: 'from-teal-500 to-blue-500'
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="services" className="relative py-24 bg-[#050505] overflow-hidden"
>
      {/* Fundo em grid */}
      <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,243,255,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,243,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-primary mr-4" />
            <span className="text-primary font-semibold uppercase tracking-wide">Nossos Serviços</span>
            <div className="w-12 h-0.5 bg-primary ml-4" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Segurança Ofensiva
            <span className="block gradient-text">Inteligente</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aplicamos técnicas avançadas de segurança para antecipar ameaças e proteger o que sustenta suas operações.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Card className="group h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 card-glow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Icon with gradient */}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-full h-full text-white" />
                    </div>

                    {/* Title and Description */}
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button 
                      asChild
                      variant="ghost" 
                      size="sm"
                      className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-colors mt-6"
                    >
                      <a href="#contact">
                        Saiba Mais
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Sua segurança está preparada para o próximo nível?
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary/50 text-primary hover:bg-primary/10 group"
          >
            <Link href="#contact">
              <ArrowRight className="w-4 h-4 mr-2" />
              Entre em Contato
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
