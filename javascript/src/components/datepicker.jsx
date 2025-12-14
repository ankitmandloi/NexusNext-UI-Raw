'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function DatePicker({ value, onChange, className }) {
  const selectedDate = value ? new Date(value) : new Date()
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth())
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear())

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1 // Convert Sunday (0) to 6, and adjust Monday to 0
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleDateClick = (day) => {
    const year = currentYear
    const month = String(currentMonth + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    const formattedDate = `${year}-${month}-${dayStr}`
    onChange(formattedDate)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const daysInPrevMonth = getDaysInMonth(
      currentMonth === 0 ? 11 : currentMonth - 1,
      currentMonth === 0 ? currentYear - 1 : currentYear
    )

    const days = []

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isSelected: false,
        isToday: false,
      })
    }

    // Current month days
    const today = new Date()
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()

      const isSelected =
        value &&
        day === selectedDate.getDate() &&
        currentMonth === selectedDate.getMonth() &&
        currentYear === selectedDate.getFullYear()

      days.push({
        day,
        isCurrentMonth: true,
        isSelected,
        isToday,
      })
    }

    // Next month days
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isSelected: false,
        isToday: false,
      })
    }

    return days
  }

  const calendarDays = renderCalendar()

  return (
    <div
      className={clsx(
        'inline-block rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900',
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <ChevronLeftIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </button>

        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
          {MONTHS[currentMonth]} {currentYear}
        </h3>

        <button
          type="button"
          onClick={handleNextMonth}
          className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <ChevronRightIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </button>
      </div>

      {/* Days of week */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS.map((day, index) => (
          <div
            key={index}
            className="flex h-10 items-center justify-center text-sm font-medium text-zinc-500 dark:text-zinc-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            type="button"
            onClick={() => day.isCurrentMonth && handleDateClick(day.day)}
            disabled={!day.isCurrentMonth}
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors',
              day.isCurrentMonth
                ? 'text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800'
                : 'text-zinc-400 dark:text-zinc-600',
              day.isSelected &&
                'border-2 border-zinc-900 font-medium dark:border-zinc-100',
              day.isToday &&
                !day.isSelected &&
                'border-2 border-blue-500 font-medium dark:border-blue-400',
              !day.isCurrentMonth && 'cursor-default'
            )}
          >
            {day.day}
          </button>
        ))}
      </div>
    </div>
  )
}
