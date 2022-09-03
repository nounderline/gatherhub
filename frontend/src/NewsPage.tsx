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

      <div className="m-auto max-w-3xl">
        {data && (
          <div>
            {data.map((post) => {
              return (
                <Post
                  key={post.id}
                  owner={post.owner}
                  data={post.data}
                  timestamp={post.timestamp}
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

const Post = ({ data, owner, timestamp }) => {
  const timeString = timestamp
    ? new Date(timestamp * 1000).toLocaleString()
    : 'just now'

  return (
    <div className="block p-4 mb-4  bg-white rounded-lg border border-gray-200 shadow-md ">
      <div className=" text-gray-400">{timeString}</div>
      <div className="text-2xl">{data}</div>
    </div>
  )
}
