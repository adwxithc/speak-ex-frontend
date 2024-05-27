import { SendHorizontal } from "lucide-react"
import Button from "../../../components/ui/Button/Button"
import { Textarea } from "@headlessui/react"
import { IReportWithUsers } from "../../../types/database"

interface IReportDetailsProps{
  selectedReport:IReportWithUsers;
  handleViewUserDetails:(userId:string)=>void
}

function ReportDetails({selectedReport,handleViewUserDetails}:IReportDetailsProps) {
  return (
    <div className="max-w-4xl md:min-w-[300px] border border-primary/20 rounded-md overflow-hidden mb-5">
    <div className="p-3 bg-primary/10 ">
      <h2 className="font-medium text-primary/90 text-center text-xl ">Report</h2>
    </div>

    <div className="flex flex-col p-4 ">
      <p className="mb-2 font-semibold"><span>From: </span><span className="text-black/70  ml-1 capitalize "> {selectedReport?.reporterInfo.firstName + " " + selectedReport?.reporterInfo.lastName}</span></p>
      <p className="mb-5 font-semibold"><span>On: </span><span className=" text-black/70  ml-1 capitalize " > {selectedReport?.reportedUserInfo.firstName + " " + selectedReport?.reportedUserInfo.lastName}</span></p>
      <div className="font-semibold"><span className=" ">Content: </span><p className="ml-4 font-normal text-black/50">{selectedReport?.description}</p ></div>

    </div>
    <div className="flex justify-center mt-4">
      <Button onClick={()=>handleViewUserDetails(selectedReport.reportedUser)} varient={'primary-square'} size={'md'}><span>View Repoted User</span></Button>

    </div>

    <div className=" p-2 ">
      <div className=" bg-black/5 rounded-xl hover:shadow-md">
        <Textarea placeholder="Give replay..." className={'text-black/70 mt-3 block w-full bg-transparent outline-none resize-none  border-none  py-1.5 px-3 text-sm/6'} rows={2}></Textarea>

        <div className="flex justify-end pr-2 pb-2 text-primary/80">
          <Button className=" " ><SendHorizontal /></Button>
        </div>

      </div>
    </div>

  </div>
  )
}

export default ReportDetails
