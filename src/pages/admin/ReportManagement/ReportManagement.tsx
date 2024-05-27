
import { useEffect, useMemo, useState } from "react";
import Table, { IColumns } from "../../../components/custom/Table/Table";
import { useListReportsOnSessionQuery } from "../../../redux/features/admin/report/reportApiSlice";
import { IReportWithUsers } from "../../../types/database";
import PaginationButtons from "../../../components/ui/PaginationButtons/PaginationButtons";
import Modal from "../../../components/custom/Modal/Modal";
import moment from "moment";
import ReportDetails from "./ReportDetails";
import UserDetails from "../UserDetails.tsx/UserDetails";


interface IData {
  id: string;
  reporter: string;
  reportedUser: string;
  createdAt: string;
  description: string
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


  const columns: IColumns<IData>[] = [
    { Header: 'Reporter', accessor: 'reporter' },
    { Header: 'Reported User', accessor: 'reportedUser' },
    { Header: 'CreatedAt', accessor: 'createdAt' },
    { Header: 'Description', accessor: 'description' }
  ];


  const data = useMemo(() => {
    if (!reports || !reports.length) return []
    const data = reports.map(r => ({
      id: r.id,
      reporter: r.reporterInfo.firstName + ' ' + r.reporterInfo.lastName,
      reportedUser: r.reportedUserInfo.firstName + ' ' + r.reportedUserInfo.lastName,
      createdAt: moment(r.createdAt).format('YYYY-MM-DD HH:MM:SS'),
      description: r.description
    }))
    return data
  }, [reports])

  const handleViwMoreInfo = (row: IData) => {
    const info = reports.find(r => r.id == row.id)
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
          <Table columns={columns} data={data} RowAction={(row: IData) => handleViwMoreInfo(row)} />
        </div>
        <div>
          <PaginationButtons {...{ currentPage, setCurrentPage, totalPages }} />
        </div>


      </div>

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

    </>



  )
}

export default ReportManagement
