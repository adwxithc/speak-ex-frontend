import { useMemo } from "react"


function CreditTime() {

  const columns = useMemo(() => [
    { field: 'profile', headerName: 'Avatar'},
    { field: 'firstName', headerName: 'Full Name'},
    
    { field: 'email', headerName: 'Email' },
    { field: 'userName', headerName: 'User Name' },
    { field: 'blocked', headerName: 'Blocked'},
    { field: 'createdAt', headerName: 'Created At'},
    {
      field: "actions",
      headerName: "Actions",
    }
  ], [])

  return (
    <div className="">
      <h1 className="text-3xl mb-5 font-semibold text-center">Users List</h1>
      <div className="  border-2 rounded-md  overflow-auto">
      <table className="min-w-full divide-y divide-gray-200    ">
        <thead className=" ">
          <tr>
            
            {columns.map(item=>(<th scope="col" className="p-5  text-left  font-medium text-gray-500 uppercase tracking-wider">{item.headerName}</th>))}

            
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
            
                <div className="flex-shrink-0 h-10 w-10">
                  <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                </div>
              
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              jane.cooper@example.com
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">ReTechnician</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
           <td>
            1414/65625/252
           </td>
            
            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
              <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
              <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
            </td>
          </tr>
        
          

        </tbody>
      </table>
      </div>
      

    </div>
  )
}

export default CreditTime
