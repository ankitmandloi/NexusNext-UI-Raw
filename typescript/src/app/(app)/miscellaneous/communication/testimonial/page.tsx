'use client'

import { Heading } from '@/components/heading'

export default function TestimonialPage() {
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Testimonial</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage customer testimonials and reviews
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Empty State */}
        <div className="flex flex-1 items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
          Coming soon...
        </div>
      </div>
    </div>
  )
}
