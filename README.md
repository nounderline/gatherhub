# ETHWarsaw Hackathon

- The hackathon took place 02.09.2022 18:00 - 04.09.2022 10:00.
- Our team was two Software Engineers.
- Our project is called GatherHub, and it's a [TODO].
- We are not running any backend services. Instead, we're leveraging the project with the integrations mentioned below.
- We intentionally left some of the features and code incomplete due to the minimal nature of the event. Please treat this project as a proof of concept.
- During the hackathon, we hacked a project helping organizations such as ETHWarsaw with features described in detail below.
- At the same time, we wanted to learn as much as possible about incredible projects and companies we met with during the hackathon by integrating some of their tech solutions into our project.

The integrations we:
🔗 deployed our multi-tiered NFT smart contract on Gnosis Chain, and the address of the contract is [TODO]. We didn't even have to use the testnet, because fees were so low!
🤘 used https://usedapp.io for Web3 interactions. Kudos to the creators for filling the tech gap!
⛴ used https://tenderly.co for Webhook->smart contract automation. Fantastic infrastructure project!
💵 used https://ramp.network for one of the features. Super simple integration!
💬 used https://www.arweave.org for storing the messages. Hello permaweb!
🔐 used https://unlock-protocol.com to fetch ETHWarsaw locks from Optimism chain. Since we deployed our contract on Gnosis Chain, we had a chance to experiment with multiple chains in a single dApp.

## Tiered NFT Smart Contract

`contracts/Memberships.sol` has an NFT contract that we implemented to extend the functionalities provided by Unlock protocol by tiered access to our dApp. The three tiers are Participant/Speaker/Host, and then there is a contract owner with the most privileges. We didn't implement specific access control logic, so it's currently easy to bypass tiered access logic, which is beyond this PoC. Next to tiered NFT, we also wanted to make it a dynamic NFT (dNFT), but we dropped this idea for the sake of other features described in this document. However, some of the code is still there, and it might be working fine by displaying a numeric digit when shelving the NFT on Opensea, for example.

## Tenderly automation

In one of the features of GatherHub, the Deals, we introduce the projects to the business and allow them to pay for project services using Ramp. Starting such a purchase will send a Webhook to our Tenderly project, which will interact with our Tiered NFT Smart Contract and emit an event used in the dApp. Please find the code for Tenderly under `actions` directory.
