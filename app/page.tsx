import CCGenerator from '@/components/CCGenerator'
import MassBINGenerator from '@/components/MassBINGenerator'
import Features from '@/components/Features'
import About from '@/components/About'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CCGenerator />
      <MassBINGenerator />
      <About />
      <Features />
      <FAQ />
    </div>
  )
}

