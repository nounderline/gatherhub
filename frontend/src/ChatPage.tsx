import { useRef, useEffect } from 'react'
import ReactNiceAvatar from 'react-nice-avatar'
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
  useEffect(() => {
    const t = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, 50)

    return () => {
      clearInterval(t)
    }
  }, [])

  return (
    <>
      <PageHeadline title="Chat" />

      <div className="flex flex-col rounded-lg overflow-hidden max-w-4xl m-auto">
        <div
          className="bg-white flex-grow p-8 overflow-hidden"
          style={{ height: 500 }}
          ref={scrollRef}
        >
          {Messages.map((msg, i) => (
            <Message key={i} {...msg} />
          ))}
        </div>
        <Input />
      </div>
    </>
  )
}

const Message = ({ owner, text, timestamp }) => {
  return (
    <div className="flex mt-4">
      <div className="mr-4">
        <ReactNiceAvatar className="w-12 h-12" />
      </div>

      <div>
        <div>{owner}</div>
        <div>{text}</div>
      </div>
    </div>
  )
}

const Input = ({ onSubmit = () => null }) => {
  return (
    <form>
      <div className="flex items-center py-2 px-3 bg-gray-50  ">
        <textarea
          id="chat"
          rows={1}
          className="block mr-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500      "
          placeholder="Your message..."
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
