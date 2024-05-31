
import { useDispatch, useSelector } from "react-redux";
import { useGetSessionDataQuery, useRequestForMonetizationMutation } from "../../../redux/features/user/session/sessionApiSlice"
import { IUsersSesssionData } from "../../../types/database";
import Eligible from "./Statuses/Eligible"
import NotEligibel from "./Statuses/NotEligibel"
import { RootState } from "../../../redux/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { updateCridentials } from "../../../redux/features/user/user/userSlice";
import DialogBox from "../../../components/custom/DialogBox/DialogBox";
import Button from "../../../components/ui/Button/Button";
import { MoonLoader } from "react-spinners";
import Monetised from "./Statuses/Monetized";
import Requested from "./Statuses/Requested";

function Monetization() {
  const { userData } = useSelector((state: RootState) => state.user)
  const [description, setDescription] = useState('')
  const [openConfirm, setOpenConfirm] = useState(false)
  const dispatch = useDispatch()

  const [requestForMonetization, { isLoading }] = useRequestForMonetizationMutation()
  const { data } = useGetSessionDataQuery({ userId: userData?.id });
  const sessionData = data?.data as IUsersSesssionData




  const [helpingSessions, setHelpingSessions] = useState(0)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    
    setHelpingSessions(sessionData?.helpingSessions || 0);
    setRating(sessionData?.rating || 0);
  }, [sessionData?.helpingSessions, sessionData?.rating, userData?.isMonetized])


  const handleRequestSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpenConfirm(true);

  }

  const handleSentRequest = async () => {
    await requestForMonetization({ userId: userData?.id, description })
    dispatch(updateCridentials({ requestedForMonetization: true }))
    setOpenConfirm(false)
  }

console.log(helpingSessions , rating);

  const renderContent = () => {

    if(sessionData?.isMonetized){
     return  <Monetised />
    }else if(helpingSessions > 10 && rating >= 4 && !userData?.requestedForMonetization){
      return  <Eligible {...{ handleRequestSubmit, isValid: Boolean(description), onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value) }} />
    }else if(userData?.requestedForMonetization){
      return <Requested />

    }else{
      return <NotEligibel />

    }
};

  return (
    <>
      <div className="p-5">

        <div className="flex justify-center items-center">
          {
            renderContent()
          }
        </div>


      </div>
      <DialogBox isOpen={openConfirm} onClose={() => setOpenConfirm(false)} title="Are you sure">
        <div className="mt-5">
          <p className="text-black/60 text-sm mb-5 font-semibold">You can earn money by conducting help sessions for users with gold coins.Hence, you will no longer receive silver coins for help sessions from now on.You will be rewarded with actual money for each session,</p>
          <div className="flex justify-end">
            <Button varient={'primary-square'} size={'md'} onClick={handleSentRequest} >{isLoading ? <MoonLoader color="white" size={20} /> : 'Yes, sent request'}</Button>
          </div>

        </div>
      </DialogBox>
    </>

  )
}

export default Monetization
