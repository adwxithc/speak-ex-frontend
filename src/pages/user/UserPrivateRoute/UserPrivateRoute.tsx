
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Navigate, Outlet } from 'react-router-dom'

function UserPrivateRoute() {
    const {isAuth} = useSelector((state:RootState)=>state.user)
  return (
    <div>
        {isAuth?<Outlet />: <Navigate to='/signin' />}
    </div>
  )
}

export default UserPrivateRoute
