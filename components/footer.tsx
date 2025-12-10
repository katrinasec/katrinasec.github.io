'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Mail, 
  Phone, 
  ArrowRight,
  Linkedin,
  Instagram,
} from 'lucide-react'

const services = [
  { name: 'Penetration Testing', href: '#services' },
  { name: 'Engenharia Social', href: '#services' },
  { name: 'Code Review', href: '#services' },
]

const company = [
  { name: 'Sobre Nós', href: '#about' },
  { name: 'Serviços', href: '#services' },
  { name: 'Contato', href: '#contact' },
]

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/katrinasec/' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/katrinasecteam/' },
  { name: 'Phone', icon: Phone, href: 'https://wa.me/+555511945390284?text=Olá,%20gostaria%20de%20explorar%20as%20soluções%20que%20a%20KatrinaSec%20oferece.%20Poderia%20me%20ajudar?' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          {/* FLEX: conteúdo à esquerda + imagem à direita */}
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            
            {/* CONTEÚDO (3 colunas) */}
            <div className="grid md:grid-cols-3 gap-8 flex-1">
              
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="#home" className="flex items-center mb-4">
                  <span className="text-[20.5px] font-bold font-jetbrains bg-gradient-to-r from-[#007BFF] to-[#00E3C2] bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(0,157,255,0.4)] tracking-[1px]">
                    KATRINASEC
                  </span>
                </Link>
                
                <p className="text-muted-foreground mb-6 max-w-md">
                  Empresa especializada em Segurança Ofensiva. Com análises e tecnologia avançada,
                  simulamos ataques reais para identificar e mitigar vulnerabilidades,
                  garantindo a segurança das suas operações.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">contato@katrinasec.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">+55 (11) 94539-0284</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
                    >
                      <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Services Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold mb-4 flex items-center">
                  <Shield className="w-4 h-4 text-primary mr-2" />
                  Serviços
                </h3>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service.name}>
                      <Link
                        href={service.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                      >
                        <span>{service.name}</span>
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold mb-4">
                  Empresa
                </h3>
                <ul className="space-y-3">
                  {company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                      >
                        <span>{item.name}</span>
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>

            {/* IMAGEM À DIREITA COM OPACIDADE BAIXA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="hidden lg:flex items-center justify-end flex-shrink-0"
            >
              <div className="relative w-full max-w-sm opacity-30">
                <Image
                  src="/fundo-cinza-metade.png"
                  alt="KatrinaSec Footer"
                  width={100}
                  height={0}
                  className="object-contain pointer-events-none select-none"
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} KATRINASEC. All rights reserved. Protecting your digital future.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}