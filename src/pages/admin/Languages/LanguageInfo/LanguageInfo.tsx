import { useParams } from "react-router-dom"
import LanguageRateCalculationEquation from "../../../../components/custom/LanguageRateCalculator.tsx/LanguageRateCalculator"
import Button from "../../../../components/ui/Button/Button"
import LearnerHelperChart from "./LearnerHelperChart"
import SessionRate from "./SessionRate"
import { useGetLanguageInfoQuery } from "../../../../redux/features/admin/languages/languagesApiSlice"
import { useEffect } from "react"

function LanguageInfo() {
  const {languageId} = useParams()
  const {data,refetch,isLoading} = useGetLanguageInfoQuery({languageId})
  console.log(data,isLoading);
  useEffect(()=>{
   
    refetch()
  },[refetch])
  return (
    <div className="h-full w-full px-8">

    <h2 className="font-semibold text-2xl mb-4 text-center ">Language Info</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-8 sm:px-3">

      <div className="col-span-2 sm:col-span-1 ">
        
        <div className="  w-full  rounded-md shadow-md p-2 px-8 bg-white">
        <h3 className="font-semibold text-gray-700 text-lg text-center mb-3">Learner helper ratio</h3>
          <LearnerHelperChart {...{helpersCount:data?.data?.helpersCount,learnersCount:data?.data?.learnersCount}} />
        </div>
        
      </div>

      <div className="col-span-2 sm:col-span-1">
        
        <div className="  w-full  rounded-md shadow-md p-2 px-8 bg-white">
        <h3 className="font-semibold text-gray-700 text-lg mb-3 text-center">Monthly sessions</h3>
          <SessionRate />
        </div>
      </div>
     
      <div className="col-span-2  mt-5">

      <div className="flex justify-center">
      <LanguageRateCalculationEquation {...{helpersCount:data?.data?.helpersCount,learnersCount:data?.data?.learnersCount,basePriceValue:data?.data?.basePrice}} />
      </div>
       <div className="flex justify-end mr-40">
       <Button varient={'primary-square'} size={'md'}>Update</Button>
       </div>

        

      </div>

      
      

      </div>
       
      
    </div>
  )
}

export default LanguageInfo
