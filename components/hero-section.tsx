
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, ArrowRight, Mail, CheckCircle } from 'lucide-react'
import WaveBackground from './wave'

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <WaveBackground />
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/80 to-background/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2 text-accent text-[#ffffff]"
              >
                <Shield className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Offensive Security
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold fix-letter-g"
              >
                <span
                  data-text="Proteja"
                  className="digital-glitch text-[25px] font-bold font-jetbrains bg-gradient-to-r from-[#007BFF] to-[#00E3C2] bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(0,157,255,0.4)] tracking-[1px]"
                >Proteja</span> Seu Futuro
                  Digital
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-xl"
              >
                A <b style={{color: 'white'}}>KATRINASEC</b> é especializada em Segurança Ofensiva.
                Nossos testes manuais e profundos simulam ataques reais, explorando vulnerabilidades que escapam das ferramentas automatizadas.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white group"
              >
                <Link href="#services">
                  Explorar Serviços
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/50 text-primary hover:bg-primary/10 group"
              >
                <Link href="#contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Entre em Contato
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-8 border-t border-border/50"
            >
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold gradient-text">38+</div>
                  <div className="text-xs text-muted-foreground">Clientes Protegidos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">1070+</div>
                  <div className="text-xs text-muted-foreground">Vulnerabilidades Reportadas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">Equipe</div>
                  <div className="text-xs text-muted-foreground">Certificada</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Logo/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="/hurricane-hero.png"
                  alt="KatrinaSec Hero"
                  width={800}
                  height={600}
                  className="object-contain filter drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
