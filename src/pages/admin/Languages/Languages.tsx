import {  useMemo } from "react"
import PaginationButtons from "../../../components/ui/PaginationButtons/PaginationButtons"
import useDataFetcher from "./useDataFetcher"
import Button from "../../../components/ui/Button/Button"
import { Plus } from "lucide-react"
import ToolTip from "../../../components/ui/ToolTip/ToolTip"
import { useNavigate } from "react-router-dom"
import moment from "moment"



function Languages() {

  const naviage= useNavigate()

  const columns = useMemo(() => [
    {  headerName: 'Id'},
    {  headerName: 'Name' },
    {  headerName: 'BasePrice'},
    {  headerName: 'Created At'},
    
  ], [])

  

  const { 
    loading,
    languages,
    totalPages,
    currentPage,
    setCurrentPage
} = useDataFetcher()



  return (
    <div className="">
      <div className="flex justify-end">
        <ToolTip tooltip="Add Language">
        <Button type="button" onClick={()=>naviage('/admin/add-language')} varient={'primary'} size={'icon'}><Plus /></Button>
        </ToolTip>
        
      </div>
      <h1 className="text-3xl mb-5 font-semibold text-center">Users List</h1>
      <div className=" border  rounded-md  overflow-auto">
      <table className="min-w-full divide-y divide-gray-200    ">
        <thead className=" bg-secondary ">
          <tr >
            
            {columns.map(item=>(<th scope="col" className="p-5  text-left  font-medium  uppercase text-black tracking-wider">{item.headerName}</th>))}

            
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ?<span className="text-center text-2xl">loading...</span>:
          <>
          {languages.map((item)=>(<tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.basePrice}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {moment(item.createdAt).format('YYYY-MM-DD HH:MM:SS')}
            </td>
           
          </tr>))}
          </>
         }

        </tbody>
      </table>
      </div>
      <div>
        
      <PaginationButtons totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      </div>
      

    </div>
  )
}

export default Languages

