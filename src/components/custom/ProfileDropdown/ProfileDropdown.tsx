import { Fragment } from 'react'
import {Menu, Transition} from '@headlessui/react'
import {classNames} from '../../../utils/style-utils'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import CoinsList from '../CoinsList.tsx/CoinsList'




export default function ProfileDropdown() {

  const { userData } = useSelector((state: RootState) => state.user)
  return (
    <Menu as="div" className="relative ml-3 hidden sm:block">
    <div>
      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src={userData?.profile || "/src/assets/Images/placeholder/nopic.jpg"}
          alt=""
        />
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
       
        <Menu.Item>
          {({ active }) => (
            <NavLink
              to={`/profile/${userData?.userName}`}
              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
            >
              Your Profile
            </NavLink>
          )}
        </Menu.Item>
        
        <Menu.Item>
          {({ active }) => (
            <NavLink to={'/signout'} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
          
              Sign out
          
            </NavLink>
          )}
        </Menu.Item>
        
        <Menu.Item>
          <div>
          <CoinsList />
          </div>
        
        
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
  )
}
