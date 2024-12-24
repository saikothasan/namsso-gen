import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is CC Generator?",
      answer: "CC Generator is a tool that generates valid credit card numbers for testing purposes. These numbers pass basic validation checks but are not connected to real accounts or usable for actual transactions."
    },
    {
      question: "Is it legal to use CC Generator?",
      answer: "Yes, it's legal to use CC Generator for legitimate testing and development purposes. However, it's illegal to use these numbers for fraudulent activities or attempt to make real purchases."
    },
    {
      question: "Can I use the generated numbers for real transactions?",
      answer: "No, the generated numbers are not connected to real accounts and cannot be used for actual transactions. They are intended for testing purposes only."
    },
    {
      question: "How does CC Generator work?",
      answer: "CC Generator uses algorithms to create numbers that follow the structure and validation rules of real credit card numbers, including the Luhn algorithm for the check digit."
    },
    {
      question: "What formats can I export the generated numbers in?",
      answer: "CC Generator supports exporting generated numbers in various formats, including plain text (CHECKER), CSV, JSON, and XML."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

