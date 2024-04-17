
import Navbar from '../NavBar/user/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default UserLayout
