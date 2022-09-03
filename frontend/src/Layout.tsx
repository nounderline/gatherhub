import { Link, Outlet } from 'react-router-dom'
import AccountChip from './AccountChip'

export default ({}) => {
  return (
    <>
      <div className="flex m-auto max-w-6xl py-4 pr-4 items-center justify-between mb-16">
        <Link to="/" className="font-bold">
          GatherHub
        </Link>
        <AccountChip />
      </div>

      <div className="m-auto max-w-6xl ">
        <Outlet />
      </div>
    </>
  )
}
