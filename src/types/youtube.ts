export type Youtube = {
  items: [
    {
      contentDetails: {
        videoPublishedAt: string
      }
      id: {
        videoId: String
      }
      snippet: {
        description: string
        publishedAt: string
        title: string
        publishTime: string
        thumbnails: {
          default: {
            url: string
            width: number
            height: number
          }
          medium: {
            url: string
            width: number
            height: number
          }
          high: {
            url: string
            width: number
            height: number
          }
          standard: {
            url: string
            width: number
            height: number
          }
          maxres: {
            url: string
            width: number
            height: number
          }
        }
        resourceId: {
          videoId: string
        }
      }
    },
  ]
  nextPageToken: string
  prevPageToken: string
}

export type YoutubeComment = {
  snippet: {
    topLevelComment: {
      snippet: {
        textDisplay: string
        textOriginal: string
        authorDisplayName: string
      }
    }
  }
}
