import {
  List as MuiList,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Divider,
} from '@mui/material'
import { classNames } from '@/utils/classNames'

export const List = ({
  items,
  dividers = false,
  dense = false,
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <MuiList
      dense={dense}
      className={classNames('tw-bg-white tw-rounded-lg tw-shadow-md', className)}
      aria-label={ariaLabel || 'List'}
      role='list'
      {...props}
    >
      {items.map((item, index) => (
        <div key={item.id}>
          <ListItem
            disablePadding
            disabled={item.disabled}
            aria-label={item['aria-label'] || item.primary}
          >
            {item.onClick ? (
              <ListItemButton onClick={item.onClick} disabled={item.disabled}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.primary} secondary={item.secondary} />
              </ListItemButton>
            ) : (
              <>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.primary} secondary={item.secondary} />
              </>
            )}
          </ListItem>
          {dividers && index < items.length - 1 && <Divider />}
        </div>
      ))}
    </MuiList>
  )
}

