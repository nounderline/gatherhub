import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactNiceAvatar from 'react-nice-avatar'

import { AlchemyClient } from './alchemy'
import PageHeadline from './PageHeadline'

const checkENS = (
  addr: string,
  profiles: any[] | null,
): string => {
  const display = profiles?.find(({ address }) => address === addr)?.handle
  return `${display || addr}`
}

export default () => {
  const [participants, participants_set] = useState(null as null | string[])
  const [profiles, profiles_set] = useState(null as null | string[])

  useEffect(() => {
    // TODO: refactor to use without useEffect
    // currently this is a workaround for prototyping RPC limits
    AlchemyClient.nft
      .getOwnersForContract('0x728a15b8636b2b44e8da69e7a58d7b640235b1f5')
      .then((v) => {
        const addresses = v.owners.filter(
          (address) => address !== '0x0000000000000000000000000000000000000000'
        )

        return addresses
      })
      .then(async (addresses) => {
        const response = await axios
          .post('https://pregod.rss3.dev/v1/profiles', { address: addresses })
          .then((v) => v.data)
        const profiles = response.result

        addresses.sort((a, b) => {
          return (
            Number(checkENS(b, profiles).includes('.eth')) -
            Number(checkENS(a, profiles).includes('.eth'))
          )
        })

        participants_set(addresses)
        profiles_set(profiles)
      })
  }, [])

  return (
    <>
      <PageHeadline
        icon="👽"
        title="Participants"
        subtitle="See who you gonna meet on the stage!"
      />

      <div className="max-w-3xl m-auto">
        {participants?.map((addr) => (
          <div key={addr} className="flex flex-row  items-center mb-6">
            <ReactNiceAvatar
              id={addr}
              style={{ width: '54px', height: '54px' }}
            />
            <div className="ml-2">
              <code>{checkENS(addr, profiles)}</code>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
