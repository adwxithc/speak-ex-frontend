import { useEffect, useState } from 'react'
import { useGetUsersMutation } from '../../../redux/features/admin/listUsers/usersListApiSlice';
import { IUser } from '../../../types/database';

function useDataFetcher() {


    const [totalPages,setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true)
    const [users,setUsers] = useState<IUser[]>([])
    const [currentPage, setCurrentPage] = useState(0);

    const [getUsersList] = useGetUsersMutation()

    useEffect(()=>{
        const fetchData=async()=>{
                   const res = await getUsersList({ page: currentPage + 1}).unwrap()
                   const { users, totalUsers } = res.data
                
                   setUsers(()=>[...users])
                   setTotalPages(Math.ceil(totalUsers/5))
                   setLoading(false)
        }
        fetchData();
    },[currentPage,getUsersList])

  return {
    loading,
    users,
    totalPages,
    currentPage,
    setCurrentPage,
    setUsers
  }
}

export default useDataFetcher
