import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Popper from '@mui/material/Popper'
import { FC, useState } from 'react'

type Props = {
  children: React.ReactNode
}
export const TransitionsPopper: FC<Props> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState<boolean>(true)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((previousOpen) => !previousOpen)
  }

  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? 'transition-popper' : undefined

  return (
    <div>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        style={{
          width: '100vw',
          maxWidth: '900px',
          maxHeight: '900px',
          top: '10%',
          position: 'absolute',
          zIndex: '9999',
          left: '50%',
          translate: '-50%',
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                margin: '0 auto',
                width: '90vw',
                maxWidth: '900px',
                zIndex: '999',
                position: 'relative',
                height: '90vw',
                maxHeight: '900px',
                border: 1,
                p: 1,
                bgcolor: 'background.paper',
              }}
            >
              {children}
              <button
                aria-describedby={id}
                type='button'
                onClick={handleClick}
                style={{
                  position: 'absolute',
                  top: '90%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                スキップ
              </button>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  )
}
