'use client'

import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/16/solid'

export default function Header({
  title,
  subtitle,
  addLabel = "Add",
  onAdd,
  dropdownOptions = [],
  hideAddButton = false,
}) {
  return (
    <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
      <div className="flex flex-wrap items-end justify-between gap-4">

        {/* LEFT */}
        <div className="max-sm:w-full sm:flex-1">
          <Heading>{title}</Heading>
          {subtitle && (
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {dropdownOptions.length > 0 && (
            <Dropdown>
              <DropdownButton outline>
                Your Data
                <ChevronDownIcon />
              </DropdownButton>

              <DropdownMenu>
                {dropdownOptions.map((item, idx) => (
                  <DropdownItem key={idx} onClick={item.onClick}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}

          {!hideAddButton && (
            <Button color="dark/zinc" onClick={onAdd}>
              <PlusIcon />
              {addLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
