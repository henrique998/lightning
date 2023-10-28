import { Search, XCircle } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex items-center gap-3 bg-zinc-50 h-10 w-[360px] rounded-full px-4 border-[1.85px] border-transparent focus-within:border-zinc-300 transition-colors">
      <Search className="h-5 w-5 stroke-zinc-300" />

      <input
        type="text"
        placeholder="camiseta..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 h-full focus:outline-none bg-zinc-50"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="leading-none"
        >
          <XCircle className="h-4 w-4 stroke-zinc-300" />
        </button>
      )}
    </div>
  )
}
