import axios from 'axios'
import gqlRequest from 'graphql-request'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
  arweave,
  arweaveWebWallet,
  useArweaveGraphhQL,
  useArweaveTransactions,
} from './arweave'
import NewsForm from './NewsForm'

export default ({}) => {
  const { data, error } = useArweaveTransactions(
    [
      {
        name: 'App-Name',
        values: ['DegenTown'],
      },
      {
        name: 'Content-Type',
        values: ['text/markdown'],
      },
    ],
    { limit: 10, swrConfig: { refreshInterval: 3 } }
  )

  console.log(data)

  const handlePostSubmit = () => {}

  return (
    <>
      <div
        onClick={() => {
          console.log(arweave)
          arweaveWebWallet.connect([
            'ACCESS_ADDRESS',
            'SIGN_TRANSACTION',
            'DISPATCH',
          ])
        }}
      >
        News
      </div>

      <NewsForm onSubmit={handlePostSubmit} />

      {data && (
        <div>
          {data.map((post) => {
            return (
              <div key={post.id}>
                <div>{post.id}</div>
                <div>{post.data}</div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
