
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Shield,
  MessageCircle,
  CheckCircle
} from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Contato',
    value: '+55 (11) 94539-0284'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contato@katrinasec.com'
  }
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
        access_key: '1c8a2809-c08f-4096-888c-ecb1e732ba9d',
        ...formData,
        from_name: formData.name,
        subject: formData.subject || 'Novo contato pelo site',
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: "Sua mensagem foi enviada!",
          description: "Nós iremos retornar em breve.",
        })
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPhoneBR = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    const ddd = digits.slice(0, 2);
    const parte1 = digits.slice(2, 7); 
    const parte2 = digits.slice(7, 11);

    if (digits.length <= 2) {
      return ddd;
    }

    if (digits.length <= 7) {
      return `(${ddd}) ${digits.slice(2)}`;
    }

    return `(${ddd}) ${parte1}-${parte2}`;
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatPhoneBR(raw);

    setFormData(prev => ({
      ...prev,
      phone: formatted,
    }));
  }

  return (
    <section id="contact" className="py-24 bg-muted/20">
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
            <span className="text-primary font-semibold uppercase tracking-wide">Entre em Contato</span>
            <div className="w-12 h-0.5 bg-primary ml-4" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Proteger
            <span className="block gradient-text">Seu Negócio?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Vamos Conversar</h3>
              <p className="text-muted-foreground mb-8">
                Nossos especialistas estão prontos para discutir seus desafios específicos 
                e fornecer soluções personalizadas. Entre em contato por meio de qualquer um dos canais abaixo.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 card-glow hover:border-primary/50 transition-all duration-300 group">
                    <CardContent className="space-y-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg p-2 group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-full h-full text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{info.title}</h4>
                        <p className="text-sm font-medium">{info.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>      

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="card-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>Nos envie uma Mensagem</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nome"
                        required
                        className="pl-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@exemplo.com"
                        required
                        className="pl-4"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Empresa"
                        className="pl-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="(11) 99999-9999"
                        className="pl-4"
                        inputMode="numeric"
                        maxLength={15}
                        onKeyDown={(e) => {
                          const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                          if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Em que podemos ajudar?"
                      required
                      className="pl-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Fale-nos sobre as suas necessidades de segurança..."
                      rows={5}
                      required
                      className="pl-4 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    {isSubmitting ? (
                      <span>Enviando...</span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensagem
                      </span>
                    )}
                  </Button>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Respeitamos a sua privacidade e nunca compartilharemos suas informações.</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
