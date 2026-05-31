"use client"

import { useState, useRef, useEffect } from "react"
import ChatMessage from "./chat-message"
import QuickPrompts from "./quick-prompts"
import ChatForm from "./chat-form"
import { Paperclip, Send } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  showQuickPrompts?: boolean
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  type: "assistant",
  content:
    "Aloha! I'm the Island Mailer Assistant. I help local businesses connect with their Hawaii community through beautiful postcard mailers. How can I help you today?",
  timestamp: new Date(),
  showQuickPrompts: true,
}

const ASSISTANT_RESPONSES: Record<string, string> = {
  cost: "Great question! Our pricing is custom-tailored to your specific needs. Factors like quantity, design complexity, and distribution scope all play a role. I'd love to learn more about your project to give you an accurate quote. Can you share a bit about your business and what you're hoping to achieve?",
  time: "Turnaround depends on your project scope. Typically, designs are ready in 3-5 business days, with printing and delivery taking an additional 1-2 weeks. Rush options are available for urgent campaigns. What's your timeline looking like?",
  example:
    "We've worked with local Hawaii businesses across retail, hospitality, real estate, and services. Our 9×12 postcards feature beautiful island imagery paired with compelling calls-to-action. Each design is customized to reflect your brand's personality. Would you like to discuss a specific type of campaign?",
  quote:
    "Perfect! I'll capture your information so our team can prepare a custom quote. Let me gather a few details about you and your business...",
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickPrompt = (prompt: string) => {
    const userMessage: Message = {
      id: String(messages.length + 1),
      type: "user",
      content: prompt,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    setTimeout(() => {
      let responseText = ""

      if (prompt.toLowerCase().includes("cost")) {
        responseText = ASSISTANT_RESPONSES["cost"]
      } else if (prompt.toLowerCase().includes("time")) {
        responseText = ASSISTANT_RESPONSES["time"]
      } else if (prompt.toLowerCase().includes("example")) {
        responseText = ASSISTANT_RESPONSES["example"]
      } else if (prompt.toLowerCase().includes("quote")) {
        responseText = ASSISTANT_RESPONSES["quote"]
        setShowQuoteForm(true)
      }

      const assistantMessage: Message = {
        id: String(messages.length + 2),
        type: "assistant",
        content: responseText,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: String(messages.length + 1),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: String(messages.length + 2),
        type: "assistant",
        content: `Mahalo for reaching out! I'll make sure our Island Mailer team follows up with you soon. Is there anything else you'd like to know about our postcard mailers?`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleQuoteSubmit = (formData: { name: string; business: string; email: string; location: string }) => {
    const userMessage: Message = {
      id: String(messages.length + 1),
      type: "user",
      content: `Quote Request submitted`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setShowQuoteForm(false)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: String(messages.length + 2),
        type: "assistant",
        content: `Mahalo, ${formData.name}! Your quote request for ${formData.business} has been received. Our team will review and reach out within 24 hours at ${formData.email}. We're excited to help you connect with the ${formData.location} community!`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    }, 800)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-cream mb-4">Chat with Island Mailer</h2>
        <p className="text-sand text-xl lg:text-2xl">Ask questions, request quotes, or learn more about our service</p>
      </div>

      {/* Chat Window */}
      <div className="gradient-navy-warm rounded-[2rem] shadow-2xl border-gradient-gold overflow-hidden flex flex-col h-[600px] sm:h-[750px]">
        {/* Chat Header Bar */}
        <div className="px-8 py-6 border-b border-gold/20 bg-sand/10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full gradient-gold-shine flex items-center justify-center shadow-lg shadow-gold/30">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-xl text-cream">Island Mailer Assistant</p>
            <p className="text-base text-sand">Usually replies instantly</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />
              {message.showQuickPrompts && <QuickPrompts onSelectPrompt={handleQuickPrompt} />}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-navy">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce-dot" />
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce-dot" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce-dot" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}

          {showQuoteForm && <ChatForm onSubmit={handleQuoteSubmit} />}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {!showQuoteForm && (
          <div className="border-t border-gold/20 p-6 bg-sand/5">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputValue)
              }}
              className="flex items-center gap-4"
            >
              <button
                type="button"
                className="p-4 rounded-full text-sand hover:text-gold hover:bg-gold/10 transition-smooth min-h-[56px] min-w-[56px] flex items-center justify-center"
                aria-label="Attach file"
              >
                <Paperclip className="w-7 h-7" />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-6 py-4 rounded-full text-lg sm:text-xl border-2 border-gold/20 bg-navy text-cream placeholder:text-sand/50 focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth min-h-[56px]"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-4 rounded-full gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/40 disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] min-w-[56px] flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-7 h-7" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
