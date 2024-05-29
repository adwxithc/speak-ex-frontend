
import Navbar from '../NavBar/user/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Modal from '../../custom/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenStore } from '../../../redux/features/user/coinPurchase/coinPurchaseSlice'
import { AnimatePresence } from 'framer-motion'
import { RootState } from '../../../redux/store'
import { useState } from 'react'
import Store from '../../../pages/user/Store/Store'

function UserLayout() {
  const dispatch = useDispatch()
  const { storeOpen } = useSelector((state: RootState) => state.coinPurchase)
  const [modalAnimationCompleted, setModalAnimationCompleted] =useState(false)
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>

      <AnimatePresence
        initial={false}
        mode="wait"

      >
        {
          storeOpen &&
          <Modal {...{handleModalShowed:()=>setModalAnimationCompleted(true)}} loading={false} handleClose={() => { dispatch(setOpenStore(false)) }} >
          <Store {...{modalAnimationCompleted}} />
        </Modal>
        }
        
      </AnimatePresence>

    </>
  )
}

export default UserLayout
