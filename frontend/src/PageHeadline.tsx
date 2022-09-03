import { useNavigate } from 'react-router-dom'

export default ({ title, subtitle = '', icon = '', small = false }) => {
  return (
    <div className="text-center mb-8">
      <p className={`${small ? 'text-5xl' : 'text-7xl'} select-none`}>{icon}</p>
      <p
        className={`mt-2 ${
          small ? 'text-2xl' : 'text-5xl'
        } font-bold tracking-tight`}
      >
        {title}
      </p>
      <p className="mt-2 text-base text-gray-500">{subtitle}</p>
    </div>
  )
}
