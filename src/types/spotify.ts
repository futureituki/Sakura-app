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
