import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { classNames } from '@/utils/classNames'

export function Table({
  columns,
  rows,
  getRowId,
  stickyHeader = false,
  className,
  'aria-label': ariaLabel,
  ...props
}) {
  const getValue = (row, columnId) => {
    return row[columnId]
  }

  return (
    <TableContainer
      component={Paper}
      className='tw-shadow-md tw-rounded-lg tw-overflow-x-auto'
      sx={{
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }}
    >
      <MuiTable
        stickyHeader={stickyHeader}
        className={classNames('tw-min-w-full', className)}
        aria-label={ariaLabel || 'Data table'}
        role='table'
        sx={{
          '& .MuiTableCell-root': {
            whiteSpace: 'nowrap',
            '@media (max-width: 640px)': {
              padding: '8px 4px',
              fontSize: '0.75rem',
            },
          },
        }}
        {...props}
      >
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                aria-label={column['aria-label'] || column.label}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const rowId = getRowId ? getRowId(row) : index
            return (
              <TableRow key={rowId} hover role='row' tabIndex={-1} aria-rowindex={index + 2}>
                {columns.map(column => {
                  const value = getValue(row, column.id)
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      aria-label={`${column.label}: ${value}`}
                    >
                      {column.format ? column.format(value, row) : String(value ?? '')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}
