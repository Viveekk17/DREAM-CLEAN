import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  const faqs = [
    {
      question: "What is DREAMCLEAN?",
      answer: "DREAMCLEAN is a smart waste management platform that connects citizens with municipal corporations for efficient waste reporting, tracking, and management.",
    },
    {
      question: "How do I report a waste issue?",
      answer: "Simply go to the Citizen Dashboard, click on 'Submit Complaint', upload a photo of the waste issue, add your location (or use GPS), and provide a brief description.",
    },
    {
      question: "How can I track my complaint status?",
      answer: "Visit the 'Track Status' tab in your Citizen Dashboard to see real-time updates on all your submitted complaints - whether they're pending, in progress, or resolved.",
    },
    {
      question: "Why is waste segregation important?",
      answer: "Proper waste segregation helps in efficient recycling, reduces landfill waste, protects the environment, and ensures hazardous materials are disposed of safely.",
    },
    {
      question: "How does the waste classification helper work?",
      answer: "Our waste helper uses AI to identify waste types from photos or descriptions and provides guidance on proper disposal methods and which bin to use.",
    },
    {
      question: "Who can access the Admin Dashboard?",
      answer: "The Admin Dashboard is exclusively for authorized municipal corporation staff who manage and resolve citizen complaints.",
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data privacy seriously. Your personal information is encrypted and only used for complaint management purposes.",
    },
    {
      question: "What types of waste can I report?",
      answer: "You can report any waste-related issues including overflowing bins, illegal dumping, plastic waste, hazardous materials, and general cleanliness concerns.",
    },
  ];

  const segregationInfo = [
    {
      type: "Organic Waste",
      color: "bg-green-500",
      examples: "Food scraps, yard waste, paper",
      disposal: "Green bin - for composting",
    },
    {
      type: "Plastic Waste",
      color: "bg-blue-500",
      examples: "Bottles, bags, containers",
      disposal: "Blue bin - for recycling",
    },
    {
      type: "General Waste",
      color: "bg-gray-500",
      examples: "Non-recyclable items",
      disposal: "Grey bin - for landfill",
    },
    {
      type: "Hazardous Waste",
      color: "bg-red-500",
      examples: "Batteries, electronics, chemicals",
      disposal: "Special collection centers",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about DREAMCLEAN
            </p>
          </div>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>General Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Why Segregation Matters?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Proper waste segregation is crucial for environmental sustainability. It enables 
                efficient recycling, reduces pollution, conserves natural resources, and protects 
                public health. By separating waste at the source, we make it easier for waste 
                management systems to process materials correctly.
              </p>

              <div className="grid gap-4">
                {segregationInfo.map((item) => (
                  <div
                    key={item.type}
                    className="p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${item.color} rounded-full flex-shrink-0`} />
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{item.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          <strong>Examples:</strong> {item.examples}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Disposal:</strong> {item.disposal}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated bg-primary/5 border-2 border-primary">
            <CardContent className="pt-6 text-center space-y-4">
              <h2 className="text-2xl font-bold">Still have questions?</h2>
              <p className="text-muted-foreground">
                Contact our support team for assistance with waste management queries
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
