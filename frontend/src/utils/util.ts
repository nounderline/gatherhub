export interface TierWallet {
  tier: number
  to: string
  tokenId: number
}

export const filterMemberByTier = (value: any, tier: number) =>
  value.filter((log) => log.data.tier === tier)

export const getTierName = (tier: number): string => {
  switch (tier) {
    case 1: return 'Participant'
    case 2: return 'Speaker'
    case 3: return 'Host'
    default: return 'Unknown'
  }
}

export const parseMembers = (value: any): TierWallet[] => value.map((item: any) => ({
  tier: item.data.tier,
  to: item.data.to,
  tokenId: item.data.tokenId.toNumber(),
}))
