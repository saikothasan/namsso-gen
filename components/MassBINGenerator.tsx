'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'
import { CreditCard, Copy, Download } from 'lucide-react'

function generateFromBINList(binList: string[], quantity: number) {
  const generatedCards: string[] = []
  
  for (let i = 0; i < quantity; i++) {
    const randomBIN = binList[Math.floor(Math.random() * binList.length)]
    let card = randomBIN
    while (card.length < 16) {
      card += Math.floor(Math.random() * 10)
    }
    generatedCards.push(card)
  }

  return generatedCards
}

export default function MassBINGenerator() {
  const [binList, setBinList] = useState('')
  const [quantity, setQuantity] = useState(10)
  const [generatedCards, setGeneratedCards] = useState<string[]>([])

  const generateCards = () => {
    const bins = binList.split('\n').map(bin => bin.trim()).filter(bin => bin.length > 0)
    if (bins.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one BIN.",
        variant: "destructive",
      })
      return
    }
    const cards = generateFromBINList(bins, quantity)
    setGeneratedCards(cards)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCards.join('\n'))
    toast({
      title: "Copied to clipboard",
      description: "The generated card numbers have been copied to your clipboard.",
    })
  }

  const downloadCards = () => {
    const content = generatedCards.join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mass_generated_cards.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast({
      title: "Cards downloaded",
      description: "The generated card numbers have been downloaded.",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-xl p-8 mb-8"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Mass BIN Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label htmlFor="binList" className="text-white">BIN List (one per line)</Label>
          <Textarea
            id="binList"
            value={binList}
            onChange={(e) => setBinList(e.target.value)}
            placeholder="Enter BINs, one per line"
            rows={5}
            className="bg-white text-gray-800"
          />
        </div>
        <div>
          <Label htmlFor="quantity" className="text-white">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min={1}
            max={1000}
            className="bg-white text-gray-800"
          />
        </div>
      </div>
      <Button className="w-full mt-8 bg-white text-blue-500 hover:bg-gray-100" onClick={generateCards}>
        <CreditCard className="mr-2 h-4 w-4" /> Generate
      </Button>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: generatedCards.length > 0 ? 1 : 0, height: generatedCards.length > 0 ? 'auto' : 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <Textarea
          className="mb-4 bg-white text-gray-800"
          value={generatedCards.join('\n')}
          readOnly
          rows={10}
        />
        <div className="flex justify-between">
          <Button variant="secondary" onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
          </Button>
          <Button variant="secondary" onClick={downloadCards}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

