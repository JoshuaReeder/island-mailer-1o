"use client"

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void
}

const prompts = ["How much does it cost?", "How long does it take?", "Show me an example", "Request quote"]

export default function QuickPrompts({ onSelectPrompt }: QuickPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3 mb-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelectPrompt(prompt)}
          className="px-4 py-2 rounded-full border border-gold text-gold bg-card transition-smooth hover:bg-gold hover:text-white hover:shadow-md min-h-[44px] text-lg"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
