export type NewsObj = {
  providers: [
    {
      name: string
    },
  ]
  image: {
    thumbnail: {
      contentUrl: string
    }
  }
  dateLastCrawled?: string
  datePublished: string
  name: string
  url: string
  description?: string
  snippet: string
}
