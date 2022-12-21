export type TweetObj = {
  text: string
  entities: {
    urls: {
      expanded_url: string
      display: string
    }
    hashTag: [
      {
        tag: string
      },
    ]
  }
  public_metrics: {
    retweet_count: number
    reply_count: number
    like_count: number
    quote_count: number
  }
  created_at: string
}
