import { Link, useNavigate } from 'react-router-dom'

export default ({ title = '', children, to = '' }) => {
  const navigate = useNavigate()

  return (
    <div
      className="rounded-lg bg-gray-50 border-1px p-2 shadow-md flex items-center justify-center py-12 cursor-pointer hover:bg-white hover:shadow-lg transition-all p-4"
      onClick={() => navigate(to)}
    >
      {title && (
        <div className=" border-b-2 border-blue-50 pb-2">
          <div className="font-bold text-center">
            <Link to={to}>{title}</Link>
          </div>
        </div>
      )}

      <div className="py-2">{children}</div>
    </div>
  )
}
