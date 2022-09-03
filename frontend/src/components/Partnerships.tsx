export default ({ tier3Wallets }) => {
  return (<div>
    {!tier3Wallets && 'Loading...'}
    {tier3Wallets?.map((wallet) => <div key={wallet.to}>
      {wallet.to} {wallet.tokenId}
    </div>)}
  </div>)
}
