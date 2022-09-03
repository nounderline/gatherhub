import { Alchemy, Network } from 'alchemy-sdk'

export const AlchemyBaseURL =
  'https://opt-mainnet.g.alchemy.com/v2/8dIyTYfLH14zceqVpj5ANBh20pInxDNK'

export const AlchemyClient = new Alchemy({
  apiKey: '8dIyTYfLH14zceqVpj5ANBh20pInxDNK',
  network: Network.OPT_MAINNET,
})
