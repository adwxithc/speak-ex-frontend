
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts"

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip p-2 px-3 text-xs  bg-white border  rounded shadow-md">
      <p className=" font-semibold">{label}</p>
      <p className="  text-[#ff5d12]">{`Sessions: ${payload[0].value}`}</p>
      <p className="  text-[#06f]">{`Profit: ${payload[1].value}`}</p>
    </div>
    );
  }

  return null;
};




function RevenueChart({ sessionVsProfit }: { sessionVsProfit: { sessionCount: number; profit: number, month: string, year: string }[] }) {
  const data = useMemo(()=>{
    return sessionVsProfit.map((item)=>({
      xKey:`${item.year}/${item.month}`,
      sessions:item.sessionCount,
      profit:item.profit
    }))
  },[sessionVsProfit])
  return (
    <div className="p-5 w-full">
      <div className="flex justify-between w-full text-sm font-semibold mb-3">
        <div className="">
          <h2 className="text-black/90 text-lg">Overview</h2>
          <p className="text-xs">Your monthy statistics</p>
        </div>

        {/* <div className="p-2 bg-gray-100 rounded-md  flex gap-4 w-64 font-semibold text-xs shadow">
          {
            ['1D', '1W', '1M', '1Y'].map(item => (<span key={item} className="bg-white  flex-1 inline-flex justify-center rounded-md font-semibold items-center text-black/70">{item}</span>))
          }



        </div> */}

      </div>
      <div className="text-sm text-[#ff5d12] text-black/20 font-semibold w-full h-[225px]">
        <ResponsiveContainer >
          <AreaChart data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff5d12" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff5d12" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06f" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='xKey' />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip} />
            <Area type="monotone" dataKey="sessions" stroke="#ff5d12" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="profit" stroke="#06f" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>


    </div>
  )
}

export default RevenueChart
