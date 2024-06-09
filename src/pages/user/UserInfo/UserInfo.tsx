
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { X } from "lucide-react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DotLoader } from "react-spinners";

import { UserInfoSchema,IformValue,INITIAL_VALUE } from './UserInfoSchema'
import ProfileInfoItem from "../../../components/custom/ProfileInfoItem/ProfileInfoItem"
import { RootState } from '../../../redux/store'
import Button from "../../../components/ui/Button/Button";
import { useGetAllLanguagesMutation, useUpdateUserInfoMutation } from "../../../redux/features/user/user/profileApiSlice";
import { setCridentials } from "../../../redux/features/user/user/userSlice";
import AutoCompleteDropDown from "../../../components/ui/AutoCompleteDropDown/AutoCompleteDropDown";
import { ILanguage } from '../../../types/database'
import Buttton from '../../../components/ui/Button/Button';
import { ProfileContext } from "../Profile/Profile";
import { isHttpError } from "../../../utils/isHttpError";



function UserInfo() {

  const {self}= useContext(ProfileContext)
  const { userData } = useSelector((state: RootState) => state.user)


  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const [languageList, setLanguageList] = useState<{ label: string; value: string; selected: boolean }[] | null>(null)
  const [focusLang, setfocusLang] = useState('')
  const [proficientLanguages, setProficientLanguages] = useState([{id:'_'}])


  const schema = UserInfoSchema()
  const methods = useForm<IformValue>({
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      userName: userData?.userName,
      email:userData?.email
    },
    mode: 'onChange',
    resolver: zodResolver(schema), // zod resolver for form validation
  });
  const { register, handleSubmit, formState } = methods;
  const { errors } = formState

  const [updateUser] = useUpdateUserInfoMutation()
  const [getLanguages] = useGetAllLanguagesMutation()
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLanguages({}).unwrap()
        const languages = res.data as ILanguage[]

        const list = languages.map((lang: ILanguage) => ({ label: lang.name, value: lang.id, selected: false }))

        setLanguageList(list)
      } catch (error) {
        toast.error('IInternal server error',{position:'top-center',duration:2000})
      }
    }
    fetchData()

  }, [getLanguages])
  useEffect(()=>{
    setProficientLanguages(userData?.proficientLanguage?.length ? userData?.proficientLanguage?.map(item => ({ id: item })) : [{ id: '_' }])
    setfocusLang(userData?.focusLanguage || '')
  },[editMode,userData])



  const removeProficientLanguage = (index: number, lang: string) => {

    setLanguageList(prev => {
      const list = [...(prev || [])]
      const newList = list.map(item => item.value == lang ? { ...item, selected: false } : item)
      return newList
    })

    setProficientLanguages(prev => {
      const updatedLanguages = [...prev]
      return updatedLanguages.filter((_, i) => i !== index)

    });

  }

  const selectProficientLanguage = (index: number, lang: string) => {
    const prevLang = proficientLanguages[index].id
    setProficientLanguages(prev => {
      const languageList = [...prev]

      languageList[index].id = lang
      return languageList;
    });


    setLanguageList(prev => {
      const list = [...(prev || [])]
      const newList = list.map(item => {
        if (item.value == lang) {
          return { ...item, selected: true }
        } else if (item.value == prevLang) {
          return { ...item, selected: false }
        } else {
          return item
        }
      })
      return newList
    })

  }

  const onUpdateUser = async (data: IformValue) => {

    try {
      setLoading(true)
      const filteredProficientLanguage = proficientLanguages.filter((item, index) =>
        proficientLanguages.findIndex(i => i.id == item.id) === index && item.id && item.id !== '_'
      ).map(item => item.id);
 

      const userInfo = { ...data,focusLanguage:focusLang, proficientLanguage: filteredProficientLanguage }

      const res = await updateUser(userInfo).unwrap()

      dispatch(setCridentials({ ...res.data }))
      

    } catch (error) {
      if(isHttpError(error) && error.status==400){
        toast.error(error.data.errors[0].message)
      }else{
        toast.error('something went wrong')
      }

    }finally{
      setLoading(false)
      setEditMode(false)
    }
  }


  return (
    <div className="h-full p-5 transition-all">
      <form onSubmit={handleSubmit(onUpdateUser)}>

        {
          self&&
        <div className="p-3 flex justify-end">
          <Button type="button" varient={'primary-outline'} size={'md'} onClick={() => setEditMode(prev => !prev)} >{editMode ? 'cancel' : 'edit'}</Button>
          {editMode && <Button varient={'primary'} size={'md'} >{loading ? <DotLoader className="mr-2" color="white" size={20} /> : 'Save'}</Button>}
        </div>
        }
        <div>
          <h2 className="font-bold mb-3 text-lg">Account Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
            {
              INITIAL_VALUE.map(item => <ProfileInfoItem
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
              {languageList && <AutoCompleteDropDown editMode={editMode} selectedValue={focusLang} onItemSelect={setfocusLang} list={languageList} />}
            </div>
          </div>
        </div>

        <div className="p-2 my-5">
          <h3 className="font-semibold mb-2">Proficient Languages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {

              proficientLanguages?.map((lang, index) => {

                return (
                  <div className="bg-secondary p-3 rounded-lg" key={index}>
                    {languageList && <AutoCompleteDropDown editMode={editMode} selectedValue={lang.id} onItemSelect={(selectedItem) => { selectProficientLanguage(index, selectedItem) }} list={languageList} />}
                    {index > 0 && editMode && <div className="cursor-pointer" onClick={() => removeProficientLanguage(index, lang.id)}> <X /></div>}
                  </div>
                )
              })

            }

            {editMode && languageList && languageList?.length > 0 &&
              <div className="">
                <Buttton type="button" onClick={() => setProficientLanguages(prev => [...prev, { id: '_' }])} varient={'primary'} size={'md'} >Add</Buttton>
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
