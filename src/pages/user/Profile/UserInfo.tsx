
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LucideIcon, Mail, SquarePen, SquareUser, X } from "lucide-react"
import {z} from 'zod';
import { debounce } from 'lodash';

import ProfileInfoItem from "../../../components/custom/ProfileInfoItem/ProfileInfoItem"
import {RootState} from '../../../redux/store'
import { useCheckUserNameAvailabilityMutation } from "../../../redux/features/user/user/userApiSlice"
import Button from "../../../components/ui/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllLanguagesMutation, useUpdateUserInfoMutation } from "../../../redux/features/user/user/profileApiSlice";
import { logUser } from "../../../redux/features/user/user/userSlice";
import { DotLoader } from "react-spinners";
import AutoCompleteDropDown from "../../../components/ui/AutoCompleteDropDown/AutoCompleteDropDown";
import {ILanguage} from '../../../types/database'
import Buttton from '../../../components/ui/Button/Button';

export interface IformValue{
    firstName:string;
    lastName:string;
    userName:string;
}

export type IEditUserFields="firstName" | "lastName" | "userName" | 'email'


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
      const [getLanguages] =useGetAllLanguagesMutation()
      const dispatch = useDispatch()
      
      
      const [languageList,setLanguageList] = useState<{ label: string; value: string; selected:boolean }[] | null>(null)
     
   
      const [focusLang,setfocusLang] = useState(userData?.focusLanguage||'')     
      const  [proficientLanguages,setProficientLanguages]=useState( userData?.proficientLanguage?.length ?userData?.proficientLanguage?.map(item=>({id:item})) : [{id:'_'}])
   
      

      

      const removeProficientLanguage=(index:number,lang:string)=>{
        console.log(proficientLanguages,languageList,'proficientLanguages--proficientLanguages');
        
        setLanguageList(prev=>{
          const list=[...(prev || [])]
          const newList=list.map(item=>item.value==lang?{...item,selected:false}:item)
          return newList
        })
        
        setProficientLanguages(prev => {
          const updatedLanguages=[...prev]
          return updatedLanguages.filter((_,i)=>i!==index)
     
        });

      }


      const selectProficientLanguage=(index:number,lang:string)=>{
        const prevLang=proficientLanguages[index].id
        setProficientLanguages(prev => {
          const languageList=[...prev]
          
          languageList[index].id=lang
          return languageList;
        });
        
        setLanguageList(prev=>{
          const list=[...(prev || [])]
          const newList=list.map(item=>{
            if(item.value==lang){
              return {...item,selected:true}
            }else if(item.value==prevLang){
              return {...item,selected:false}
            }else{
              return item
            }

          })
          return newList
        })

      

        
      }
      

      useEffect(()=>{
        const fetchData=async ()=>{
            try {
              const res= await getLanguages({}).unwrap()
              const languages=res.data as ILanguage[]
            
              const list= languages.map((lang:ILanguage)=>({label:lang.name,value:lang.id,selected:false}))
           
              setLanguageList(list)
            } catch (error) {
              console.log(error);
              
            }
        }
        fetchData()

      },[getLanguages])


  const onUpdateUser=async(data: IformValue)=>{

    try {
        setLoading(true)
        const filteredProficientLanguage=proficientLanguages.filter((item, index) =>
          proficientLanguages.findIndex(i=>i.id==item.id) === index
        ).filter(item=>item.id && item.id!=='_');
        console.log(filteredProficientLanguage);
        
        const userInfo:IformValue & {focusLanguage?:string,proficientLanguage:string[]}={...data,focusLanguage:focusLang, proficientLanguage:filteredProficientLanguage.map(item=>item.id)}
      
        if(!focusLang) setfocusLang(userData?.focusLanguage||'')
        setProficientLanguages(filteredProficientLanguage)
        
         console.log(userInfo);
         

        const res= await updateUser(userInfo).unwrap()
        
        dispatch(logUser({...res.data}))
        setLoading(false)
        setEditMode(false)
        
        
    } catch (error) {
        console.log(error,'-----------------------');
        
    }
  }
  
    
  return (
    <div className="h-full p-5 transition-all">
    <form onSubmit={handleSubmit(onUpdateUser)}>
      <div className="p-3 flex justify-end">
        <Button type="button" varient={'primary-outline'} size={'md'} onClick={()=>setEditMode(prev=>!prev)} >{editMode?'cancel':'edit'}</Button>
        {editMode && <Button varient={'primary'} size={'md'} >{loading?<DotLoader className="mr-2" color="white" size={20} />:'Save'}</Button> }
      </div>

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

        <div className="bg-secondary p-3 rounded-lg">
          {languageList && <AutoCompleteDropDown editMode={editMode} selectedValue={focusLang}  onItemSelect={setfocusLang} list={languageList} />}
        </div>

      

       </div>
       </div>
      
       <div className="p-2 mt-5">
       <h3 className="font-semibold mb-2">Proficient Languages</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
        {
       
          proficientLanguages?.map((lang,index)=>{
            
            return(
            <div className="bg-secondary p-3 rounded-lg" key={index}>
            {languageList && <AutoCompleteDropDown editMode={editMode} selectedValue={lang.id}  onItemSelect={(selectedItem)=>{selectProficientLanguage(index,selectedItem)}} list={languageList} />}
            {index>0 && <div className="cursor-pointer" onClick={()=>removeProficientLanguage(index,lang.id)}> <X/></div>}
            </div>
          )})
         
        }

        { editMode && languageList&& languageList?.length>0 &&
        <div className="">
       <Buttton type="button" onClick={()=>setProficientLanguages(prev=>[...prev,{id:'_'}])} varient={'primary'} size={'md'} >Add</Buttton>
       </div>
        }

       </div>
      
      
       </div>
      <div>

      </div>

    
      </form>
    </div>
   
  )
}

export default UserInfo
