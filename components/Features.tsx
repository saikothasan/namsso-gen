import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Shield, Zap, FileJson, List, Download } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Multiple Generation Modes",
      description: "Generate cards by type or specific BIN"
    },
    {
      icon: <List className="h-8 w-8 text-primary" />,
      title: "Mass BIN Generation",
      description: "Generate cards from a list of BINs"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure",
      description: "All generated numbers are fake and cannot be used for real transactions"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Fast Generation",
      description: "Generate up to 100 credit card numbers in seconds"
    },
    {
      icon: <FileJson className="h-8 w-8 text-primary" />,
      title: "Multiple Formats",
      description: "Export generated numbers in various formats including CSV, JSON, and XML"
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "Easy Export",
      description: "Copy to clipboard or download generated cards with one click"
    }
  ]

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {feature.icon}
                <span className="ml-2">{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

