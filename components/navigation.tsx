
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, Target, Users, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigationItems = [
  { name: 'Início', href: '#home', icon: Shield },
  { name: 'Serviços', href: '#services', icon: Target },
  { name: 'Sobre', href: '#about', icon: Users },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center">
            <div className="relative w-16 h-16 mr-0">
              <Image
                src="/logo.png"
                alt="KatrinaSec Navigation Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[26.5px] font-bold font-jetbrains bg-gradient-to-r from-[#007BFF] to-[#00E3C2] bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(0,157,255,0.4)] tracking-[1px]">KATRINASEC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <span className="flex items-center space-x-1">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="#contact"
              className="
                relative inline-flex items-center justify-center
                whitespace-nowrap text-sm font-bold font-jetbrains
                h-9 px-4 rounded-full
                overflow-hidden
                transition-all duration-300
                active:scale-95
                tracking-[1px]
                group
                border border-[#00E3C2]
                drop-shadow-[0_0_8px_rgba(0,157,255,0.4)]
                hover:drop-shadow-[0_0_15px_rgba(0,157,255,0.7)]
                glitch-button
              "
            >
              {/* Fundo gradiente (desaparece no hover) */}
              <span
                className="
                  absolute inset-0 
                  bg-gradient-to-r from-[#007BFF] to-[#00E3C2]
                  rounded-full
                  group-hover:opacity-0
                  transition-opacity duration-300
                "
              />

              {/* Texto branco (desaparece no hover) */}
              <span
                className="
                  relative z-10
                  text-white
                  group-hover:opacity-0
                  transition-opacity duration-300
                "
              >
                Contato
              </span>

              {/* Texto gradiente (aparece no hover) */}
              <span
                className="
                  absolute inset-0 flex items-center justify-center z-10
                  bg-gradient-to-r from-[#007BFF] to-[#00E3C2]
                  bg-clip-text text-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Contato
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border mt-2 py-4"
            >
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white w-full"
                >
                  <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                    Contato
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
