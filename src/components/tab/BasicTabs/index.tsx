import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import * as React from 'react'
import { ListImageLayout } from '@/components/List/ListImageLayout'
import { ListNewsLayout } from '@/components/List/ListNewsLayout'
import { GalleryObj } from '@/types/gallery'
import { NewsObj } from '@/types/news'

type Props = {
  news: Array<NewsObj>
  imageList: Array<GalleryObj>
  name: string
  onClick: () => void
  prev: () => void
  next: () => void
}
export const BasicTabs: React.FC<Props> = ({ name, news, imageList, onClick, prev, next }) => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='News' value='1' />
            <Tab label='Gallery' value='2' />
            <Tab label='SNS' value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <ListNewsLayout data={news} />
        </TabPanel>
        <TabPanel value='2'>
          <ListImageLayout data={imageList} name={name} />
          <button onClick={onClick}>取得する</button>
          <button onClick={prev}>前へ</button>
          <button onClick={next}>次へ</button>
        </TabPanel>
        <TabPanel value='3'>Item Three</TabPanel>
      </TabContext>
    </Box>
  )
}
