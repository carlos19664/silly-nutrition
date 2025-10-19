"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { faqResponses, getFAQResponse } from "./faq-responses"
import { supportProcesses } from "./support-processes"
import { Search, Clock, CheckCircle, AlertCircle, User } from "lucide-react"

// Mock support tickets for demonstration
const mockTickets = [
  {
    id: "TK-001",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Can't download meal plan PDF",
    status: "open",
    priority: "medium",
    created: "2024-01-15T10:30:00Z",
    lastUpdate: "2024-01-15T14:20:00Z",
    category: "technical",
  },
  {
    id: "TK-002",
    customer: "Mike Chen",
    email: "mike@example.com",
    subject: "Refund request - not satisfied",
    status: "in-progress",
    priority: "high",
    created: "2024-01-14T16:45:00Z",
    lastUpdate: "2024-01-15T09:15:00Z",
    category: "refund",
  },
  {
    id: "TK-003",
    customer: "Emma Wilson",
    email: "emma@example.com",
    subject: "Workout too difficult - need adjustment",
    status: "resolved",
    priority: "low",
    created: "2024-01-13T11:20:00Z",
    lastUpdate: "2024-01-14T13:30:00Z",
    category: "plan",
  },
]

export function SupportDashboard() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFAQ, setSelectedFAQ] = useState<string>("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTickets = mockTickets.filter(
    (ticket) =>
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#F1EBDD] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E4E78] mb-2">Support Dashboard</h1>
          <p className="text-gray-600">Manage customer support tickets and resources</p>
        </div>

        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="faq">FAQ Responses</TabsTrigger>
            <TabsTrigger value="processes">Processes</TabsTrigger>
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
          </TabsList>

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-[#1E4E78] hover:bg-[#1E4E78]/90">New Ticket</Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Tickets List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#1E4E78]">Support Tickets</CardTitle>
                    <CardDescription>{filteredTickets.length} tickets found</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedTicket === ticket.id ? "bg-[#F1EBDD] border-[#F4B728]" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedTicket(ticket.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(ticket.status)}
                              <span className="font-semibold text-[#1E4E78]">{ticket.id}</span>
                              <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(ticket.created).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">{ticket.subject}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="w-3 h-3 mr-1" />
                            {ticket.customer} • {ticket.email}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Ticket Details */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#1E4E78]">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Send FAQ Response
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Process Refund
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Cancel Subscription
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Escalate to Manager
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-[#1E4E78]">Response Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="refund">Refund Confirmation</SelectItem>
                        <SelectItem value="cancel">Cancellation</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="general">General Response</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea placeholder="Type your response..." className="mt-3" rows={4} />
                    <Button className="w-full mt-3 bg-[#F4B728] hover:bg-[#E5A61F] text-[#1E4E78]">
                      Send Response
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* FAQ Responses Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E4E78]">FAQ Response Library</CardTitle>
                <CardDescription>Pre-written responses to common customer questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Select value={selectedFAQ} onValueChange={setSelectedFAQ}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select FAQ topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(faqResponses).map(([key, faq]) => (
                          <SelectItem key={key} value={key}>
                            {faq.question}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Button className="bg-[#1E4E78] hover:bg-[#1E4E78]/90">Copy Response</Button>
                  </div>
                </div>

                {selectedFAQ && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-[#1E4E78] mb-3">{getFAQResponse(selectedFAQ)?.question}</h3>
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: getFAQResponse(selectedFAQ)?.answer || "",
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Processes Tab */}
          <TabsContent value="processes" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E4E78]">Refund Process</CardTitle>
                  <CardDescription>Step-by-step refund handling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supportProcesses.refundProcess.steps.map((step) => (
                      <div key={step.step} className="flex space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-[#F4B728] text-[#1E4E78] rounded-full flex items-center justify-center text-sm font-semibold">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1E4E78]">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          <p className="text-xs text-gray-500">Timeframe: {step.timeframe}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E4E78]">Cancellation Process</CardTitle>
                  <CardDescription>Subscription cancellation workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supportProcesses.cancellationProcess.steps.map((step) => (
                      <div key={step.step} className="flex space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-[#F4B728] text-[#1E4E78] rounded-full flex items-center justify-center text-sm font-semibold">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1E4E78]">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          <p className="text-xs text-gray-500">Timeframe: {step.timeframe}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E4E78]">Escalation Guidelines</CardTitle>
                <CardDescription>When and how to escalate support issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {supportProcesses.escalationProcess.levels.map((level) => (
                    <div key={level.level} className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-[#1E4E78] mb-2">
                        Level {level.level}: {level.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                      <p className="text-xs text-gray-500 mb-2">Response: {level.responseTime}</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {level.handles.slice(0, 3).map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E4E78]">Email Templates</CardTitle>
                <CardDescription>Ready-to-use email templates for common support scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#1E4E78]">Available Templates</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Refund Confirmation Email
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Cancellation Confirmation
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Technical Support Response
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        General Support Response
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E4E78] mb-4">Template Preview</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Select a template from the left to preview its content and customize it for your response.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
