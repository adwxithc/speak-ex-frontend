
import { useEffect, useMemo, useState } from "react";
import Table, { IColumns } from "../../../components/custom/Table/Table";
import { useListReportsOnSessionQuery } from "../../../redux/features/admin/report/reportApiSlice";
import { IReportWithUsers } from "../../../types/database";
import PaginationButtons from "../../../components/ui/PaginationButtons/PaginationButtons";

interface IData {
  reporter: string;
  reportedUser: string;
  createdAt: string;
  description: string
}

function ReportManagement() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages,setTotalPages] = useState(0);
  const [reports, setReports] =  useState<IReportWithUsers[]>([])
  const { data: ReportsData } = useListReportsOnSessionQuery({page:currentPage+1})
  // const {reports,totalReports}: = ReportsData?.data

  useEffect(()=>{

    const reports = ReportsData?.data?.reports as IReportWithUsers[]
    const totalReports= ReportsData?.data?.totalReports as number

     setTotalPages(Math.ceil(totalReports/5))
     setReports(reports)

  },[ReportsData?.data?.reports, ReportsData?.data?.totalReports])
 

  const columns: IColumns<IData>[] = [
    { Header: 'Reporter', accessor: 'reporter' },
    { Header: 'Reported User', accessor: 'reportedUser' },
    { Header: 'CreatedAt', accessor: 'createdAt' },
    { Header: 'Description', accessor: 'description' }
  ];


  const data = useMemo(() => {
    if (!reports || !reports.length) return []
    const data = reports.map(r => ({
      reporter: r.reporterInfo.firstName + ' ' + r.reporterInfo.lastName,
      reportedUser: r.reportedUserInfo.firstName + ' ' + r.reportedUserInfo.lastName,
      createdAt: r.createdAt,
      description: r.description
    }))
    return data
  }, [reports])



  return (
    <div className="">

      <h1 className="text-3xl mb-5 font-semibold text-center">Session Reports</h1>
     
      <div className=" border  rounded-md  overflow-auto">
        <Table columns={columns} data={data} RowAction={(row: IData) => alert(row.reportedUser)} />
      </div>
      <div>

        <PaginationButtons {...{currentPage,setCurrentPage,totalPages}} />

      </div>


    </div>


  )
}

export default ReportManagement
