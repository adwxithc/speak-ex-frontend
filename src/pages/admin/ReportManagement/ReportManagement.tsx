
import { useEffect, useMemo, useState } from "react";
import Table, { IColumns } from "../../../components/custom/Table/Table";
import { useListReportsOnSessionQuery } from "../../../redux/features/admin/report/reportApiSlice";
import { IReportWithUsers } from "../../../types/database";
import PaginationButtons from "../../../components/ui/PaginationButtons/PaginationButtons";
import Modal from "../../../components/custom/Modal/Modal";
import moment from "moment";
import Button from "../../../components/ui/Button/Button";
import { Textarea } from "@headlessui/react";
import { SendHorizontal } from "lucide-react";


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
        openReport && (
          <Modal handleClose={handleCloseReprtInfo} loading={false} >
            <div className="max-w-4xl border border-primary/20 rounded-md overflow-hidden mb-5">
              <div className="p-3 bg-primary/10 ">
                <h2 className="font-medium text-primary/90 text-center text-xl ">Report</h2>
              </div>

              <div className="flex flex-col p-4 ">
                <p className="mb-2 font-semibold"><span>From: </span><span className="text-black/70  ml-1 capitalize "> {selectedReport?.reporterInfo.firstName + " " + selectedReport?.reporterInfo.lastName}</span></p>
                <p className="mb-5 font-semibold"><span>On: </span><span className=" text-black/70  ml-1 capitalize " > {selectedReport?.reportedUserInfo.firstName + " " + selectedReport?.reportedUserInfo.lastName}</span></p>
                <div className="font-semibold"><span className=" ">Content: </span><p className="ml-4 font-normal text-black/50">{selectedReport?.description}</p ></div>

              </div>
              <div className="flex justify-center mt-4">
                <Button varient={'primary-square'} size={'md'}><span>View Repoted User</span></Button>

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

          </Modal>
        )
      }

    </>



  )
}

export default ReportManagement
