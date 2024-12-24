import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h5 className="text-lg font-semibold mb-4">About</h5>
            <p className="text-muted-foreground">CC Generator is a tool for generating test credit card numbers for development and testing purposes.</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:underline">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact</h5>
            <p className="text-muted-foreground">For any inquiries, please email us at support@ccgenerator.com</p>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CC Generator. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

