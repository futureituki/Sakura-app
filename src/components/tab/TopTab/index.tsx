import CollectionsIcon from '@mui/icons-material/Collections'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import TwitterIcon from '@mui/icons-material/Twitter'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import * as React from 'react'
import { FavoriteImageLayout } from '@/components/List/FavoriteImageLayout'
import { ListImageLayout } from '@/components/List/ListImageLayout'
import { ListNewsLayout } from '@/components/List/ListNewsLayout'
import { ListTweetLayout } from '@/components/List/ListTweetLayout'
import { GalleryObj } from '@/types/gallery'
import { SearchObj } from '@/types/search'
type Props = {
  searchResult: Array<SearchObj>
  imageList: Array<GalleryObj>
  name: string
  onClick: () => void
  prev: () => void
  next: () => void
}
export const BasicTabs: React.FC<Props> = ({
  name,
  searchResult,
  imageList,
  onClick,
  prev,
  next,
}) => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab
              label={
                <>
                  <NewspaperIcon />
                  <p>News</p>
                </>
              }
              value='1'
            />
            <Tab
              label={
                <>
                  <CollectionsIcon />
                  <p>Gallery</p>
                </>
              }
              value='2'
            />
            <Tab
              label={
                <>
                  <TwitterIcon />
                  <p>SNS</p>
                </>
              }
              value='3'
            />
            <Tab
              label={
                <>
                  <FavoriteIcon />
                  <p>いいね</p>
                </>
              }
              value='4'
            />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <ListNewsLayout data={searchResult} />
        </TabPanel>
        <TabPanel value='2'>
          <ListImageLayout data={imageList} name={name} />
          <button onClick={onClick}>取得する</button>
          <button onClick={prev}>前へ</button>
          <button onClick={next}>次へ</button>
        </TabPanel>
        <TabPanel value='3'>
          <ListTweetLayout />
        </TabPanel>
        <TabPanel value='4'>
          <FavoriteImageLayout />
        </TabPanel>
      </TabContext>
    </Box>
  )
}