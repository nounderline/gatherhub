import { ArrowUpRightIcon } from '@heroicons/react/20/solid'
import { useLogs } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import PageHeadline from './PageHeadline'
import { contract } from './utils/contract'

interface Deal {
  description: string
  hint: string
  redeemUrl: string
  title: string
}

export default () => {
  const [deals, setDeals] = useState<Deal[]>([])

  const logs = useLogs(
    {
      contract,
      event: 'DealCreated',
      args: [],
    },
    {
      fromBlock: 24010000,
      toBlock: 'latest',
    }
  )

  useEffect(() => {
    // TODO: refactor to use without useEffect
    // currently this is a workaround for prototyping RPC limits
    if (!deals.length && logs?.value) {
      setDeals(logs.value.map((v) => ({
        description: v.data.description,
        hint: v.data.hint,
        redeemUrl: v.data.redeemUrl,
        title: v.data.title,
      })))
    }
  }, [logs?.value?.length])
  console.warn(deals)
  return (
    <>
      <PageHeadline
        icon="💸"
        title="Deals"
        subtitle="Special offers for accommodation and food for all participants."
      />

      <div className="max-w-3xl m-auto mt-12">
        {deals.map((item, i) => {
          return <Deal key={i} {...item} />
        })}
      </div>

      <div className="mt-24 mb-24 text-center">
        <div className="text-2xl font-bold">Are you a business?</div>
        <div className="text-xl text-gray-500">
          Let hackers now what you can do for them!
        </div>
        <Link
          to="/business"
          className="mt-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Become a partner
        </Link>
      </div>
    </>
  )
}

const Deal = ({ title, description, hint, redeemUrl }: Deal) => {
  const color =
    {
      1: 'bg-orange-400',
      2: 'bg-yellow-400',
      3: 'bg-red-400',
    }[hint[0]] || 'bg-red-400'

  return (
    <div className="flex items-center p-4 overflow-hidden rounded-md  border-gray-200 border-2 mb-8 bg-white">
      <div
        className={`mr-4 ${color} w-16 h-16 text-white flex items-center justify-center font-bold rounded-md`}
      >
        {hint}
      </div>
      <div className="flex-grow">
        <div className="font-bold text-xl">{title}</div>
        <div className="text-gray-600">{description}</div>
      </div>
      <a
        target="_blank"
        href={redeemUrl}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Redeem
        <ArrowUpRightIcon className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  )
}
