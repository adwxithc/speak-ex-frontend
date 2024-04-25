import {  useMemo } from "react"
import PaginationButtons from "../../../components/ui/PaginationButtons/PaginationButtons"
import useDataFetcher from "../Users/useDataFetcher"
import moment from 'moment'
import Button from "../../../components/ui/Button/Button"
import Avatar from "../../../components/ui/Avatar/Avatar"
import { useUpdateUserMutation } from "../../../redux/features/admin/listUsers/usersListApiSlice"


function Users() {

  const columns = useMemo(() => [
    {  headerName: 'Avatar'},
    {  headerName: 'Full Name'},
    
    {  headerName: 'Email' },
    {  headerName: 'User Name' },
    
    {  headerName: 'Created At'},
    {  headerName: 'Block'},
  ], [])

  

  const { loading,
    users,
    totalPages,
    currentPage,
    setUsers,
    setCurrentPage} = useDataFetcher()

    const [updateUser] = useUpdateUserMutation()
    const handleBlock = async(id:string,status:boolean)=>{
      const data = { id: id, blocked: status }
      
      const res = await updateUser(data).unwrap()

      setUsers((prev)=>{
         return prev.map((user)=>{
          if(user.id===res.data.id) return res.data
          return user
         })
      })
      
      
    }

  return (
    <div className="">
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
          {users.map((item)=>(<tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap">
            
                <div className="flex-shrink-0 h-10 w-10">
               
                  <Avatar className="h-10 w-10 rounded-full" src={`${item.profile || 'http://localhost:3000/Images/profilePlaceholder/profilePlaceholder.jpg'}`} />
                </div>
              
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{item.firstName+' '+item.lastName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{item.userName}</div>
            </td>
           
           <td>
            {moment(item.createdAt).format('YYYY-MM-DD HH:MM:SS')}
           </td>
            
            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
              {
                item.blocked
                ?<Button varient={'success-outline'} size={'sm'} className="ml-2" onClick={()=>handleBlock(item.id,false)}>unblock</Button>
                :<Button varient={'danger-outline'} size={"sm"} onClick={()=>handleBlock(item.id,true)}  className="ml-2 ">block</Button>
              }
              
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

export default Users
