
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LucideIcon, Mail, SquarePen, SquareUser } from "lucide-react"
import {z} from 'zod';
import { debounce } from 'lodash';

import ProfileInfoItem from "../../../components/custom/ProfileInfoItem/ProfileInfoItem"
import {RootState} from '../../../redux/store'
import { useCheckUserNameAvailabilityMutation } from "../../../redux/features/user/user/userApiSlice"
import Button from "../../../components/ui/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserInfoMutation } from "../../../redux/features/user/user/profileApiSlice";
import { logUser } from "../../../redux/features/user/user/userSlice";
import { DotLoader } from "react-spinners";
import AutoCompleteDropDown from "../../../components/ui/AutoCompleteDropDown/AutoCompleteDropDown";


export interface IformValue{
    firstName:string;
    lastName:string;
    userName:string;
}

export type IEditUserFields="firstName" | "lastName" | "userName" | 'email'

const list=[
    {
        label:'malayalam',
        value:'djkhkjfhdkjh'
    }
]

const INITIAL_VALUE:{label:string;name:IEditUserFields;icon:LucideIcon,editable:boolean}[]=[
    {
        label:'Email Address',
        icon:Mail,
        name:'email',
        editable:false
    },
    {
        label:'First Name',
        name:'firstName',
        icon:SquarePen,
        editable:true
    },
    {
        label:'Last Name',
        name:'lastName',
        icon:SquarePen,
        editable:true
    
    },
    {
        label:'User Name',
        name:'userName',
        icon:SquareUser,
        editable:true
    },
]


function UserInfo() {
    const [userNameAvailable] = useCheckUserNameAvailabilityMutation()
    const {userData} = useSelector((state:RootState)=>state.user)
    const debouncedCheckUserNameAvailability = debounce(async (username, callback) => {
        const res = await userNameAvailable(username).unwrap();
        callback(res.data.available || username==userData?.userName );
    }, 500);

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

      const [editMode, setEditMode] = useState(false)
      const [loading, setLoading] = useState(false)

      const methods = useForm<IformValue>({
        defaultValues:{
            firstName:userData?.firstName,
            lastName:userData?.lastName,
            userName:userData?.userName
        },
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
      });
      const { register, handleSubmit, formState } = methods;
      const { errors } = formState

      const [updateUser] = useUpdateUserInfoMutation()
      const dispatch = useDispatch()

  const onUpdateUser=async(data: IformValue)=>{

    try {
        setLoading(true)
        const res= await updateUser(data).unwrap()
        dispatch(logUser({...res.data}))
        setLoading(false)
        setEditMode(false)
        
    } catch (error) {
        console.log(error);
        
    }
  }
  const [lang,setLang] = useState<{ label: string; value: string; } | null>(null)
    
  return (
    <div className="h-full p-5">
    <form onSubmit={handleSubmit(onUpdateUser)}>
      <div>
        <h2 className="font-bold mb-3 text-lg">Account Info</h2>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
        {
            INITIAL_VALUE.map(item=><ProfileInfoItem 
                Icon={item.icon}
                errors={errors}
                name={item.name}
                editMode={editMode}
                key={item.name}
                label={item.label}
                register={register}
                editable={item.editable}
                 />)
        }

        </div>
      </div>
       <h2 className="font-bold mb-3 mt-8 text-lg">Language  Info</h2>
       <div className="px-2">
       <h3 className="font-semibold mb-2">Focuse Language</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-secondary p-2 rounded-md">
          <AutoCompleteDropDown selectedItem={{label:'malayalam',value:''}} onItemSelect={setLang} {...{list}} />
        </div>

      

       </div>
       </div>
      
       <div className="p-2 mt-5">
       <h3 className="font-semibold mb-2">Focuse Language</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

       <div className="bg-secondary p-2 rounded-md">
          <AutoCompleteDropDown selectedItem={{label:'malayalam',value:''}} onItemSelect={setLang} {...{list}} />
        </div>
        <div className="bg-secondary p-2 rounded-md">
          <AutoCompleteDropDown selectedItem={{label:'malayalam',value:''}} onItemSelect={setLang} {...{list}} />
        </div>
        <div className="bg-secondary p-2 rounded-md">
          <AutoCompleteDropDown selectedItem={{label:'malayalam',value:''}} onItemSelect={setLang} {...{list}} />
        </div>

      

       </div>
       </div>
      <div>

      </div>

      <div className="p-3 flex justify-end">
        <Button type="button" varient={'primary-outline'} size={'md'} onClick={()=>setEditMode(prev=>!prev)} >{editMode?'cancel':'edit'}</Button>
        {editMode && <Button varient={'primary'} size={'md'} >{loading?<DotLoader className="mr-2" color="white" size={20} />:'Save'}</Button> }
      </div>
      </form>
    </div>
   
  )
}

export default UserInfo
