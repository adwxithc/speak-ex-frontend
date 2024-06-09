import { FlameKindling, Star, StarHalf } from "lucide-react"
import Avatar from "../../../components/ui/Avatar/Avatar"
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from "react"
import { useGetCompleteUserInfoQuery, useUpdateUserMutation } from "../../../redux/features/admin/listUsers/usersListApiSlice"
import { IBackendResponse } from "../../../types/queryResults"
import IUser, { IUserDetails } from "../../../types/database"
import ToolTip from "../../../components/ui/toolTip/ToolTip"
import { Languages, Monetization, Reports, Sessions, Socials, Wallet } from "./Cards"
import Button from "../../../components/ui/button/Button"
import toast from "react-hot-toast"
import { useUpdateMonetizationStatusMutation } from "../../../redux/features/admin/monetization/monetizationApiSlice"
import { MoonLoader } from "react-spinners"
function UserDetails({ userId }: { userId: string }) {

    const [selectedId, setSelectedId] = useState('')
    const [userData, setUserData] = useState<IUserDetails | null>(null)
    

    const { data } = useGetCompleteUserInfoQuery({ userId })
    const response = data as IBackendResponse<IUserDetails>


    useEffect(() => {
        setUserData(response?.data)
    }, [response?.data])

    const datas = [
        {
            name: 'Wallet',
            icon: `/src/assets/Images/menuIcon/wallet.png`
        },
        {
            name: 'Sessions',
            icon: `/src/assets/Images/menuIcon/video.png`
        },
        {
            name: 'Socials',
            icon: `/src/assets/Images/menuIcon/social.png`
        },
        {
            name: 'Reports',
            icon: `/src/assets/Images/menuIcon/reports.png`
        },
        {
            name: 'Monetization',
            icon: `/src/assets/Images/menuIcon/monetization.png`
        },
        {
            name: 'Languages',
            icon: `/src/assets/Images/menuIcon/language.png`
        }
    ]

    const [updateUser,{isLoading:updationLoading}] = useUpdateUserMutation()
    const [updauteMonetizationStatus,{isLoading:updateUserLoading}] =useUpdateMonetizationStatusMutation()

    const handleUpdateMonetizationStatus=async (status:'accepted'|'rejected')=>{
        try {
            if(!userData) return;
            const res = await updauteMonetizationStatus({status,userId:userData?.id}).unwrap() as IBackendResponse<IUser>
          
           
            setUserData(prev=>(prev?{...prev,isMonetized:res.data.isMonetized}:prev));
        } catch (error) {
            console.log(error);
            
        }
      
    }

    const handleBlocke = async (id: string, status: boolean) => {
        try {
            const data = { id, blocked: status }
            const res = await updateUser(data).unwrap() as IBackendResponse<IUser>;
            setUserData(prev=>{
                if(prev){
                    return {...prev, blocked: res.data.blocked}
                }
                return null
            })
        } catch (error) {
            toast.error('something went wrong!')
        }

    }



    if (!userData) return <div className="w-[80vw] md:w-[90vw] h-[90vh]  bg-gray-50"></div>

    const renderContent = () => {

        switch (selectedId) {
            case 'Wallet':
                return <Wallet wallet={userData.wallet} />;
            case 'Sessions':
                return <Sessions sessionData={userData.session} />;
            case 'Socials':
                return <Socials socials={userData.social} />;
            case 'Reports':
                return <Reports repotDatas={userData.reports} />;
            case 'Monetization':
                return <Monetization />;
            case 'Languages':
                return <Languages focusLanguageInfo={userData.focusLanguageInfo} proficientLanguageInfo={userData.proficientLanguageInfo} />;
            default:
                return < ></>;
        }
    };

    

    return (

        <>
            <div className="w-[80vw] md:w-[90vw] h-[90vh]  bg-gray-50">

                <div className="flex flex-col sm:flex-row  gap-5">

                    <div className="bg-white sm:w-80  rounded p-5">
                        <div className="flex flex-col items-center  border-b">
                            <Avatar className="h-28 w-28" src={userData.profile} />
                            <span className="font-semibold mb-1">{userData.firstName + ' ' + userData.lastName}</span>
                            <span className="text-sm text-black/60 font-medium mb-3">{userData.email}</span>
                            <div className="flex w-full p-2  text-sm font-medium">
                                <span className="flex-1 border-r-2 p-2 border-black/10">
                                    <ToolTip tooltip="session rating">
                                        <span className="inline-flex  justify-center items-center">
                                            {

                                                Array.from({ length: 5 }, (_, i) => (
                                                    i + 1 < userData?.session?.rating ? <Star size={17} color={'orange'} fill={'orange'} key={i} /> : userData.session.rating % 1 !== 0 && Math.floor(userData.session.rating) == i ? <span className="relative"><StarHalf className="absolute" size={17} color={'orange'} fill={'orange'} /><Star size={17} color={'gray'} fill={'gray'} key={i} /></span> : <Star size={17} color={'gray'} fill={'gray'} key={i} />

                                                ))

                                            }

                                        </span>
                                    </ToolTip>
                                </span>

                                <span className="inline-flex flex-1 items-center justify-center"><FlameKindling size={17} color="red" /><ToolTip tooltip="Average helping sessions"> {userData.session.avgHelpingSessionsPerMonth}</ToolTip> </span>
                            </div>
                        </div>
                        <div className="font-medium text-sm border-b py-3">
                            <h4 className="text-md mb-5">User Info</h4>
                            <p className="mb-3">
                                <span className=" text-black/40 block">Full Name:</span>
                                <span className="">{userData.firstName + ' ' + userData.lastName}</span>
                            </p>
                            <p className="mb-3">
                                <span className=" text-black/40 block">User Name:</span>
                                <span className="">{userData.userName}</span>
                            </p>
                            <p className="mb-3">
                                <span className=" text-black/40 block">Email Address:</span>
                                <span className="">{userData.email}</span>
                            </p>
                        </div>
                        <div className="font-medium text-sm border-b py-3">
                            <h4 className="mb-5">Language Info</h4>
                            <p className="mb-5">
                                <span className="text-black/40 block mb-3">Focuse Language</span>
                                <span className=" bg-primary/10 p-1 text-black/60 rounded">{userData.focusLanguageInfo.name}</span>

                            </p>

                            <div className="mb-4">
                                <span className="text-black/40 block mb-3">Proficient Language</span>

                                <div className="flex-wrap flex gap-2">
                                    {
                                        userData.proficientLanguageInfo.map((item) => (<span key={item.id} className=" bg-primary/10 p-1 text-black/60  rounded">{item.name}</span>))
                                    }


                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="bg-white flex-1 rounded">
                        <div className="flex flex-wrap gap-5 p-5">
                            {
                                datas.map(item => (
                                    <motion.div layoutId={item.name} onClick={() => setSelectedId(item.name)} key={item.name} className=" flex-1 cursor-pointer aspect-square p-3 drop-shadow bg-gray-100 rounded-xl flex flex-col justify-center items-center">
                                        <img className="h-14 w-14 " src={item.icon} alt={item.name} />
                                        <span className="text-sm text-gray-700 capitalize">{item.name}</span>
                                    </motion.div>
                                ))
                            }

                        </div>
                        <div className="flex flex-wrap gap-3 p-3 rounded shadow">

                            <div className="flex-1 h-full bg-gray-100 p-5 rounded shadow">
                                <h2 className="font-medium text-center mb-5">Actions</h2>
                                <div className="flex justify-end">
                                    <Button onClick={() => handleBlocke(userData.id, !userData.blocked || false)} varient={'primary-square'} size={'sm'}>{updationLoading?<MoonLoader color={'white'} size={20}/>:(userData.blocked? 'Unblock' : 'Block')}</Button>

                                </div>

                            </div>

                            <div className="flex-1 h-full bg-gray-100 p-5 rounded shadow">
                                <h2 className="font-medium text-center mb-5">Monetisation</h2>
                                <div className="flex justify-end">
                                    <Button onClick={()=>handleUpdateMonetizationStatus(userData.isMonetized?'rejected':'accepted')} varient={'primary-square'} size={'sm'}>{updateUserLoading?<MoonLoader color={'white'} size={20}/>:(userData.isMonetized?'Reject':'Approve')}</Button>
                                </div>

                            </div>


                        </div>



                    </div>
                </div>

            </div>
            <AnimatePresence  >
                {selectedId && (
                    <motion.div
                        key={'modal'}
                        layoutId={selectedId}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedId('')}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex justify-center items-center " 
                    >
                        <div className="overflow-y-scroll pretty-scrollbar max-h-full ">
                        <motion.div className="bg-white p-5 rounded-lg " onClick={(e) => e.stopPropagation()}>
                            {renderContent()}
                        </motion.div>
                        </div>
                       
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default UserDetails
