import { Disclosure, DisclosureButton } from '@headlessui/react'
import LanguageSelector from '../../../../custom/languageSelector/LanguageSelector'
import { classNames } from '../../../../../utils/style-utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { INavigationItem } from '../useNavigation'

import UserData from './UserData'

function MobileMenu({ navigation }: { navigation: INavigationItem[] }) {
  const { isAuth } = useSelector((state: RootState) => state.user)
  return (
    <div className="space-y-1 px-5 pb-3 pt-2">
      {
        isAuth && <UserData />
      }

      {navigation.filter(item => (!item.isPrivate || (item.isPrivate && isAuth))).map((item) => (
        <DisclosureButton
          key={item.name}
          onClick={item.action}
          className={classNames(
            item.current ? 'bg-gray-500 text-white' : 'text-black hover:bg-primary hover:text-white',
            'block rounded-md px-3 py-2 text-base  '
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          <div className='flex items-center gap-3'>
            <span className='text-gray-500'>
              <item.icon size={20} />
            </span>

            <span>
              {item.name}
            </span>
          </div>




        </DisclosureButton>
      ))}
      <LanguageSelector />
    </div>
  )
}

export default MobileMenu
