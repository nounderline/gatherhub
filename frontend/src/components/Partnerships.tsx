export default ({ tier2Wallets }) => {
  return (<div>
    {!tier2Wallets && 'Loading...'}
    {tier2Wallets?.map((wallet) => <div key={wallet.to}>
      {wallet.to} {wallet.tokenId}
    </div>)}
  </div>)
}
