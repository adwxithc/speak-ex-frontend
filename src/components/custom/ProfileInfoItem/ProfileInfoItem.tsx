import { LucideIcon } from "lucide-react"
import { Input } from "../../ui/input/Input"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { IEditUserFields } from "../../../pages/user/userInfo/UserInfoSchema"
import {IformValue} from '../../../pages/user/userInfo/UserInfoSchema';
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

interface ProfileInfoItem{
    label:string,
    name:IEditUserFields,
    Icon:LucideIcon,
    editMode:boolean,
    register:UseFormRegister<IformValue>,
    errors:FieldErrors<IformValue>
    editable:boolean
}

function ProfileInfoItem({label, name, Icon,editMode,register,errors,editable}:ProfileInfoItem) {
  const {userData} = useSelector((state:RootState)=>state.user)
 
  return (
    <div className={`bg-secondary  rounded-lg p-3 flex w-full  ${!editMode && 'cursor-not-allowed'}`} >
    <div className="bg-white p-3 rounded-lg flex items-center  ">
    <Icon />
    </div>
    <div className={`ml-3 truncate w-full transition-all duration-500 `}>
        <h3 className="font-semibold">{label}</h3>
        
            
            <div className={`h-0 overflow-hidden transition-all duration-500 ${(editMode && editable) && 'h-full'}`} >
            <Input  className="max-w-[400px] m-1"  placeholder={label}  type="text" onClick={(e)=>e.stopPropagation()} {...register(name)}/>
            <p className=" text-sm text-red-600">{errors[name]?.message?.toString()}</p>
            </div>
            <div className={`h-0 overflow-hidden   ${!(editMode && editable) && 'h-full'}`} >
              <p className="truncate text-gray-600">{ userData && userData[name]}</p>
            </div>
            
    </div>
    </div> 
  )
}

export default ProfileInfoItem
