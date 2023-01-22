import { Close } from '@mui/icons-material'
import { Backdrop, Fade } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import * as React from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  height: '100vh',
  width: '100vw',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'rgba(255,255,255, 0.8);',
  border: '2px solid #000',
  textAlign: 'center',
  boxShadow: 24,
}

type Props = {
  open: boolean
  handleClose: () => void
  children: React.ReactNode
}
// Youtube開くときに使うモーダル //
export const GeneralModal: React.FC<Props> = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Close
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '5%',
              right: '5%',
              fontSize: '7vw',
              color: '#5a5a5a',
            }}
          />
          {children}
        </Box>
      </Fade>
    </Modal>
  )
}
