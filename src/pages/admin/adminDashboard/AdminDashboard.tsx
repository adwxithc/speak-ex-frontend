import { useEffect, useState } from "react"
import NumericalData from "../../../components/custom/dashboardItems/NumericalData"
import RevenueChart from "../../../components/custom/dashboardItems/RevenueChart"
import TransactionsPieChart from "../../../components/custom/dashboardItems/TransactionsPieChart"
import { useGetDashboardNumericsQuery, useGetMostLikedPostsQuery, useGetMostPopularPlansQuery, useGetSessionVsProfitQuery } from "../../../redux/features/admin/dashboard/dashboardApiSlice"
import { ICoinPurchasePlan, IDashboardNumerics, IPost } from "../../../types/database"
import { IBackendResponse } from "../../../types/queryResults"
import PopularPosts from "../../../components/custom/dashboardItems/PopularPosts"
import PopularPlans from "../../../components/custom/dashboardItems/PopularPlans"


function Dashboard() {
  const [numericalDatas, setNumericalDatas] = useState<IDashboardNumerics | null>(null)
  const [sessionVsProfit, setSessionVsProfit] = useState<{ sessionCount: number; profit: number; month: string; year: string }[]>([])
  const [popularPosts, setPopularPosts] = useState<(IPost & { userData: { firstName: string; lastName: string; profile: string; userName: string; } })[]>([])
  const [popularPlans, setPopularPlans] = useState<ICoinPurchasePlan[]>([])


  const { data: dashboardNumerics } = useGetDashboardNumericsQuery({})
  const { data: sessionVsProfitData } = useGetSessionVsProfitQuery({})
  const { data: popularPostDatas } = useGetMostLikedPostsQuery({});
  const { data: popularPlanDatas } = useGetMostPopularPlansQuery({});

  console.log(popularPostDatas);

  useEffect(() => {
    const data = popularPostDatas as IBackendResponse<(IPost & { userData: { firstName: string; lastName: string; profile: string; userName: string; } })[]>
    setPopularPosts(data?.data)
  }, [popularPostDatas])

  useEffect(() => {
    const data = dashboardNumerics as IBackendResponse<IDashboardNumerics>
    setNumericalDatas(data?.data || null)
  }, [dashboardNumerics])

  useEffect(() => {
    const data = sessionVsProfitData as IBackendResponse<{ sessionCount: number, profit: number, month: string, year: string }[]>
    setSessionVsProfit(data?.data || [])
  }, [sessionVsProfitData])

  useEffect(() => {
    const data = popularPlanDatas as IBackendResponse<ICoinPurchasePlan[]>
    setPopularPlans(data?.data || [])
  }, [popularPlanDatas])



  return (
    <div className="p-1  h-full ">
      <div className="">
        <h1 className="text-2xl font-semibold mb-1 text-black/80">Welcome back, <span className="font-normal">Admin</span></h1>
        <p className="font-semibold text-black/70 text-sm mb-5">Monitor Key Metrics and Enhance our platform Experience.</p>
      </div>
      <div className=" flex flex-wrap gap-5 ">

        <div className="flex flex-wrap flex-[5]  rounded-md gap-5">


          <div className=" flex-1 min-w-40  ">
            <NumericalData {...{ ...numericalDatas?.totalEarnings, title: 'Total Earning', isMoney: true, color: 'bg-green-500' }} />
          </div>
          <div className=" flex-1 min-w-40  ">
            <NumericalData {...{ ...numericalDatas?.totalSessions, title: 'Total Sessions', color: 'bg-red-500' }} />
          </div>
          <div className=" flex-1 min-w-40 ">
            <NumericalData {...{ ...numericalDatas?.totalProfit, title: 'Total Profit', color: 'bg-blue-500' }} />
          </div>



          <div className="flex min-w-[500px] w-full  bg-white shadow-md rounded-md ">
            <RevenueChart {...{ sessionVsProfit }} />
          </div>
          <div className="flex min-w-[500px] w-full justify-center  bg-white shadow-md rounded-md ">
            <PopularPosts {...{ posts: popularPosts }} />
          </div>

        </div>

        <div className="flex flex-col gap-5 flex-[2] ">
          <div className=" min-w-52 w-full   bg-white shadow-md rounded-md">
            <TransactionsPieChart {...{ totalEarnings: numericalDatas?.totalEarnings?.thisMonth || null, totalProfit: numericalDatas?.totalProfit?.thisMonth || null }} />

          </div>
          <div className=" min-w-52 w-full  bg-white shadow-md rounded-md">
            <PopularPlans {...{ popularPlans }} />
          </div>
        </div>





      </div>
    </div>
  )
}

export default Dashboard
