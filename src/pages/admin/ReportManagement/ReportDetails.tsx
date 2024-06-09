
import Button from "../../../components/ui/button/Button"
import { IReportWithUsers } from "../../../types/database"
import Avatar from "../../../components/ui/Avatar/Avatar";

interface IReportDetailsProps{
  selectedReport:IReportWithUsers;
  handleViewUserDetails:(userId:string)=>void
}

function ReportDetails({selectedReport,handleViewUserDetails}:IReportDetailsProps) {
  return (
    <div className="max-w-4xl md:min-w-[300px] border border-primary/20 rounded-md  mb-5">
    <div className="p-3 bg-primary/10 ">
      <h2 className="font-medium text-primary/90 text-center text-xl ">Reports</h2>
    </div>

    <div className="p-2">
    {
      selectedReport.reports.map(r=>(
        <div className="bg-black/5 rounded shadow p-3 text-sm text-black/40 font-medium mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-8 w-8" src={r.reporterInfo.profile} />
            <span className="text-black/80 capitalize">{r.reporterInfo.firstName+' '+r.reporterInfo.lastName}</span>
          </div>
          <div>
            {r.description}
          </div>
        </div>
      ))
    }
    </div>
    
    <div className="flex justify-center mt-4">
      <Button onClick={()=>handleViewUserDetails(selectedReport.reportedUserInfo.id)} varient={'primary-square'} size={'md'}><span>View Repoted User</span></Button>

    </div>

  

  </div>
  )
}

export default ReportDetails
