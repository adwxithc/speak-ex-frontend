import Skeleton from "react-loading-skeleton";

interface NumericalDataProps {
  thisMonth?: number;
  lastMonth?: number;
  title?: string;
  isMoney?: boolean;
  color:string;
}
function NumericalData({ lastMonth, thisMonth, title, isMoney,color }: NumericalDataProps) {

  if(lastMonth==undefined ||thisMonth==undefined ||title==undefined ) return <Skeleton  className='h-32  w-full  shadow-md rounded-md' />

  const percentageChange = parseFloat((((thisMonth-lastMonth)/lastMonth)*100).toFixed(2))
  return (
    <div className="p-5 bg-white shadow rounded-md">
      <div className="flex justify-between text-sm font-semibold">
        <span className="mb-3">{title}</span>
        <span className={`${percentageChange>0?'text-green-500':'text-red-500'}`}>{percentageChange}%</span>
      </div>
      <div className="mb-2">
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" >
          <div className={`flex flex-col justify-center overflow-hidden ${color} text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500 `} style={{width:`${Math.abs(percentageChange)}%`}}></div>
        </div>
      </div>
      <h4 className="font-semibold text-black/80 text-3xl text-center ">{ isMoney && <span>&#8377;</span> }{thisMonth}</h4>
    </div>
  )
}

export default NumericalData
