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
import { ListBlogLayout } from '@/components/List/ListBlogLayout'
import { ListImageLayout } from '@/components/List/ListImageLayout'
import { ListTweetLayout } from '@/components/List/ListTweetLayout'
import { PrimaryButton } from '@/components/atoms/Button'
import { GalleryObj } from '@/types/gallery'
type Props = {
  imageList: Array<GalleryObj>
  name: string
  onClick: () => void
  prev: () => void
  next: () => void
}
export const BasicTabs: React.FC<Props> = ({ name, imageList, onClick, prev, next }) => {
  const [value, setValue] = React.useState('')

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
                  <p>BLOGS</p>
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
          <ListBlogLayout />
        </TabPanel>
        <TabPanel value='2'>
          <ListImageLayout data={imageList} name={name} />
          <PrimaryButton
            label='get'
            onClick={onClick}
            color='#fff'
            background='#ff69b8'
            variant='contained'
          >
            {name}の画像を検索する
          </PrimaryButton>
          {imageList ? (
            <>
              <PrimaryButton
                label='get'
                onClick={prev}
                color='#fff'
                background='#ff69b8'
                variant='contained'
              >
                前へ
              </PrimaryButton>
              <PrimaryButton
                label='get'
                onClick={next}
                color='#fff'
                background='#ff69b8'
                variant='contained'
              >
                次へ
              </PrimaryButton>
            </>
          ) : (
            ''
          )}
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
