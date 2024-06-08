
import {z} from 'zod';
import { debounce } from 'lodash';

import { useCheckUserNameAvailabilityMutation } from '../../../redux/features/user/user/userApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { LucideIcon, Mail, SquarePen, SquareUser } from 'lucide-react';

export type IEditUserFields = "firstName" | "lastName" | "userName" 

export const INITIAL_VALUE: { label: string; name: IEditUserFields | 'email'; icon: LucideIcon, editable: boolean }[] = [
    {
      label: 'Email Address',
      icon: Mail,
      name: 'email',
      editable: false
    },
    {
      label: 'First Name',
      name: 'firstName',
      icon: SquarePen,
      editable: true
    },
    {
      label: 'Last Name',
      name: 'lastName',
      icon: SquarePen,
      editable: true
  
    },
    {
      label: 'User Name',
      name: 'userName',
      icon: SquareUser,
      editable: true
    },
  ]


export interface IformValue {
    firstName: string;
    lastName: string;
    userName: string;
  }

export function UserInfoSchema() {
    const {userData} = useSelector((state:RootState)=>state.user)
    const [userNameAvailable] = useCheckUserNameAvailabilityMutation()

    const debouncedCheckUserNameAvailability = 
        debounce(async (username, callback) => {
            const res = await userNameAvailable(username).unwrap();
            callback(res.data.available || username==userData?.userName );
        }, 500)
   
    
    const schema = z.object({
        firstName: z.string().min(3,'first name must be minimum 3 character long'),
        lastName: z.string(),
        userName: z.string().min(3,'userName must be minimum 3 character long').refine(async (username) => {
            if(username.length<3) return true
          
            return new Promise(resolve => {
                debouncedCheckUserNameAvailability(username, resolve);
            });
          }, { message: 'Username is already taken' }),
      });
  return schema
}

 



