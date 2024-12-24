'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import { CreditCard, Copy, Download, RefreshCw } from 'lucide-react'

const CARD_TYPES = {
  visa: { prefix: '4', length: [13, 16] },
  mastercard: { prefix: ['51', '52', '53', '54', '55'], length: [16] },
  amex: { prefix: ['34', '37'], length: [15] },
  discover: { prefix: ['6011', '644', '645', '646', '647', '648', '649', '65'], length: [16] },
}

function luhnCheck(num: string) {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x))
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0)
  return sum % 10 === 0
}

function generateCardFromBIN(bin: string, length: number, withCVC: boolean, withDate: boolean) {
  let number = bin
  while (number.length < length - 1) {
    number += Math.floor(Math.random() * 10)
  }

  for (let i = 0; i <= 9; i++) {
    if (luhnCheck(number + i)) {
      number += i
      break
    }
  }

  if (withCVC) {
    number += ` ${Math.floor(Math.random() * 900) + 100}`
  }

  if (withDate) {
    const month = Math.floor(Math.random() * 12) + 1
    const year = new Date().getFullYear() + Math.floor(Math.random() * 5)
    number += ` ${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`
  }

  return number
}

function generateCard(type: keyof typeof CARD_TYPES, withCVC: boolean, withDate: boolean) {
  const cardInfo = CARD_TYPES[type]
  const length = cardInfo.length[Math.floor(Math.random() * cardInfo.length.length)]
  let prefix = Array.isArray(cardInfo.prefix)
    ? cardInfo.prefix[Math.floor(Math.random() * cardInfo.prefix.length)]
    : cardInfo.prefix

  return generateCardFromBIN(prefix, length, withCVC, withDate)
}

export default function CCGenerator() {
  const [generationMode, setGenerationMode] = useState<'type' | 'bin'>('type')
  const [cardType, setCardType] = useState<keyof typeof CARD_TYPES>('visa')
  const [bin, setBin] = useState('')
  const [quantity, setQuantity] = useState(10)
  const [format, setFormat] = useState('CHECKER')
  const [cvc, setCvc] = useState(false)
  const [date, setDate] = useState(false)
  const [generatedCards, setGeneratedCards] = useState<string[]>([])

  const generateCards = () => {
    const cards = Array.from({ length: quantity }, () => {
      if (generationMode === 'bin') {
        return generateCardFromBIN(bin, 16, cvc, date) // Assuming 16 as default length
      } else {
        return generateCard(cardType, cvc, date)
      }
    })
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
    let content = generatedCards.join('\n')
    if (format === 'CSV') {
      content = 'Card Number,CVC,Expiry\n' + generatedCards.map(card => card.replace(/ /g, ',')).join('\n')
    } else if (format === 'JSON') {
      content = JSON.stringify(generatedCards.map(card => {
        const [number, cvc, date] = card.split(' ')
        return { number, cvc, date }
      }), null, 2)
    } else if (format === 'XML') {
      content = '<?xml version="1.0" encoding="UTF-8"?>\n<cards>\n' +
        generatedCards.map(card => {
          const [number, cvc, date] = card.split(' ')
          return `  <card>\n    <number>${number}</number>${cvc ? `\n    <cvc>${cvc}</cvc>` : ''}${date ? `\n    <expiry>${date}</expiry>` : ''}\n  </card>`
        }).join('\n') +
        '\n</cards>'
    }
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `generated_cards.${format.toLowerCase()}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast({
      title: "Cards downloaded",
      description: `The generated card numbers have been downloaded in ${format} format.`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-xl p-8 mb-8"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Generate Credit Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label htmlFor="generationMode" className="text-white">Generation Mode</Label>
          <Select value={generationMode} onValueChange={(value: 'type' | 'bin') => setGenerationMode(value)}>
            <SelectTrigger id="generationMode">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="type">By Card Type</SelectItem>
              <SelectItem value="bin">By BIN</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {generationMode === 'type' ? (
          <div>
            <Label htmlFor="cardType" className="text-white">Card Type</Label>
            <Select value={cardType} onValueChange={(value: keyof typeof CARD_TYPES) => setCardType(value)}>
              <SelectTrigger id="cardType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="mastercard">Mastercard</SelectItem>
                <SelectItem value="amex">American Express</SelectItem>
                <SelectItem value="discover">Discover</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div>
            <Label htmlFor="bin" className="text-white">BIN (first 6-8 digits)</Label>
            <Input
              id="bin"
              value={bin}
              onChange={(e) => setBin(e.target.value)}
              placeholder="Enter BIN"
              className="bg-white text-gray-800"
            />
          </div>
        )}
        <div>
          <Label htmlFor="quantity" className="text-white">Quantity</Label>
          <Slider
            id="quantity"
            min={1}
            max={100}
            step={1}
            value={[quantity]}
            onValueChange={(value) => setQuantity(value[0])}
            className="[&_[role=slider]]:bg-white"
          />
          <span className="text-sm text-white">{quantity}</span>
        </div>
        <div>
          <Label htmlFor="format" className="text-white">Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CHECKER">CHECKER</SelectItem>
              <SelectItem value="CSV">CSV</SelectItem>
              <SelectItem value="JSON">JSON</SelectItem>
              <SelectItem value="XML">XML</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="cvc" checked={cvc} onCheckedChange={setCvc} />
            <Label htmlFor="cvc" className="text-white">CVC</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="date" checked={date} onCheckedChange={setDate} />
            <Label htmlFor="date" className="text-white">Date</Label>
          </div>
        </div>
      </div>
      <Button className="w-full mt-8 bg-white text-purple-500 hover:bg-gray-100" onClick={generateCards}>
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

