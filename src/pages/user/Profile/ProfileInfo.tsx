import { Mail, MessageSquareText, RectangleHorizontal, Square, SquarePen, Star, StarHalf } from "lucide-react"
import Button from "../../../components/ui/Button/Button"
import Avatar from "../../../components/ui/Avatar/Avatar"
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./Profile"
import { RootState } from "../../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useGetAllLanguagesMutation, useUploadCoverPicMutation, useUploadProfileMutation } from "../../../redux/features/user/user/profileApiSlice"
import { useFollowUserMutation, useUnfollowUserMutation } from "../../../redux/features/user/user/userApiSlice"
import { useCreateChatRoomMutation } from "../../../redux/features/user/user/chatApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { updateCridentials } from "../../../redux/features/user/user/userSlice"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners"
import { AnimatePresence } from "framer-motion"
import Modal from "../../../components/custom/Modal/Modal"
import UploadImage from "../../../components/custom/uploadImage/UploadImage"
import { IBackendResponse } from "../../../types/queryResults"
import { IChatRoom, ILanguage } from "../../../types/database"

function ProfileInfo() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, self } = useContext(ProfileContext)
  const { userData } = useSelector((state: RootState) => state.user)
  const [isFollowing, setIsFollowing] = useState(data?.followers?.includes(userData?.id || ''))



  const [upload] = useUploadProfileMutation()
  const [uploadCover] = useUploadCoverPicMutation()
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [getLanguages] = useGetAllLanguagesMutation()

  const [createChatRoom, { isLoading: chatLoading }] = useCreateChatRoomMutation()

  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showCoverChangeModal, setShowCoverChangeModal] = useState(false)

  const [focuseLanguage, setFocuseLanguage] = useState('')
  const [proficientLanguages, setProficientLanguages] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLanguages({}).unwrap()
        const languages = res.data as ILanguage[]

        const focuseLang = languages.find(item => item.id === userData?.focusLanguage)
        setFocuseLanguage(focuseLang?.name || '')

        const proficientLanguages = languages.filter(item => userData?.proficientLanguage?.includes(item.id)).map(item => item.name)
        setProficientLanguages(proficientLanguages)

      } catch (error) {
        toast.error('IInternal server error', { position: 'top-center', duration: 2000 })
      }
    }
    fetchData()

  }, [getLanguages, userData?.focusLanguage, userData?.proficientLanguage])


  useEffect(() => {
    setIsFollowing(data?.followers?.includes(userData?.id || ''))
  }, [data, userData])

  const handleImageUpload = async (imageFile: File) => {

    setLoading(true)
    const formData = new FormData()
    formData.append('image', imageFile)
    const res = await upload(formData).unwrap()

    dispatch(updateCridentials({ profile: res.data }));
    setLoading(false)
    setShowModal(false)
    toast(res.message, {
      position: 'top-center'
    })

  }
  const handleFollow = async () => {
    await followUser({ userId: data?.id })
    setIsFollowing(true)
  }

  const handleUnfollow = async () => {

    await unfollowUser({ userId: data?.id })
    setIsFollowing(false)

  }

  const handleMessage = async () => {
    try {
      if (data && userData && data.id !== userData.id) {
        const response = await createChatRoom({ members: [userData.id, data?.id] }).unwrap() as IBackendResponse<IChatRoom>

        navigate('/chat', { state: { roomId: response.data.id } })
      }
    } catch (error) {
      toast.error('somrthing went wrong, try later')
    }
  }

  const handleCoverUpload = async (imageFile: File) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('image', imageFile)
    const res = await uploadCover(formData).unwrap()

    dispatch(updateCridentials({ coverPic: res.data }));
    setLoading(false)
    setShowCoverChangeModal(false)
    toast(res.message, {
      position: 'top-center'
    })
  }

  return (
    <>
      <div className="">

        {/* cover part */}
        <div className="h-32 md:h-52  overflow-hidden  relative bg-black/30">
          {
            data?.coverPic &&
            <img className="w-full h-full object-cover object-center" src={self?userData?.coverPic:data?.coverPic} alt="cover picture" />
          }

          {
            self && <Button onClick={() => setShowCoverChangeModal(true)} className="absolute top-5 right-5  " varient={'primary'} size={'sm'} ><SquarePen size='15' />Change</Button>
          }

        </div>
        <div className="px-3 md:px-10 pb-7 mb-3  border-b">
          {/* avathar and follow message */}
          <div className=" flex h-16  relative justify-end mb-2 ">

            <div className={`absolute bottom-0 left-0 ${self && 'cursor-pointer'} `} onClick={() => { self && setShowModal(true) }}>
              <Avatar src={(userData?.id == data?.id ? userData?.profile : data?.profile) || 'src/assets/Images/placeholder/nopic.jpg'} className="h-32 w-32 border-4 border-white " />
            </div>
            <div className=" flex items-center ">
              <span className="flex gap-1 mr-3">
                {data && data.rating > 0 &&

                  Array.from({ length: 5 }, (_, i) => (
                    i + 1 < data?.rating ? <Star size={17} color={'orange'} fill={'orange'} key={i} /> : data?.rating % 1 !== 0 && Math.floor(data.rating) == i ? <span className="relative"><StarHalf className="absolute" size={17} color={'orange'} fill={'orange'} /><Star size={17} color={'gray'} fill={'gray'} key={i} /></span> : <Star size={17} color={'gray'} fill={'gray'} key={i} />

                  ))

                }
              </span>
              {
                self ?
                  <>
                    <Button varient={'primary-outline'} size={'icon'} onClick={() => navigate('/chat')} > <MessageSquareText size={20} /></Button>
                  </>
                  : <>
                    <Button onClick={handleMessage} varient={'primary-outline'} size={'icon'} >{chatLoading ? <ClipLoader color='white' size={18} /> : <MessageSquareText size={20} />}</Button>
                    <Button onClick={isFollowing ? handleUnfollow : handleFollow} varient={'primary'} size={'md'} >{isFollowing ? 'unfollow' : 'follow'}</Button>
                  </>
              }
            </div>
          </div>
          {/* info part */}
          <div className="md:flex justify-between   flex-wrap ">
            <div className=" flex flex-col  mb-3 md:mb-0">
              <h2 className=" font-semibold capitalize text-lg">{data?.firstName + ' ' + data?.lastName}</h2>
              <span className="text-black/50 text-xs sm:text-sm mb-3">@{data?.userName}</span>
              <span className="text-black/50 text-xs sm:text-sm inline-flex items-center gap-1 mb-1 " ><Mail size={15} />{data?.email}</span>
              <div className="flex gap-5 text-sm text-black/70 ">
                <Link to={`/profile/${data?.userName}/follow/followings`} className="hover:border-b border-black/40 " ><span className="font-semibold text-black mr-1">{data?.following.length}</span>Following</Link>
                <Link to={`/profile/${data?.userName}/follow/followers`} className="hover:border-b border-black/40" ><span className="font-semibold text-black mr-1 ">{data?.followers.length}</span>Followers</Link>
              </div>
            </div>

            <div className=" text-sm font-semibold text-black/80 mr-0 md:mr-auto ml-auto">

              <div className="mb-3 md:block flex gap-2">
                <p className="mb-2 ">Focuse Language</p>
                {
                  focuseLanguage ?
                    <span className="text-black/50 font-semibold  bg-primary/5   p-1  rounded">{focuseLanguage}</span>
                    : <span>Not specified yet.</span>
                }

              </div>

              <div className="md:block flex gap-2">
                <p className="mb-2">Proficient Languages</p>
                <div className=" flex-wrap flex gap-2 text-black/50 font-semibold ">
                  {proficientLanguages.length > 0 ?
                    proficientLanguages.map((item) => (<span key={item} className=" bg-primary/5   p-1  rounded">{item}</span>))
                    : <span>Not specified yet.</span>
                  }
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <AnimatePresence
        initial={false}
        mode="wait"
      >
        {showModal && <Modal loading={loading} handleClose={() => { setShowModal(false) }} ><UploadImage {...{ handleImageUpload, aspectRatios: [{ ratio: 1 / 1, label: '1:1', icon: Square }] }} /></Modal>}
        {showCoverChangeModal && <Modal loading={loading} handleClose={() => { setShowCoverChangeModal(false) }} ><UploadImage {...{ handleImageUpload: handleCoverUpload, aspectRatios: [{ ratio: 4 / 1, label: '4:1', icon: RectangleHorizontal }] }} /></Modal>}
      </AnimatePresence>
    </>
  )
}

export default ProfileInfo
