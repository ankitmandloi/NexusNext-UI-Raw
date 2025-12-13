'use client'

import React from 'react'
import { Pagination, PaginationList } from '@/components/pagination'

export default function CommonPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center border-t border-zinc-950/5 dark:border-white/5 px-4 h-11 shrink-0">
      <Pagination>
        
        {/* Previous Button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 
            hover:text-zinc-900 dark:hover:text-white 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {/* Page Numbers */}
        <PaginationList>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 mx-1 text-sm rounded ${
                page === currentPage
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {page}
            </button>
          ))}
        </PaginationList>

        {/* Next Button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 
            hover:text-zinc-900 dark:hover:text-white 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </Pagination>
    </div>
  )
}
