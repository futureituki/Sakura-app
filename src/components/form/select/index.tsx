import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import Select from '@mui/material/Select'
import * as React from 'react'

type Props = {
  value: string | number
  title: string
  children: React.ReactNode
  handle: (e: any) => void
}
export const CustomizedSelects: React.FC<Props> = ({ value, title, children, handle }) => {
  return (
    <div>
      <FormControl sx={{ m: 1 }} variant='standard'>
        <InputLabel htmlFor='demo-customized-select-native'>{title}</InputLabel>
        <NativeSelect id='demo-customized-select-native' value={value} onChange={handle}>
          {children}
        </NativeSelect>
      </FormControl>
    </div>
  )
}
