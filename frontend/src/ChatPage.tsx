import { useRef, useEffect, useState } from 'react'
import ReactNiceAvatar from 'react-nice-avatar'
import { arweave, arweaveWebWallet, useArweaveTransactions } from './arweave'
import PageHeadline from './PageHeadline'

const Messages = [
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
  {
    timestamp: 1662230147566,
    owner: 'dsdsadasdsds',
    text: 'yooo',
  },
]

export default ({}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [walletOpen, walletOpen_set] = useState(false)
  const { data, error } = useArweaveTransactions(
    [
      {
        name: 'App-Name',
        values: ['GatherHub'],
      },
      {
        name: 'Content-Type',
        values: ['text/plain'],
      },
      {
        name: 'Type',
        values: ['Chat'],
      },
    ],
    { limit: 20, reverseResult: true, swrConfig: { refreshInterval: 2 } }
  )
  // Scroll down on any content update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [data?.length])
  const [arweaveWallet, arweaveWallet_set] = useState(
    undefined as undefined | string
  )

  const handleConnect = () => {
    if (arweaveWallet && !walletOpen) {
      return
    }

    arweaveWebWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'DISPATCH'])

    walletOpen_set(true)

    arweaveWebWallet.on('change', (e) => {
      arweaveWallet_set(arweaveWebWallet.address)

      if (!arweaveWebWallet.address) {
        walletOpen_set(false)
      }
    })
  }

  const handleSubmit = async (value: string) => {
    const tx = await arweave.createTransaction({
      data: value,
    })
    tx.addTag('App-Name', 'GatherHub')
    tx.addTag('Content-Type', 'text/plain')
    tx.addTag('Type', 'Chat')

    try {
      await window.arweaveWallet.dispatch(tx)
    } catch (err) {
      console.error(err)
      alert(err?.message | err)
    }
  }

  return (
    <>
      <PageHeadline title="Chat" />

      <div className="flex flex-col rounded-lg overflow-hidden max-w-4xl m-auto">
        <div
          className="bg-white flex-grow px-4 py-4 overflow-scroll"
          style={{ height: 500 }}
          ref={scrollRef}
        >
          {data?.map((tx, i) => (
            <Message
              key={i}
              text={tx.data}
              owner={tx.owner}
              timestamp={tx.timestamp}
            />
          ))}
        </div>
        <Input onClick={handleConnect} handleSubmit={handleSubmit} />
      </div>
    </>
  )
}

const Message = ({ owner, text, timestamp }) => {
  const timeString = timestamp
    ? new Date(timestamp * 1000).toLocaleString()
    : 'just now'

  return (
    <div className="flex mt-4">
      <div className="mr-4">
        <ReactNiceAvatar className="w-12 h-12" />
      </div>

      <div>
        <div className="text-md text-gray-500">
          <span>{owner}</span> <span>{timeString}</span>
        </div>
        <div>{text}</div>
      </div>
    </div>
  )
}

const Input = ({ handleSubmit = async (text: string) => null, ...props }) => {
  const [value, value_set] = useState('')
  const [submitting, submitting_set] = useState(false)
  const submit = (e) => {
    if (value.length < 4) {
      alert('The message is too short. Type at least 4 characters.')

      return
    }

    submitting_set(true)

    handleSubmit(value).then((v) => {
      submitting_set(false)
      value_set('')
    })
  }

  return (
    <form
      onSubmit={(e) => {
        submit(e)

        e.preventDefault()
      }}
    >
      <div className="flex items-center py-2 px-3 bg-gray-50  ">
        <textarea
          value={value}
          id="chat"
          rows={1}
          className="block mr-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  disabled:opacity-5"
          placeholder="Your message..."
          onChange={(e) => value_set(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
              submit(e)
              e.preventDefault()
            }
          }}
          disabled={submitting}
          {...props}
        ></textarea>
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100  "
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  )
}
