import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'

/* This example requires Tailwind CSS v2.0+ */
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline'

const transferFeatures = [
  {
    id: 1,
    name: 'Grassroots',
    description:
      'Find individuals who are likely to need and appreciate your services.',
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: 'Economically Fair',
    description:
      '70% of revenue goes to communities where your offers are shared.',
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: 'Effective Targeting',
    description:
      'Present your services to communities of similar interest and believes.',
    icon: BoltIcon,
  },
]

export default function () {
  const purchaseDeal = async () => {
    new RampInstantSDK({
      hostAppName: 'GatherHub',
      hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
      swapAsset: 'XDAI_XDAI',
      url: 'https://ri-widget-staging.firebaseapp.com/',
      swapAmount: '100000000000000000000', // 100 xDai
      userAddress: '0x58fe6A10618d86ae934d46FE843e7AAF4Eab0c72',
      webhookStatusUrl:
        'https://api.tenderly.co/api/v1/actions/0d27a23b-e5e3-4f57-96c2-d57b0b548183/webhook',
    }).show()
  }

  return (
    <div className="overflow-hidden bg-gray-50 py-16">
      <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative">
          <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            GatherHub for Business
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
            Find loyal customers through Gatherhub communities.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Loyal customers through communities
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              GatherHub helps local businesses to provide special offers to
              participants of conferences and gatherings.
            </p>

            <dl className="mt-10 space-y-10">
              {transferFeatures.map((item) => (
                <div key={item.id} className="relative">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mt-10 lg:mt-0">
            <div className="mt-10 sm:mt-0">
              <div className="md:grid  md:gap-4">
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form
                    onSubmit={(e) => {
                      purchaseDeal()

                      e.preventDefault()
                    }}
                  >
                    <div className="overflow-hidden shadow sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid gap-6">
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Title
                            </label>
                            <input
                              placeholder="Best deals for hackers"
                              type="text"
                              name="title"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <textarea
                              placeholder="Describe your deal more here..."
                              name="title"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="redeem_url"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Redeem URL
                            </label>
                            <input
                              placeholder="your-company.com/discount"
                              type="text"
                              name="redeem_url"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-8 sm:col-span-3">
                            <TierOption />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Pay now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const TierOptions = [
  { name: '10%', className: 'ring-orange-400' },
  { name: '20%', className: 'ring-yellow-400' },
  { name: '30%', className: 'ring-red-400' },
]

function TierOption({}) {
  const [mem, setMem] = useState(TierOptions[1])

  useEffect(() => {
    console.log({ mem })
  }, [mem])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Tier</h2>
      </div>

      <RadioGroup value={mem} onChange={setMem} className="mt-2">
        <RadioGroup.Label className="sr-only">
          {' '}
          Choose a memory option{' '}
        </RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {TierOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  true
                    ? 'cursor-pointer focus:outline-none'
                    : 'opacity-25 cursor-not-allowed',
                  checked
                    ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                  'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                )
              }
              disabled={false}
            >
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
