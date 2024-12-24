import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
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
  ]

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
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

