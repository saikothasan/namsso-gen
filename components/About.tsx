import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">About CC Generator</CardTitle>
        <CardDescription className="text-center">Learn more about our credit card generator tool</CardDescription>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>CC Generator is a powerful tool designed to generate valid credit card numbers for testing and development purposes. Our generator uses advanced algorithms to create numbers that pass basic validation checks, making it an ideal solution for developers, QA testers, and businesses looking to test their payment systems.</p>
        <p>Key features of CC Generator include:</p>
        <ul>
          <li>Generation of multiple card types (Visa, Mastercard, American Express, Discover)</li>
          <li>Customizable output formats (CHECKER, CSV, JSON, XML)</li>
          <li>Option to include CVC and expiration date</li>
          <li>Bulk generation capabilities</li>
          <li>Luhn algorithm validation</li>
        </ul>
        <p>Please note that the generated numbers are not real credit card numbers and should not be used for any fraudulent or illegal activities. This tool is intended for educational and testing purposes only.</p>
      </CardContent>
    </Card>
  )
}

