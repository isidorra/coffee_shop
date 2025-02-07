
const AnalyticsCard = ({icon, name, value}) => {
  return (
    <div className="bg-secondary text-primary p-5 rounded-md">
        <div className="bg-accent text-secondary p-1 sm:p-2 text-sm sm:text-base w-fit mb-2">
            {icon}
        </div>
        <p className="text-xs sm:text-base opacity-80">{name}</p>
        <p className="text-xl sm:text-3xl mt-2">{parseFloat(value.toFixed(2))}</p>
    </div>
  )
}

export default AnalyticsCard