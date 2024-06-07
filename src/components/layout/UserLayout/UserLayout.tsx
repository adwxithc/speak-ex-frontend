
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import Navbar from '../NavBar/user/Navbar'
import Footer from '../Footer/Footer'
import Modal from '../../custom/Modal/Modal'
import { setOpenStore } from '../../../redux/features/user/coinPurchase/coinPurchaseSlice'
import { RootState } from '../../../redux/store'
import Store from '../../../pages/user/Store/Store'
import { setCloseCompleteProfileModal } from '../../../redux/features/user/user/userSlice'
import ProfileCompletionWarning from '../../custom/ProfileCompletionWarning/ProfileCompletionWarning'

function UserLayout() {
  const dispatch = useDispatch()
  const { storeOpen } = useSelector((state: RootState) => state.coinPurchase)
  const { openCompleteProfileModal } = useSelector((state: RootState) => state.user)
  const [modalAnimationCompleted, setModalAnimationCompleted] = useState(false)
  
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
          <Modal {...{ handleModalShowed: () => setModalAnimationCompleted(true) }} loading={false} handleClose={() => { dispatch(setOpenStore(false)) }} >
            <Store {...{ modalAnimationCompleted }} />
          </Modal>
          
        }
        { openCompleteProfileModal&&
          <Modal {...{handleClose:()=>{dispatch(setCloseCompleteProfileModal())},loading:false}}>
            <ProfileCompletionWarning />
          </Modal>
        }
      </AnimatePresence>
    </>
  )
}

export default UserLayout
