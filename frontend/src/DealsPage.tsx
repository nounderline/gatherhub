import { parse } from 'path'
import PageHeadline from './PageHeadline'
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const Items = [
  {
    title: 'Rooms for Hackers at Martiot Hotels',
    description: 'Marriott invites all crypto hackers for our special deal!',
    hint: '10%',
    redeem_url: 'https://www.marriott.com/default.mi',
  },
  {
    title: 'Affordable Uber rides for all Crypto Hackers',
    description:
      "Affordable rides for hackers who don't know how to make money.",
    hint: '30%',
    redeem_url: 'https://www.marriott.com/default.mi',
  },
  {
    title: 'Healthy food for Degens',
    description: 'We have a healthy food to help out degenerates come to life',
    hint: '13%',
    redeem_url: 'https://www.marriott.com/default.mi',
  },
]

export default ({ items = Items }) => {
  return (
    <>
      <PageHeadline
        icon="💸"
        title="Deals"
        subtitle="Special offers for accommodation and food for all participants."
      />

      <div className="max-w-3xl m-auto mt-12">
        {items.map((item, i) => {
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

const Deal = ({ title, description, hint, redeem_url }) => {
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
        href={redeem_url}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Redeem
        <ArrowUpRightIcon className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  )
}
