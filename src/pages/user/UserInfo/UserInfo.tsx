
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { X } from "lucide-react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DotLoader } from "react-spinners";

import { UserInfoSchema, IformValue, INITIAL_VALUE } from './UserInfoSchema'
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

  const { self } = useContext(ProfileContext)
  const { userData } = useSelector((state: RootState) => state.user)


  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  const [languageList, setLanguageList] = useState<{ label: string; value: string; selected: boolean }[] | null>(null)
  const [focusLang, setfocusLang] = useState('')
  const [proficientLanguages, setProficientLanguages] = useState([{ id: '_' }])


  const schema = UserInfoSchema()
  const methods = useForm<IformValue>({
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      userName: userData?.userName,
      email: userData?.email
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
        toast.error('IInternal server error', { position: 'top-center', duration: 2000 })
      }
    }
    fetchData()

  }, [getLanguages])
  useEffect(() => {
    setProficientLanguages(userData?.proficientLanguage?.length ? userData?.proficientLanguage?.map(item => ({ id: item })) : [{ id: '_' }])
    setfocusLang(userData?.focusLanguage || '')
  }, [editMode, userData])

  // Sync languageList selected state based on focusLang and proficientLanguages
  useEffect(() => {
    if (languageList && (focusLang || proficientLanguages.length > 0)) {
      setLanguageList(prev => {
        const list = [...(prev || [])]
        const selectedIds = [
          focusLang,
          ...proficientLanguages.map(lang => lang.id)
        ].filter(id => id && id !== '_')

        return list.map(item => ({
          ...item,
          selected: selectedIds.includes(item.value)
        }))
      })
    }
  }, [focusLang, proficientLanguages, userData])



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


      const userInfo = { ...data, focusLanguage: focusLang, proficientLanguage: filteredProficientLanguage }

      const res = await updateUser(userInfo).unwrap()

      dispatch(setCridentials({ ...res.data }))


    } catch (error) {
      if (isHttpError(error) && error.status == 400) {
        toast.error(error.data.errors[0].message)
      } else {
        toast.error('something went wrong')
      }

    } finally {
      setLoading(false)
      setEditMode(false)
    }
  }


  return (
    <div className="h-full p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-all overflow-visible">
      <form onSubmit={handleSubmit(onUpdateUser)} className="overflow-visible">

        {
          self &&
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              {editMode && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium">Edit Mode Active</span>
                </div>
              )}
              {!editMode && (
                <p className="text-gray-600 text-sm">Click Edit Profile to modify your information</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                type="button"
                varient={editMode ? 'danger-outline' : 'primary-outline'}
                size={'md'}
                onClick={() => setEditMode(prev => !prev)}
                className="min-w-[120px] w-full sm:w-auto"
              >
                {editMode ? '✕ Cancel' : '✎ Edit Profile'}
              </Button>
              {editMode && (
                <Button varient={'primary'} size={'md'} className="min-w-[140px] w-full sm:w-auto">
                  {loading ? (
                    <>
                      <DotLoader className="mr-2" color="white" size={20} />
                      Saving...
                    </>
                  ) : (
                    '✓ Save Changes'
                  )}
                </Button>
              )}
            </div>
          </div>
        }

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="font-bold mb-5 text-xl text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
            Account Info
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 overflow-visible">
          <h2 className="font-bold mb-5 text-xl text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
            Language Info
          </h2>

          <div className="mb-6 overflow-visible">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Focus Language
              </h3>
              <span className="text-xs text-gray-500 italic">The language you want to learn</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-visible">
              <div className={`rounded-xl border-2 transition-all duration-300 overflow-visible ${editMode
                  ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-md'
                  : 'bg-gray-50 border-gray-200'
                }`}>
                {languageList && <AutoCompleteDropDown
                  dropdownId="focus-language"
                  openDropdownId={openDropdownId}
                  setOpenDropdownId={setOpenDropdownId}
                  editMode={editMode}
                  selectedValue={focusLang}
                  onItemSelect={(selectedLang) => {
                    const prevLang = focusLang
                    setfocusLang(selectedLang)
                    setLanguageList(prev => {
                      const list = [...(prev || [])]
                      return list.map(item => {
                        if (item.value === selectedLang) {
                          return { ...item, selected: true }
                        } else if (item.value === prevLang) {
                          return { ...item, selected: false }
                        }
                        return item
                      })
                    })
                  }}
                  list={languageList}
                />}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t-2 border-gray-100 overflow-visible">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-xl">🌍</span>
                Proficient Languages
              </h3>
              <span className="text-xs text-gray-500 italic">Languages you know well</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-visible">
              {
                proficientLanguages?.map((lang, index) => {
                  return (
                    <div className={`rounded-xl border-2 relative transition-all duration-300 group overflow-visible ${editMode
                        ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-md hover:shadow-lg'
                        : 'bg-gray-50 border-gray-200'
                      }`} key={index}>
                      {languageList && <AutoCompleteDropDown
                        dropdownId={`proficient-language-${index}`}
                        openDropdownId={openDropdownId}
                        setOpenDropdownId={setOpenDropdownId}
                        editMode={editMode}
                        selectedValue={lang.id}
                        onItemSelect={(selectedItem) => { selectProficientLanguage(index, selectedItem) }}
                        list={languageList}
                      />}
                      {index > 0 && editMode && (
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1.5 bg-white hover:bg-red-50 border-2 border-red-200 hover:border-red-400 rounded-lg transition-all text-red-500 hover:text-red-700 shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100"
                          onClick={() => removeProficientLanguage(index, lang.id)}
                          aria-label="Remove language"
                          title="Remove this language"
                        >
                          <X size={16} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  )
                })
              }

              {editMode && languageList && languageList?.length > 0 && (
                <div className="flex items-center justify-center p-4 border-2 border-dashed border-indigo-300 rounded-xl bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 group cursor-pointer">
                  <Buttton
                    type="button"
                    onClick={() => setProficientLanguages(prev => [...prev, { id: '_' }])}
                    varient={'primary-outline'}
                    size={'sm'}
                    className="group-hover:scale-105 transition-transform"
                  >
                    <span className="text-lg mr-2">+</span> Add Another Language
                  </Buttton>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

export default UserInfo
