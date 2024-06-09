
import { useEffect, useMemo, useState } from "react";
import Table, { IColumns } from "../../../components/custom/table/Table";
import { useListReportsOnSessionQuery } from "../../../redux/features/admin/report/reportApiSlice";
import { IReportWithUsers } from "../../../types/database";
import PaginationButtons from "../../../components/ui/paginationButtons/PaginationButtons";
import Modal from "../../../components/custom/modal/Modal";
import ReportDetails from "./ReportDetails";
import UserDetails from "../UserDetails.tsx/UserDetails";
import Avatar from "../../../components/ui/avatar/Avatar";
import { AnimatePresence } from "framer-motion";


interface IData {
  firstName: string;
  lastName: string;
  userName:string;
  id: string;
  profile: string;
  reportCount: number;
  repotedUser?:string;
  reporters:string[]
}

function ReportManagement() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openReport, setOpenReport] = useState(false)
  const [userId, setUserId] = useState('')

  const [reports, setReports] = useState<IReportWithUsers[]>([])
  const [selectedReport, setSelectedReport] = useState<IReportWithUsers | null>(null)
  
  const { data: ReportsData } = useListReportsOnSessionQuery({ page: currentPage + 1 })
  // const {reports,totalReports}: = ReportsData?.data

  useEffect(() => {

    const reports = ReportsData?.data?.reports as IReportWithUsers[]
    const totalReports = ReportsData?.data?.totalReports as number

    setTotalPages(Math.ceil(totalReports / 5))
    setReports(reports)

  }, [ReportsData?.data?.reports, ReportsData?.data?.totalReports])

  const handleShowUser=(row:IData)=>{
   
    return (
      <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={()=>handleViewUserDetails(row.id)}>
        <Avatar className="h-10 w-10 border" src={row.profile} />
        <span>{row.firstName+' '+row.lastName}</span>
      </div>
    )
  }

  const handleShowReporters =(row:IData)=>{
    console.log(row);
    
    return( 
      <div className="flex relative items-center cursor-pointer" onClick={()=>handleViwReports(row)}>
        {
          row.reporters.map((reporter,i)=>(<span style={{zIndex:`${i}`,position:'absolute',left:`${i*20}px`}}>{i<4?<Avatar className={`h-10 w-10  `}  src={reporter} />:i==4 &&row.reporters.length-4>0 &&<span className="text-white h-10 w-10 bg-black/80 p-2.5 rounded-full inline-flex items-center justify-center">+{row.reporters.length-4}</span>}</span>))
        }
      </div>
    )
  }

  const columns: IColumns<IData>[] = [
    { Header: 'Reported User', accessor: 'repotedUser', Cell:handleShowUser },
    { Header: 'User Name', accessor: 'userName' },
    { Header: 'id', accessor: 'id' },
    { Header: 'Report Count', accessor: 'reportCount' },
    { Header: 'Reports', accessor: 'reporters' , Cell:handleShowReporters},
  ];


  const data = useMemo(() => {
    if (!reports || !reports.length) return []
    const data = reports.map(r => ({
      firstName:r.reportedUserInfo.firstName,
      lastName:r.reportedUserInfo.lastName,
      profile:r.reportedUserInfo.profile,
      id:r.reportedUserInfo.id,
      userName:r.reportedUserInfo.userName,
      reportCount:r.reports.length,
      reporters:r.reports.map(reporter=>reporter.reporterInfo.profile)

    }))
    return data
  }, [reports])

  const handleViwReports = (row: IData) => {
    const info = reports.find(r => r.reportedUserInfo.id == row.id)
    setSelectedReport(info || null)
    setOpenReport(true)
  }
  const handleCloseReprtInfo = () => {
    setOpenReport(false)
  }

  const handelCloseUserDetails = ()=>{
    setUserId('')
  }

  const handleViewUserDetails =(userId:string)=>{
    setUserId(userId)
  }



  return (

    <>
      <div className="">

        <h1 className="text-3xl mb-5 font-semibold text-center">Session Reports</h1>

        <div className=" border  rounded-md  overflow-auto">
          <Table columns={columns} data={data}  />
        </div>
        <div>
          <PaginationButtons {...{ currentPage, setCurrentPage, totalPages }} />
        </div>


      </div>
      <AnimatePresence mode="wait" initial={false}>

      {
        openReport && selectedReport && (
          <Modal handleClose={handleCloseReprtInfo} loading={false} >
            <ReportDetails {...{ selectedReport,handleViewUserDetails }} />
          </Modal>
        )
      }

      {
        userId && (
          <Modal className="bg-gray-50" handleClose={handelCloseUserDetails} loading={false} >
            <UserDetails {...{userId}} />
          </Modal>
        )
      }
      </AnimatePresence>

    </>
  )
}

export default ReportManagement
