import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, useState } from 'react'

import { classNames } from '../../../../utils/style-utils.tsx'
import ProfileDropdown from '../../../custom/ProfileDropdown/ProfileDropdown.tsx'
import useScrollDetection from '../../../../hooks/useScrollDetection.tsx'
import useNavigation from './useNavigation.tsx'
import { RootState } from '../../../../redux/store.ts'
import Button from '../../../ui/Button/Button.tsx'
import LanguageSelector from '../../../custom/LanguageSelector/LanguageSelector.tsx'
import { useTranslation } from 'react-i18next'
import Modal from '../../../custom/Modal/Modal.tsx'
import NotificationBar from '../../../custom/NotificationBar/NotificationBar.tsx'
import useNotifications from '../../../../pages/user/Notifications/useNotifications.tsx'
import MobileMenu from './MobileMenu/MobileMenu.tsx'
import useGetWallet from './useGetWallet.tsx'
import { Bell, Menu, X } from 'lucide-react'
import SessionOffer from '../../../custom/SessionOffer/SessionOffer.tsx'
const SearchUser =lazy(()=>import('../../../../pages/user/SearchUser/SearchUser.tsx')) 



export default function Navbar() {
  const { t } = useTranslation(['common'])

  const { isAuth } = useSelector((state: RootState) => state.user)
  const { unreadedNotifications } = useSelector((state: RootState) => state.notification)
 
  const navigate = useNavigate()
  const [openSearch, setOpenSearch] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)

  const navigation = useNavigation({ setOpenSearch })

  const { handleJoinSession, handleRejectOffer, openSessionOffer,handleClose } = useNotifications({setOpenNotification})
  useGetWallet()

  const isScrolled: boolean = useScrollDetection(0)


  return (
    <>
      <Disclosure as="nav" className='bg-white border-b-secondary sticky top-0 w-full z-10 drop-shadow-sm '>
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className={`relative flex items-center justify-between ${isScrolled ? 'h-16 ' : 'h-24'} transition duration-300 ease`}>
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-black hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                      
                    ) : (
                     
                      <Menu className="block h-6 w-6" aria-hidden="true"  />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="/Images/logo/logo.webp"
                      alt="Speak Ex"
                    />
                  </div>
                  <div className="hidden sm:ml-16 sm:block">
                    <div className="flex space-x-5">
                      {navigation.filter(item => (!item.isPrivate || (item.isPrivate && isAuth))).map((item) => (
                        <div key={item.name} className='relative group px-3 py-2'>
                          <a
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-black ',
                              'text-sm font-medium cursor-pointer'
                            )}
                            
                            onClick={item.action}
                          >
                            {item.name}
                          </a>
                          <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full`}></span>
                        </div>
                      ))}
                      <div className='mt-1.5'><LanguageSelector /></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6  ">
                  {isAuth ?
                    <>

                      <button
                        onClick={() => setOpenNotification(true)}
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        
                        <Bell className="h-6 w-6" aria-hidden="true" />
                        { unreadedNotifications!==0&&
                        <span className='h-4 w-4 top-0 -left-2 absolute bg-red-500 rounded-full text-xs text-white flex justify-center items-center'>{unreadedNotifications}</span>

                        }
                      </button>
                      
                      <ProfileDropdown />

                    </>
                    :
                    <Button className=' text-xs sm:text-base px-2 sm:px-4'  varient={'primary-outline'} size={'sm'} onClick={() => navigate('/signin')}>{t('login', { ns: 'common' })}</Button>
                  }
                </div>
              </div>
            </div>

                {/* mobile view */}
            <Transition
              as={DisclosurePanel}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 transform -translate-y-1"
              enterTo="opacity-100 transform translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 transform translate-y-0"
              leaveTo="opacity-0 transform -translate-y-1"
            >
              <div className="sm:hidden absolute bg-white w-full h-screen">
                <MobileMenu {...{ navigation }} />
              </div>
            </Transition>
          </>
        )}
      </Disclosure>

      <AnimatePresence
        initial={false}

        mode="wait"
      >
        {openSearch && <Modal position='top-20' loading={false} handleClose={() => { setOpenSearch(false) }} ><SearchUser {...{ setOpenSearch }} /></Modal>}
        {openSessionOffer && <Modal position='top-20' loading={false} handleClose={handleRejectOffer} ><SessionOffer {...{ handleJoinSession, handleRejectOffer }} /></Modal>}
        {openNotification &&
          <NotificationBar {...{ notifications:[], handleJoinSession,handleClose }}  />
        }
      </AnimatePresence>
    </>
  )
}
