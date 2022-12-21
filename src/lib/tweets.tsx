import { Client } from 'twitter-api-sdk'

export async function searchByTweet(client: Client, query: string): Promise<any> {
  const response = await client.tweets.usersIdTweets('3433403638', {
    expansions: ['attachments.media_keys', 'author_id'],
    'tweet.fields': ['entities', 'created_at', 'public_metrics'],
  })

  return response.data
}
