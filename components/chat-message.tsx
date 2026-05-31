"use client"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-message-in`}>
      <div
        className={`rounded-2xl px-4 py-3 max-w-[85%] sm:max-w-xs transition-smooth ${
          isUser ? "bg-navy text-white rounded-tr-sm" : "bg-card border-l-4 border-gold rounded-tl-sm shadow-sm"
        }`}
      >
        <p className={`leading-relaxed text-sidebar-border bg-card text-2xl ${isUser ? "text-white" : "text-secondary-navy"}`}>{message.content}</p>
        <span className={`text-xs mt-1.5 block ${isUser ? "text-white/60" : "text-tan"}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  )
}
