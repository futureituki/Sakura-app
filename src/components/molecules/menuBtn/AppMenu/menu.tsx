import MoreVertIcon from '@mui/icons-material/MoreVert'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box } from '@mui/material';
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
    <Box>
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
        <Box sx={{
            display:"flex",
            alignItems:"center",
            gap:"10px",
          }}>
          <AssignmentIndIcon/>
          <Link href='/mypage'>
            My Page
          </Link>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Box sx={{
            display:"flex",
            alignItems:"center",
            gap:"10px",
          }}>
            <PeopleIcon/>
            <Link href='/community'>
              Community
            </Link>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Box sx={{
            display:"flex",
            alignItems:"center",
            gap:"10px",
          }}>
          <LibraryMusicIcon/>
          <Link href='/music-list'>Music List</Link>
        </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Box sx={{
            display:"flex",
            alignItems:"center",
            gap:"10px",
          }}>
            <PeopleAltIcon/>
          <Link href='/member-list'>Member List</Link>
        </Box>
        </MenuItem>
      </Menu>
    </Box>
  )
}
