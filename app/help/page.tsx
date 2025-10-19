"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, CreditCard, FileText, Users, MessageCircle, ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of Silly Nutrition",
      articles: 8,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Questions about pricing and payments",
      articles: 6,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: FileText,
      title: "Plans & Features",
      description: "Understanding your nutrition plans",
      articles: 12,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Managing your account settings",
      articles: 5,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const popularArticles = [
    { title: "How do I get started with my first plan?", views: 1234 },
    { title: "What's the difference between Standard and Advanced questionnaires?", views: 987 },
    { title: "Can I update my plan after purchase?", views: 856 },
    { title: "How do I cancel my subscription?", views: 743 },
    { title: "What payment methods do you accept?", views: 621 },
    { title: "How long does it take to receive my plan?", views: 589 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold">Silly Nutrition</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">How Can We Help You?</h1>
          <p className="text-xl text-gray-600 mb-8">Search our knowledge base or browse categories below</p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-6 text-lg rounded-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <button
                  key={index}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all text-left group hover:border-orange-500 border-2 border-transparent"
                >
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.articles} articles</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                </button>
              )
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Articles</h2>
            <div className="bg-white rounded-2xl shadow-lg divide-y">
              {popularArticles.map((article, index) => (
                <button
                  key={index}
                  className="w-full p-5 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{article.views.toLocaleString()} views</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0 ml-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-br from-orange-50 to-white rounded-2xl p-12 text-center">
            <MessageCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
