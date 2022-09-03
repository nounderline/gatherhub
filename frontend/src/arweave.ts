import Arweave from 'arweave'
import { ArweaveWebWallet } from 'arweave-wallet-connector'
import axios from 'axios'
import { id } from 'ethers/lib/utils'
import gqlRequest from 'graphql-request'
import { config } from 'process'
import { useEffect, useState } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import ts from 'typescript'

export const arweave = Arweave.init({})

export const useArweaveGraphhQL = (
  query,
  variables,
  config: SWRConfiguration | undefined = undefined
) => {
  const { data, error } = useSWR(
    query,
    (query) => gqlRequest('https://arweave.net/graphql', query, variables),
    config
  )

  return { data, error }
}

export const useArweaveTransactions = (
  tags: { name: string; values: string[] }[],
  { limit = 100, swrConfig = null as SWRConfiguration } = {}
) => {
  const [content, content_set] = useState(null)
  const { data, error } = useArweaveGraphhQL(
    `
      query Transactions($limit: Int, $tags: [TagFilter!]) {
        transactions(first: $limit,
          tags: $tags
        ) {
          edges {
            node {
              id
              block {
                timestamp
              }
              owner {
                address
              }
            }
          }
        }
      }
`,
    { limit, tags },
    swrConfig
  )
  useEffect(() => {
    if (data) {
      const txs = data.transactions.edges.map((v) => v.node)

      Promise.all(
        txs.map((tx) =>
          axios.get(`https://arweave.net/${tx.id}`).then((res) => {
            return {
              id: tx.id,
              owner: tx.owner.address,
              data: res.data,
              timestamp: tx.block?.timestamp,
            }
          })
        )
      ).then((newContent) => {
        content_set(newContent)
      })
    }
  }, [JSON.stringify(data)])

  return {
    data: content,
    error,
  }
}

// TODO we're not going to use it?
export const arweaveWebWallet = new ArweaveWebWallet(
  {
    name: 'ETHWarsaw',
  },
  'arweave.app'
)
