import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { classNames } from '../../../utils/style-utils'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import CoinsList from '../CoinsList.tsx/CoinsList'
import { User, LogOut, ChevronDown } from 'lucide-react'




export default function ProfileDropdown() {

  const { userData } = useSelector((state: RootState) => state.user)
  return (
    <Menu as="div" className="relative mx-3 hidden sm:block">
      <div>
        <MenuButton className="relative flex items-center gap-2 rounded-full bg-white shadow-md hover:shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 pr-3 group">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            className="h-9 w-9 rounded-full ring-2 ring-gray-200 group-hover:ring-primary transition-all duration-200"
            src={userData?.profile || "/src/assets/Images/placeholder/nopic.jpg"}
            alt={userData?.userName || "User"}
          />
          <span className="font-medium text-gray-700 group-hover:text-primary transition-colors hidden md:inline">
            {userData?.userName}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-primary transition-all duration-200 group-hover:rotate-180" />
        </MenuButton>
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
        <MenuItems className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-blue-50">
            <div className="flex items-center gap-3">
              <img
                className="h-10 w-10 rounded-full ring-2 ring-white shadow-sm"
                src={userData?.profile || "/src/assets/Images/placeholder/nopic.jpg"}
                alt={userData?.userName || "User"}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{userData?.userName}</p>
                <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
              </div>
            </div>
          </div>

          <MenuItem>
            {({ focus }) => (
              <NavLink
                to={`/profile/${userData?.userName}`}
                className={classNames(
                  focus ? 'bg-primary/5 text-primary' : 'text-gray-700',
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150'
                )}
              >
                <User size={18} />
                <span>Your Profile</span>
              </NavLink>
            )}
          </MenuItem>

          {/* Coins List */}
          <MenuItem>
            <div className="px-2 py-2">
              <CoinsList />
            </div>
          </MenuItem>

          <div className="border-t border-gray-100 mt-1"></div>

          <MenuItem>
            {({ focus }) => (
              <NavLink
                to={'/signout'}
                className={classNames(
                  focus ? 'bg-red-50 text-red-600' : 'text-gray-700',
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150'
                )}
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </NavLink>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
