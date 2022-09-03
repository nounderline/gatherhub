import { useState } from 'react'
import { arweave, arweaveWebWallet } from './arweave'

export default ({ onSubmit = () => undefined }) => {
  const [submitting, submitting_set] = useState(false)
  const [arweaveWallet, arweaveWallet_set] = useState(
    undefined as undefined | string
  )
  const [value, value_set] = useState('')

  const handleConnect = () => {
    if (value.trim().length < 4) {
      alert('Content must have at least 4 characters.')

      return
    }

    arweaveWebWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'DISPATCH'])

    arweaveWebWallet.on('change', (e) => {
      arweaveWallet_set(arweaveWebWallet.address)

      if (arweaveWebWallet.address) {
        handleSubmit()
      }
    })
  }

  const handleSubmit = async () => {
    submitting_set(true)

    const tx = await arweave.createTransaction({
      data: value,
    })
    tx.addTag('App-Name', 'DegenTown')
    tx.addTag('Content-Type', 'text/markdown')
    tx.addTag('Type', 'News')

    try {
      await window.arweaveWallet.dispatch(tx)
    } catch (err) {
      console.error(err)
      alert(err?.message | err)
    }

    submitting_set(false)

    onSubmit()
  }

  return (
    <div className="p-4">
      <div>
        <textarea
          className="w-full relative mt-1 rounded-md shadow-sm h-24 p-2"
          style={{ fontFamily: 'monospace' }}
          placeholder="Your **Markdown** content goes here."
          value={value}
          onChange={(e) => value_set(e.target.value)}
        />
        <div className="text-gray flex items-center">
          {arweaveWallet && (
            <>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting' : 'Submit'}
              </Button>
              &nbsp;as&nbsp;
              <div className=" inline-block whitespace-nowrap overflow-hidden text-ellipsis w-32">
                {arweaveWallet}
              </div>
            </>
          )}
          {!arweaveWallet && (
            <>
              <Button onClick={handleConnect}>Connect wallet</Button>
              &nbsp;on Arweave Network
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const Button = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      {...props}
    >
      {children}
    </button>
  )
}
