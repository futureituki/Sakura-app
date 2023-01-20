import { Close } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import * as React from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  textAlign: 'center',
  boxShadow: 24,
  p: 4,
}

type Props = {
  open: boolean
  handleClose: () => void
  children: React.ReactNode
}
export const GeneralModal: React.FC<Props> = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Close onClick={handleClose} />
        {children}
      </Box>
    </Modal>
  )
}
