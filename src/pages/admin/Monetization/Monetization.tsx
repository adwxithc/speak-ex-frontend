
import { IMonetizationRequestData } from "../../../types/database";
import Table, { IColumns } from "../../../components/custom/table/Table";
import { useEffect, useState } from "react";
import Modal from "../../../components/custom/modal/Modal";
import UserDetails from "../UserDetails.tsx/UserDetails";
import Avatar from "../../../components/ui/Avatar/Avatar";
import { useGetMonetizationRequestsQuery } from "../../../redux/features/admin/monetization/monetizationApiSlice";
import moment from "moment";
import PaginationButtons from "../../../components/ui/paginationButtons/PaginationButtons"
import { AnimatePresence } from "framer-motion";
import DialogBox from "../../../components/custom/dialogBox/DialogBox";


function Monetization() {

  const [userId, setUserId] = useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] =  useState([])
  const [selectedRequest, setSelectedRequest] = useState<IMonetizationRequestData|null>(null)

  const {data:MonetizationRequestData} = useGetMonetizationRequestsQuery({page:currentPage+1})


  useEffect(()=>{
    const requests =MonetizationRequestData?.data?.requests ||[] as IMonetizationRequestData[]
    const totalRequests = MonetizationRequestData?.data?.totalRequests as number

    setTotalPages(Math.ceil(totalRequests / 5))
    setData(requests)

  },[MonetizationRequestData?.data?.requests, MonetizationRequestData?.data?.totalRequests])

 

  const handelCloseUserDetails = ()=>{
    setUserId('')
  }

  const handleViewUserDetails =(userId:string)=>{
    setUserId(userId)
  }


  const handleShowUser=(row:IMonetizationRequestData)=>{
   
    return (
      <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={()=>handleViewUserDetails(row.userData.id)}>
        <Avatar className="h-10 w-10 border" src={row.userData.profile} />
        <span>{row.userData.firstName+' '+row.userData.lastName}</span>
      </div>
    )
  }

  const columns: IColumns<IMonetizationRequestData>[] = [
    { Header: 'User', accessor: 'userData', Cell:handleShowUser },
    { Header: 'Created At', accessor: 'createdAt', Cell:(row:IMonetizationRequestData)=><span>{moment(row.createdAt).format('YYYY-MM-DD')}</span> },
    { Header: 'Description', accessor: 'description', Cell:(row:IMonetizationRequestData)=><span className="cursor-pointer" onClick={()=>setSelectedRequest(row)}>{row.description}</span> },
    { Header: 'Id', accessor: 'id' },
    { Header: 'Status', accessor: 'status' },

   
  ];

  
  return (

    <>
      <div className="">

        <h1 className="text-3xl mb-6 font-semibold text-center"> Monetization Requests</h1>

        <div className=" border  rounded-md  overflow-auto">
          <Table columns={columns} data={data}  />
        </div>
        <div>
          <PaginationButtons {...{ currentPage, setCurrentPage, totalPages }} />
        </div>


      </div>
      <AnimatePresence mode="wait" initial={false}>
      {
        userId && (
          <Modal className="bg-gray-50" handleClose={handelCloseUserDetails} loading={false} >
            <UserDetails {...{userId}} />
          </Modal>
        )
      }
     </AnimatePresence>

     <DialogBox isOpen={Boolean(selectedRequest)} onClose={()=>setSelectedRequest(null)}>
      <div className="p-2">
        <h2 className="text-center text-lg text-black/80 font-semibold mb-3">User's message</h2>
        <p className="text-sm text-black/60 text-center font-semibold">{selectedRequest?.description}</p>
        
      </div>
     </DialogBox>
      
    </>
  )
}

export default Monetization
