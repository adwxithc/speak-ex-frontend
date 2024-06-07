import { useState } from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps, PieProps, ResponsiveContainer, Sector } from "recharts"


const renderActiveShape = (props: unknown) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius,
        startAngle, endAngle, fill, payload, percent
    } = props as Required<PieLabelRenderProps>;

    // Convert outerRadius to a number
    const outerRadiusNumber = typeof outerRadius === 'number' ? outerRadius : parseFloat(outerRadius);

    const sin = Math.sin(-RADIAN * (midAngle ?? 0));
    const cos = Math.cos(-RADIAN * (midAngle ?? 0));
    const sx = Number(cx ?? 0) + (outerRadiusNumber + 10) * cos;
    const sy = Number(cy ?? 0) + (outerRadiusNumber + 10) * sin;
    const mx = Number(cx ?? 0) + (outerRadiusNumber + 10) * cos;
    const my = Number(cy ?? 0) + (outerRadiusNumber + 10) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload!.name}
            </text>
            <Sector
                cx={Number(cx)}
                cy={Number(cy)}
                innerRadius={Number(innerRadius)}
                outerRadius={outerRadiusNumber}
                // cornerRadius={10}

                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill }
            />
            <Sector
                cx={Number(cx)}
                cy={Number(cy)}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadiusNumber + 6}
                outerRadius={outerRadiusNumber + 10}
                cornerRadius={10}

                fill={ fill }
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            {/* <text x={ex + (cos >= 0 ? 1 : -1) * 8} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text> */}
            <text x={ex + (cos >= 0 ? 1 : -1) * 2} y={ey} dy={5} textAnchor={textAnchor} fill="#999">
                {`(${(percent! * 100).toFixed(2)}%)`}
            </text>
        </g>
    )
};

interface ITransactionsPieChartProps {
    totalProfit: number | null,
    totalEarnings: number | null
}


function TransactionsPieChart({ totalEarnings, totalProfit }: ITransactionsPieChartProps) {
    const profitPersentage = (totalProfit && totalEarnings ? totalProfit / (totalEarnings + totalProfit) * 100 : 0).toFixed(0)
    const earningsPersentage = (totalProfit && totalEarnings ? totalEarnings / (totalEarnings + totalProfit) * 100 : 0).toFixed(0)

    const data = [{
        name: 'Earnings',
        value: totalEarnings,
    },
    {
        name: 'Profit',
        value: totalProfit,
    }]

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const COLORS = ['#0088FE', '#00C49F'];
    const onPieEnter: PieProps['onMouseEnter'] = (_, index) => {
        setActiveIndex(index);
    };
    return (
        <div className="p-5 font-semibold ">
            <h2 className=" text-lg text-black/90">Transactions Statistic</h2>
            <div className="flex justify-center items-center text-xs">
                <div className="h-56 w-full ">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"

                                innerRadius={60}
                                outerRadius={70}
                               
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="text-sm font-semibold text-black/90">
                <div className="mb-5">
                    <span className="">Earnings</span>
                    <div className="mt-2 flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" >
                        <div className={`flex flex-col justify-center overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500 w-[${earningsPersentage}%]`} ></div>
                    </div>
                </div>
                <div >
                    <span className="">Profit</span>
                    <div className="mt-2 flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" >
                        <div className={`flex flex-col justify-center overflow-hidden bg-green-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500 w-[${profitPersentage}%] `} ></div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TransactionsPieChart




