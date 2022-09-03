import { useLogs } from '@usedapp/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactNiceAvatar from 'react-nice-avatar'

import { AlchemyClient } from './alchemy'
import PageHeadline from './PageHeadline'
import { contract } from './utils/contract'
import { getTierName, parseMembers, TierWallet } from './utils/util'

const checkENS = (
  addr: string,
  profiles: any[] | null,
  tierWallets: TierWallet[]
): string => {
  const display = profiles?.find(({ address }) => address === addr)?.handle
  const tier = tierWallets?.find((item) => item.to === addr)?.tier
  return `${display || addr} ${(tier && `(Tier ${getTierName(tier)})`) || ''}`
}

export default ({}) => {
  const [participants, participants_set] = useState(null as null | string[])
  const [profiles, profiles_set] = useState(null as null | string[])
  const [wallets, setWallets] = useState<TierWallet[]>([])

  const logs = useLogs(
    {
      contract,
      event: 'PurchasedNFT',
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
    const members = logs?.value && parseMembers(logs.value)

    if (!wallets?.length) {
      setWallets(members as TierWallet[])
    }
  }, [logs?.value?.length])

  useEffect(() => {
    const getRSS3Profiles = async (addresses: string[]) => {
      const response = await axios
        .post('https://pregod.rss3.dev/v1/profiles', { address: addresses })
        .then((v) => v.data)
      profiles_set(response.result)
    }

    if (participants && participants.length) {
      getRSS3Profiles(participants).then(() => {
        participants.sort((a, b) => {
          return (
            Number(checkENS(b, profiles, wallets).includes('.eth')) -
            Number(checkENS(a, profiles, wallets).includes('.eth'))
          )
        })

        participants_set(participants)
      })
    }
  }, [participants])

  useEffect(() => {
    AlchemyClient.nft
      .getOwnersForContract('0x728a15b8636b2b44e8da69e7a58d7b640235b1f5')
      .then((v) => {
        const addresses = v.owners.filter(
          (address) => address !== '0x0000000000000000000000000000000000000000'
        )

        participants_set(addresses)

        return addresses
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
              <code>{checkENS(addr, profiles, wallets)}</code>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
