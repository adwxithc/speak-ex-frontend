import moment from "moment"
import Avatar from "../../../../components/ui/avatar/Avatar"
import { IReport } from "../../../../types/database"

interface IReportData extends IReport{
  reporterDetails:{firstName:string,lastName:string,userName:string,profile:string}
}
function Reports({repotDatas}:{repotDatas:IReportData[]}) {
  return (
    <div className="max-w-xl overflow-x-hidden   ">
      
     
     <h2 className='text-lg font-bold mb-5'>Reports</h2>
     <img className="h-48 w-48 mx-auto mb-5 rounded-full" src="/src/assets/Images/menuIcon/profile.png" alt="" />
     <div className="px-2">
      {
        repotDatas.map(report=>(
          <div className=" bg-black/5 mb-3 rounded shadow p-3 ">
            <div className="flex text-sm items-center justify-between  gap-2 capitalize font-semibold text-black/60 mb-2">
              <div className="flex items-center justify-center gap-2">
                <Avatar className="h-8 w-8" src={report.reporterDetails.profile} />
              <span>{report.reporterDetails.firstName+' '+report.reporterDetails.lastName}</span>
              </div>
              <span className="text-xs font-light">{moment(report.createdAt).format('YYYY-MM-DD')}</span>
            </div>
            <div className="p-1  text-sm text-black/60">
              {
                report.description
              }
              
            </div>
          

          </div>
        ))
      }
      </div>
      
    </div>
  )
}

export default Reports
