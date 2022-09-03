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
import PageHeadline from './PageHeadline'
import { PlusIcon } from '@heroicons/react/20/solid'

export default ({}) => {
  const { data, error } = useArweaveTransactions(
    [
      {
        name: 'App-Name',
        values: ['GatherHub'],
      },
      {
        name: 'Content-Type',
        values: ['text/markdown'],
      },
    ],
    { limit: 10, swrConfig: { refreshInterval: 2 } }
  )
  const [isEditing, isEditing_set] = useState(false)

  const handlePostSubmit = () => {}

  return (
    <>
      <PageHeadline
        icon="📣"
        title="Announcements"
        subtitle="Be in the loop about what's happening."
      />

      <div className="text-center mt-8 mb-8">
        <button
          onClick={(_) => isEditing_set(true)}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Announcement
        </button>
        <div className=" text-gray-400">for owners only</div>
      </div>

      <Slideover
        title="New Announcement"
        open={isEditing}
        onClose={() => isEditing_set(false)}
      >
        <NewsForm onSubmit={handlePostSubmit} />
      </Slideover>

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

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function Slideover({
  title = '',
  open = true,
  onClose = () => undefined,
  children,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>

                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
