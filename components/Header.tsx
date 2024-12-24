import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CreditCard, Info, Home, FileQuestion, Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background border-b">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex items-center justify-between">
          <li>
            <Link href="/" passHref>
              <Button variant="ghost" className="text-xl font-bold">
                <CreditCard className="mr-2 h-6 w-6" />
                CC Generator
              </Button>
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link href="/" passHref>
              <Button variant="ghost">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button variant="ghost">
                <Info className="mr-2 h-4 w-4" />
                About
              </Button>
            </Link>
            <Link href="/faq" passHref>
              <Button variant="ghost">
                <FileQuestion className="mr-2 h-4 w-4" />
                FAQ
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

