'use client'

import * as ToggleGroup from '@radix-ui/react-toggle-group'

type Option = {
  id: string
  value: string
}

interface SizeToggleGroupProps {
  options: Option[]
}

export function SizeToggleGroup({ options }: SizeToggleGroupProps) {
  return (
    <ToggleGroup.Root type="single" className="mt-4 flex items-center gap-4">
      {options?.map((opt) => (
        <ToggleGroup.Item
          key={opt.id}
          value={opt.id}
          className="h-[40px] w-[40px] rounded-lg border-2 border-zinc-300 data-[state=on]:border-orange-500 transition-colors"
        >
          <span className="text-lg text-zinc-900">{opt.value}</span>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
