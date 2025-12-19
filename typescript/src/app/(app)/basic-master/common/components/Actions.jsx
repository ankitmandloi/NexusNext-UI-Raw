// Actions.jsx
'use client'

import React from 'react'
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/16/solid'

function DeleteIcon({ className }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
    </svg>
  )
}

/**
 * Actions
 * Props:
 *  - onView: function
 *  - onEdit: function
 *  - onDelete: function
 *
 * Renders a <ul> with three action items that match the look / hover states
 * from your file (view/edit/delete).
 */
export default function Actions({ onView, onEdit, onDelete }) {
  const variantBase =
    'inline-flex items-center justify-center w-8 h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all duration-150 ease-in-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900'

  const styles = {
    view: `${variantBase} hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10`,
    edit: `${variantBase} hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 dark:hover:text-amber-400 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/10`,
    delete: `${variantBase} hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:hover:text-red-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10`,
  }

  return (
    <ul className="flex items-center justify-center gap-3 m-0 p-0 list-none">
      <li>
        <button
          type="button"
          title="View"
          aria-label="View"
          onClick={onView}
          className={styles.view}
        >
          <EyeIcon className="w-4 h-4" aria-hidden="true" />
        </button>
      </li>

      <li>
        <button
          type="button"
          title="Edit"
          aria-label="Edit"
          onClick={onEdit}
          className={styles.edit}
        >
          <PencilSquareIcon className="w-4 h-4" aria-hidden="true" />
        </button>
      </li>

      <li>
        <button
          type="button"
          title="Delete"
          aria-label="Delete"
          onClick={onDelete}
          className={styles.delete}
        >
          <DeleteIcon className="w-4 h-4" />
        </button>
      </li>
    </ul>
  )
}
