import CCGenerator from '@/components/CCGenerator'
import Features from '@/components/Features'
import About from '@/components/About'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CCGenerator />
      <About />
      <Features />
      <FAQ />
    </div>
  )
}

