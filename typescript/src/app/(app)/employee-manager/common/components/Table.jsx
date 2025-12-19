'use client'

import { Pagination } from "@/components/pagination"

export default function CommonTable({
  columns = [],
  data = [],
  renderActions = null,
  emptyMessage = "No records found.",   // ✅ NEW PROP
}) {
  return (
    <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
      
      {/* Scroll X Wrapper */}
      <div
        className="
          flex-1 overflow-x-auto overflow-y-hidden
          [&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600
        "
      >
        <div className="min-w-[700px] flex flex-col h-full">

          {/* TABLE HEADER */}
          <div
            className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 
              h-11 flex items-center bg-white dark:bg-zinc-900"
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className={`${col.width ? `w-[${col.width}px]` : 'flex-1'} 
                  px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center`}
              >
                {col.label}
              </div>
            ))}

            {renderActions && (
              <div className="w-[160px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
                Actions
              </div>
            )}
          </div>

          {/* TABLE BODY */}
          <div
            className="
              flex-1 overflow-y-auto
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-zinc-300
              [&::-webkit-scrollbar-thumb]:rounded-full
              dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600
            "
          >
            {data.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                {emptyMessage}   {/* ✅ CUSTOM MESSAGE HERE */}
              </div>
            ) : (
              data.map((row, index) => (
                <div
                  key={row.id || index}
                  className={`
                    flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5
                    hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors
                    ${index === data.length - 1 ? 'border-b-0' : ''}
                  `}
                >
                  {/* Row cells */}
                  {columns.map((col) => (
                    <div
                      key={col.key}
                      className={`${col.width ? `w-[${col.width}px]` : 'flex-1'} 
                        px-4 text-sm font-medium text-zinc-950 dark:text-white text-center`}
                    >
                      {row[col.key]}
                    </div>
                  ))}

                  {/* Actions */}
                  {renderActions && (
                    <div className="w-[160px] px-4 flex items-center justify-center">
                      {renderActions(row)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
