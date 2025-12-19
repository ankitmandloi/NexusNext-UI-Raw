'use client'

import React from 'react'
import { Pagination, PaginationList } from '@/components/pagination'

export default function CommonPagination({ currentPage, totalPages, onPageChange }) {
  // Calculate page numbers to show (max 5 visible)
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, start + 4)
    const adjustedStart = Math.max(1, end - 4)
    
    return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i)
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="relative flex items-center justify-center border-t border-zinc-950/5 dark:border-white/5 px-4 py-3 shrink-0">
      
      
      <Pagination>
        {/* Previous Button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 
            hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800
            disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
        >
          ← Previous
        </button>

        {/* First page if not visible */}
        {!visiblePages.includes(1) && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 mx-1 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            >
              1
            </button>
            {visiblePages[0] > 2 && <span className="px-2 text-zinc-400">...</span>}
          </>
        )}

        {/* Page Numbers */}
        <PaginationList>
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 mx-1 text-sm rounded-md transition-colors ${
                page === currentPage
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {page}
            </button>
          ))}
        </PaginationList>

        {/* Last page if not visible */}
        {!visiblePages.includes(totalPages) && totalPages > 1 && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="px-2 text-zinc-400">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 mx-1 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 
            hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800
            disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
        >
          Next →
        </button>
      </Pagination>
    </div>
  )
}
