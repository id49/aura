import { createClient } from 'urql'

export const client = createClient({
  url: 'https://api.learn49.com/graphql' //'http://localhost:3000/graphql'
})
