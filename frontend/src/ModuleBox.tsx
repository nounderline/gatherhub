import { Link } from 'react-router-dom'

export default ({ title = '', children, to = '' }) => {
  return (
    <div className="rounded-md bg-slate-300 p-2 shadow-md">
      <div className=" border-b-2 border-blue-50 py-2">
        <div className="font-bold">
          <Link to={to}>{title}</Link>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  )
}
