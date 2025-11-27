import { useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { classNames } from '@/utils/classNames'

export const Calendar = ({
  value = new Date(),
  onChange,
  minDate,
  maxDate,
  'aria-label': ariaLabel,
}) => {
  const [currentMonth, setCurrentMonth] = useState(value)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (date) => {
    if (minDate && date < minDate) return
    if (maxDate && date > maxDate) return
    onChange?.(date)
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Box
      className='tw-bg-white tw-rounded-lg tw-shadow-md tw-p-3 sm:tw-p-4'
      aria-label={ariaLabel || 'Calendar'}
      role='application'
    >
      <Box className='tw-flex tw-items-center tw-justify-between tw-mb-3 sm:tw-mb-4'>
        <IconButton onClick={handlePreviousMonth} aria-label='Previous month' size='small'>
          <ChevronLeft />
        </IconButton>
        <Typography variant='h6' component='h2' className='tw-text-sm sm:tw-text-base md:tw-text-lg'>
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={handleNextMonth} aria-label='Next month' size='small'>
          <ChevronRight />
        </IconButton>
      </Box>

      <Box className='tw-grid tw-grid-cols-7 tw-gap-1 tw-mb-2'>
        {weekDays.map(day => (
          <Typography
            key={day}
            variant='caption'
            className='tw-text-center tw-font-semibold tw-py-1 sm:tw-py-2 tw-text-xs sm:tw-text-sm'
            component='div'
            role='columnheader'
          >
            {day}
          </Typography>
        ))}
      </Box>

      <Box className='tw-grid tw-grid-cols-7 tw-gap-1'>
        {daysInMonth.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isSelected = value
            ? format(day, 'yyyy-MM-dd') === format(value, 'yyyy-MM-dd')
            : false
          const isTodayDate = isToday(day)
          const isDisabled = (minDate && day < minDate) || (maxDate && day > maxDate)

          return (
            <Box
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              className={classNames(
                'tw-p-1 sm:tw-p-2 tw-text-center tw-cursor-pointer tw-rounded tw-transition-all tw-text-xs sm:tw-text-sm',
                {
                  'tw-bg-primary-500 tw-text-white': isSelected,
                  'tw-bg-gray-100': isTodayDate && !isSelected,
                  'tw-text-gray-400': !isCurrentMonth || (isDisabled ?? false),
                  'tw-cursor-not-allowed': isDisabled ?? false,
                  'hover:tw-bg-gray-100': !isSelected && !isDisabled && isCurrentMonth,
                }
              )}
              role='gridcell'
              aria-label={format(day, 'MMMM d, yyyy')}
              aria-selected={isSelected}
              tabIndex={isDisabled ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (!isDisabled) handleDateClick(day)
                }
              }}
            >
              {format(day, 'd')}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
