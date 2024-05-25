import { useLocation, useNavigate, useParams } from "react-router-dom"
import LanguageRateCalculator from "../../../../components/custom/LanguageRateCalculator.tsx/LanguageRateCalculator"
import Button from "../../../../components/ui/Button/Button"
import LearnerHelperChart from "./LearnerHelperChart"

import { useGetLearnerHelperRatioQuery, useGetMonthlySessionsQuery, useUpdateLanguageMutation } from "../../../../redux/features/admin/languages/languagesApiSlice"
import { useEffect, useState } from "react"
import SessionRate from "./SessionRate"
import toast from "react-hot-toast"
import { IBackendResponse } from "../../../../types/queryResults"
import { ILanguage } from "../../../../types/database"
import { ChevronLeft } from "lucide-react"

function LanguageInfo() {
  const { languageId } = useParams()
  const location = useLocation();
  const { name } = location.state;
  const navigate =  useNavigate()

  const { data: languageRatiodata, refetch: refetchRatio } = useGetLearnerHelperRatioQuery({ languageId })
  const languageRatio = languageRatiodata?.data;

  const { data: sessionCountData, refetch: refetchMonthlySessionCount } = useGetMonthlySessionsQuery({ languageId });
  const sessionCounts = sessionCountData?.data

  const [basePrice, setBasePrice] = useState(0);
  const [rate, setRate] = useState(0)

  const [updateLanguage] = useUpdateLanguageMutation()

  const handleUpdateLanguage = async () => {

    try {
      const res = await updateLanguage({ basePrice, rate, languageId }).unwrap() as IBackendResponse<ILanguage>

      if (res?.success) {
        toast.success(res.message || 'language updated', { position: 'top-center' })
      }
    } catch (error) {
      toast.error('Something went wrong')
    }

  }
  useEffect(() => {
    refetchMonthlySessionCount()
    refetchRatio()
  }, [refetchMonthlySessionCount, refetchRatio])

  useEffect(() => {

    setBasePrice(languageRatio?.basePrice)
  }, [languageRatio])
  

  return (
    <div className="h-full w-full xl:px-8">

      <h2 className="font-semibold text-2xl mb-4 text-center capitalize">{name}</h2>
      <div>
        <Button varient={'primary-square'} size={'sm'} onClick={()=>navigate('/admin/languages')}><ChevronLeft /> Back</Button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:px-3">

        <div className="col-span-2 sm:col-span-1 md:px-5 p-3">

          <div className="  w-full  rounded-md shadow-md pl-0  p-2 pr-8 bg-white">
            <h3 className="font-semibold text-gray-700 md:text-lg  text-center mb-3">Learner helper ratio</h3>
            <LearnerHelperChart {...{ helpersCount: languageRatio?.helpersCount, learnersCount: languageRatio?.learnersCount }} />
          </div>

        </div>

        <div className="col-span-2 sm:col-span-1 md:px-5 p-3">

          <div className="  w-full  rounded-md shadow-md pl-0 p-2 pr-8 bg-white">
            <h3 className="font-semibold text-gray-700 md:text-lg mb-3 text-center">Monthly sessions</h3>
            <SessionRate {...{ sessionCounts }} />
          </div>
        </div>

        <div className="col-span-2  md:px-5">

          <div className="bg-white shadow-md pb-3 pt-7 pl-0 rounded-md">
            <div className="md:ml-20">
              <LanguageRateCalculator {...{ helpersCount: languageRatio?.helpersCount, learnersCount: languageRatio?.learnersCount, rate, setRate, basePrice, setBasePrice }} />
            </div>
            <div className="flex justify-end mr-10">
              <Button onClick={handleUpdateLanguage} varient={'primary-square'} size={'md'}>Update</Button>
            </div>
          </div>
         

        </div>

      </div>


    </div>
  )
}

export default LanguageInfo
