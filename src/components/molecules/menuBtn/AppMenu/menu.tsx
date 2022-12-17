import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import * as React from 'react'

export const AppMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Link href='/top'>Top</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href='/mypage' style={{ width: '5vw' }}>
            My Page
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href='/music-list'>Music List</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href='/member-list'>Member List</Link>
        </MenuItem>
      </Menu>
    </div>
  )
}
