'use client'

import { useState, useRef, useEffect } from 'react'

export default function CommonTable({
  columns = [],
  data = [],
  renderActions = null,
  emptyMessage = 'No records found.',
  minWidth = '1100px',
  actionsWidth = '130px',
  stickyColumns = false,
  pagination = null,
}) {
  const [hoveredRow, setHoveredRow] = useState(null)
  const scrollContainerRef = useRef(null)
  const headerScrollRef = useRef(null)

  // Sync horizontal scroll from body to header (invisible sync)
  useEffect(() => {
    if (!stickyColumns) return

    const handleScroll = (e) => {
      const scrollLeft = e.target.scrollLeft
      
      // Sync scroll from body to header
      if (e.target === scrollContainerRef.current?.parentElement) {
        if (headerScrollRef.current) {
          headerScrollRef.current.scrollLeft = scrollLeft
        }
      }
    }

    const middleBodyScroll = scrollContainerRef.current?.parentElement

    if (middleBodyScroll) {
      middleBodyScroll.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (middleBodyScroll) {
        middleBodyScroll.removeEventListener('scroll', handleScroll)
      }
    }
  }, [stickyColumns])

  // Build column class with fixed width
  const getColumnClass = (width, isFlexible = false) => {
    if (isFlexible) {
      return 'flex-1 min-w-[130px]'
    }
    return ''
  }

  // Build inline style for fixed width columns
  const getColumnStyle = (width) => {
    if (width) {
      return { width, minWidth: width, flexShrink: 0 }
    }
    return {}
  }

  // Calculate the total width of middle columns (excluding ID and Actions)
  const getMiddleColumnsWidth = () => {
    if (!columns || columns.length <= 1) return 'auto'
    
    const middleColumns = columns.slice(1) // Exclude ID column
    const totalWidth = middleColumns.reduce((sum, col) => {
      if (col.width) {
        const numericWidth = parseInt(col.width)
        return sum + numericWidth
      }
      return sum
    }, 0)
    
    return totalWidth > 0 ? `${totalWidth}px` : 'auto'
  }

  const renderCellContent = (value, col) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-zinc-400">—</span>
    }

    // Handle status with badge styling
    if (col.key === 'status') {
      const isActive = value === 'Active'
      return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
          isActive 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    }

    // Handle images
    if (col.key === 'image' || col.key.toLowerCase().includes('image')) {
      if (typeof value === 'string' && value.startsWith('http')) {
        return (
          <img 
            src={value} 
            alt="Product" 
            className="w-8 h-8 rounded object-cover"
          />
        )
      }
      return <span className="text-zinc-400">—</span>
    }

    // Handle coupon flag with Yes/No badge
    if (col.key === 'couponGenerationFlag') {
      const isYes = value === 'Yes' || value === 'Enabled'
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
          isYes 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
        }`}>
          {value}
        </span>
      )
    }

    if (typeof value === 'string' || typeof value === 'number') {
      // Only truncate very long text (>30 chars), otherwise show full content
      const textValue = String(value)
      if (textValue.length > 30) {
        return (
          <span className="block" title={textValue}>
            <span className="truncate block">{textValue}</span>
          </span>
        )
      }
      return <span className="block">{textValue}</span>
    }

    return value
  }

  return (
    <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
      
      {stickyColumns ? (
        /* Sticky Columns Layout - Everything scrolls together vertically */
        <>
          {/* Global Vertical Scroll Container */}
          <div className="flex-1 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
            {/* Headers Row */}
            <div className="flex shrink-0 border-b border-zinc-950/10 dark:border-white/10 sticky top-0 z-10 bg-white dark:bg-zinc-900">
              {/* ID Header */}
              <div className="flex-shrink-0 border-r border-zinc-950/10 dark:border-white/10 h-11 flex items-center" style={getColumnStyle(columns[0]?.width)}>
                <div className="px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center w-full">
                  {columns[0]?.label}
                </div>
              </div>
              
              {/* Middle Headers - Hidden scrollbar but synced */}
              <div ref={headerScrollRef} className="flex-1 overflow-x-hidden">
                <div className="flex h-11 items-center" style={{ minWidth: getMiddleColumnsWidth() }}>
                  {columns.slice(1).map((col) => (
                    <div key={col.key} className="px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center whitespace-nowrap overflow-hidden" style={getColumnStyle(col.width)}>
                      <span className="block" title={col.label}>{col.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Header */}
              {renderActions && (
                <div className="flex-shrink-0 border-l border-zinc-950/10 dark:border-white/10 h-11 flex items-center" style={{ width: '160px', minWidth: '160px' }}>
                  <div className="px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center w-full whitespace-nowrap">
                    Actions
                  </div>
                </div>
              )}
            </div>

            {/* Body Rows */}
            <div className="flex">
              {/* Sticky Left Column (ID) */}
              <div className="flex-shrink-0 border-r border-zinc-950/10 dark:border-white/10" style={getColumnStyle(columns[0]?.width)}>
                {data.length === 0 ? (
                  <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                    {emptyMessage}
                  </div>
                ) : (
                  data.map((row, index) => (
                    <div 
                      key={row.id || index} 
                      onMouseEnter={() => setHoveredRow(index)} 
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`flex items-center min-h-[68px] border-b border-zinc-950/5 dark:border-white/5 transition-colors ${index === data.length - 1 ? 'border-b-0' : ''} ${hoveredRow === index ? 'bg-zinc-50 dark:bg-zinc-800/50' : ''}`}
                    >
                      <div className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 text-center overflow-hidden w-full">
                        {renderCellContent(row[columns[0]?.key], columns[0])}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Scrollable Middle Section - Horizontal scroll only */}
              <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
                <div ref={scrollContainerRef} style={{ minWidth: getMiddleColumnsWidth() }}>
                  {data.length === 0 ? null : (
                    data.map((row, index) => (
                      <div 
                        key={row.id || index} 
                        onMouseEnter={() => setHoveredRow(index)} 
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`flex items-center min-h-[68px] border-b border-zinc-950/5 dark:border-white/5 transition-colors ${index === data.length - 1 ? 'border-b-0' : ''} ${hoveredRow === index ? 'bg-zinc-50 dark:bg-zinc-800/50' : ''}`}
                      >
                        {columns.slice(1).map((col) => (
                          <div key={col.key} className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 text-center overflow-hidden" style={getColumnStyle(col.width)}>
                            {renderCellContent(row[col.key], col)}
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Sticky Right Column (Actions) */}
              {renderActions && (
                <div className="flex-shrink-0 border-l border-zinc-950/10 dark:border-white/10" style={{ width: '160px', minWidth: '160px' }}>
                  {data.length === 0 ? null : (
                    data.map((row, index) => (
                      <div 
                        key={row.id || index} 
                        onMouseEnter={() => setHoveredRow(index)} 
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`flex items-center justify-center min-h-[68px] border-b border-zinc-950/5 dark:border-white/5 transition-colors ${index === data.length - 1 ? 'border-b-0' : ''} ${hoveredRow === index ? 'bg-zinc-50 dark:bg-zinc-800/50' : ''}`}
                      >
                        <div className="px-4 py-3 flex items-center justify-center gap-3 w-full">
                          {renderActions(row)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Pagination inside table boundary */}
          {pagination && pagination}
        </>
      ) : (
        /* Regular Layout */
        <>
          <div className="flex-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div style={{ minWidth }} className="flex flex-col h-full">

            {/* TABLE HEADER - Fixed */}
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={`px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center whitespace-nowrap overflow-hidden ${getColumnClass(col.width, col.flexible)}`}
                  style={getColumnStyle(col.width)}
                >
                  <span className="block" title={col.label}>{col.label}</span>
                </div>
              ))}

              {renderActions && (
                <div className="flex-1 min-w-[130px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center whitespace-nowrap">
                  Actions
                </div>
              )}
            </div>

            {/* Scrollable Table Body */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
              {data.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  {emptyMessage}
                </div>
              ) : (
                data.map((row, index) => (
                  <div
                    key={row.id || index}
                    className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === data.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    {/* Row cells */}
                    {columns.map((col) => (
                      <div
                        key={col.key}
                        className={`px-4 text-sm text-zinc-600 dark:text-zinc-400 text-center overflow-hidden ${getColumnClass(col.width, col.flexible)}`}
                        style={getColumnStyle(col.width)}
                      >
                        {renderCellContent(row[col.key], col)}
                      </div>
                    ))}

                    {/* Actions */}
                    {renderActions && (
                      <div className="flex-1 min-w-[130px] px-4 flex items-center justify-center gap-3">
                        {renderActions(row)}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          </div>
          
          {/* Pagination inside table boundary */}
          {pagination && pagination}
        </>
      )}
    </div>
  )
}
