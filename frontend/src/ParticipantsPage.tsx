import axios from 'axios'
import { config } from 'process'
import { useEffect, useState } from 'react'
import ReactNiceAvatar from 'react-nice-avatar'
import useSWR from 'swr'
import { AlchemyBaseURL, AlchemyClient } from './alchemy'

export default ({}) => {
  const [participants, participants_set] = useState(null as null | any[])

  useEffect(() => {
    AlchemyClient.nft
      .getOwnersForContract('0x728a15b8636b2b44e8da69e7a58d7b640235b1f5')
      .then((v) => {
        const addresses = v.owners

        participants_set(addresses)

        return addresses
      })
      .then((addresses) => {
        console.log(addresses)
        return axios
          .post('https://pregod.rss3.dev/v1/profiles', { address: addresses })
          .then((profiles) => {
            console.log(profiles)
          })
      })
  }, [])

  return (
    <div className=" ">
      {participants?.map((v, i) => (
        <div key={i} className="flex flex-row  items-center mb-6">
          <ReactNiceAvatar id={v} style={{ width: '54px', height: '54px' }} />

          <div className="ml-2">
            <code>{v}</code>
          </div>
        </div>
      ))}
    </div>
  )
}
