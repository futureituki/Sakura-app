export type SearchObj = {
  formattedUrl: string
  htmlFormattedUrl: string
  htmlSnippet: string
  htmlTitle: string
  link: string
  pagemap: {
    cse_thumbnail: Array<string>
    metatags: Array<string>
    cse_image: Array<string>
    hproduct?: [
      {
        description: string
        fn: string
        photo: string
      },
    ]
  }
  snippet: string
  title: string
}
