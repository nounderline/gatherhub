export default ({ title, subtitle, icon = '' }) => {
  return (
    <div className="text-center">
      <p className="text-7xl select-none">{icon}</p>
      <p className="mt-2 text-4xl font-bold tracking-tight">{title}</p>
      <p className="mt-2 text-base text-gray-500">{subtitle}</p>
    </div>
  )
}
