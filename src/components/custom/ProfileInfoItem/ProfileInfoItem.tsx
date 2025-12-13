import { LucideIcon } from "lucide-react"
import { Input } from "../../ui/Input/Input"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { IEditUserFields } from "../../../pages/user/UserInfo/UserInfoSchema"
import {IformValue} from '../../../pages/user/UserInfo/UserInfoSchema';
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
  const hasError = errors[name]?.message
  const isEditableField = editMode && editable
 
  return (
    <div className={`group relative bg-white border-2 rounded-xl p-4 transition-all duration-300 ${
      isEditableField 
        ? 'border-indigo-200 shadow-md hover:shadow-lg' 
        : !editable 
        ? 'border-gray-200 bg-gray-50/50' 
        : 'border-gray-200 hover:border-gray-300'
    } ${hasError ? 'border-red-300 bg-red-50/30' : ''}`}>
      
      {!editable && (
        <div className="absolute top-2 right-2">
          <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full font-medium">
            Read-only
          </span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg flex items-center justify-center transition-colors ${
          isEditableField 
            ? 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600' 
            : 'bg-gray-100 text-gray-500'
        }`}>
          <Icon size={22} />
        </div>
        
        <div className="flex-1 min-w-0">
          <label className={`block font-semibold mb-2 transition-colors ${
            isEditableField ? 'text-indigo-900' : 'text-gray-700'
          }`}>
            {label}
          </label>
          
          {isEditableField ? (
            <div className="space-y-2">
              <Input
                className="w-full transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20"
                placeholder={`Enter your ${label.toLowerCase()}`}
                type="text"
                onClick={(e) => e.stopPropagation()}
                {...register(name)}
              />
              {hasError && (
                <div className="flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <span className="text-red-500 mt-0.5">⚠</span>
                  <p className="text-sm text-red-600 font-medium">
                    {errors[name]?.message?.toString()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className={`text-base truncate transition-colors ${
              !editable ? 'text-gray-500' : 'text-gray-800 font-medium'
            }`}>
              {userData && userData[name] || <span className="text-gray-400 italic">Not set</span>}
            </p>
          )}
        </div>
      </div>
    </div> 
  )
}

export default ProfileInfoItem
