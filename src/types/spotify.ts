export type Album = {
  album_type: string
  label: string
  name: string
  release_date: string
  images: {
    height: number
    width: number
    url: string
  }[]
  tracks: {
    items: {
      album: { href: string; name: string; images: { url: string; height: number }[] }
      artists: { href: string; name: string }[]
      href: string
      id: string
      name: string
      uri: string
      preview_url: string
      duration_ms: number
    }[]
  }
}

export type Music = {
  id: string
  src: string
  title: string
  type: string
}

export type Ranking = {
  album: {
    images: [
      {
        height: 640
        url: 'https://i.scdn.co/image/ab67616d0000b2730990978a6c92cdbca797d1a6'
        width: 640
      },
      {
        height: 300
        url: 'https://i.scdn.co/image/ab67616d00001e020990978a6c92cdbca797d1a6'
        width: 300
      },
      {
        height: 64
        url: 'https://i.scdn.co/image/ab67616d000048510990978a6c92cdbca797d1a6'
        width: 64
      },
    ]
    name: string
    release_date: string
  }
  href: string
  name: string
  preview_url: string
  uri: string
}
