import { Header } from '@/components/Header'
import { Hero } from '@/components/sections/Hero'
import { TrustedBrands } from '@/components/sections/TrustedBrands'
import { About } from '@/components/sections/About'
import { Desenvolvimento } from '@/components/sections/Desenvolvimento'
import { StackTecnico } from '@/components/sections/StackTecnico'
import { Blockchain } from '@/components/sections/Blockchain'
import { VapourStatement } from '@/components/sections/VapourStatement'
import { Process } from '@/components/sections/Process'
import { Cases } from '@/components/sections/Cases'
import { Consulting } from '@/components/sections/Consulting'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'
import { GradientSplitter } from '@/components/ui/GradientSplitter'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <TrustedBrands />
        <GradientSplitter />
        <About />
        <GradientSplitter />
        <Desenvolvimento />
        <GradientSplitter />
        <StackTecnico />
        <GradientSplitter />
        <Blockchain />
        <GradientSplitter />
        <VapourStatement />
        <GradientSplitter />
        <Process />
        <GradientSplitter />
        <Cases />
        <GradientSplitter />
        <Consulting />
        <GradientSplitter />
        <Testimonials />
        <GradientSplitter />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
