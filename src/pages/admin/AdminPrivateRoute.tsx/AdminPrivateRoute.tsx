import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import {RootState} from '../../../redux/store'

function AdminPrivateRoute() {
    const {isAuth} = useSelector((state:RootState)=>state.admin)
  return (
    <>
    {isAuth?<Outlet />: <Navigate to='/admin/signin' />}
    </>
  )
}

export default AdminPrivateRoute
