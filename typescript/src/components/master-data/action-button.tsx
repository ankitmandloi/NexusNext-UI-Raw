/**
 * Master Data Action Button Component
 * 
 * Reusable action button for View, Edit, Delete operations
 * Used in all master data table rows
 */

import React from 'react'

interface ActionButtonProps {
  children: React.ReactNode
  variant: 'view' | 'edit' | 'delete'
  title: string
  onClick?: () => void
}

export function ActionButton({
  children,
  variant,
  title,
  onClick,
}: ActionButtonProps) {
  const variantStyles = {
    view: 'hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10',
    edit: 'hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 dark:hover:text-amber-400 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/10',
    delete: 'hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:hover:text-red-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10',
  }

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        w-8 h-8 rounded-md
        border border-zinc-200 dark:border-zinc-700
        bg-white dark:bg-zinc-800
        text-zinc-500 dark:text-zinc-400
        transition-all duration-150 ease-in-out
        hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900
        ${variantStyles[variant]}
      `}
    >
      {children}
    </button>
  )
}

