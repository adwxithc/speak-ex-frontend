import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import Button from "../../ui/Button/Button"
import { useNavigate } from "react-router-dom"
import { setCloseCompleteProfileModal } from "../../../redux/features/user/user/userSlice"
import { TriangleAlert } from "lucide-react"

function ProfileCompletionWarning() {
  const { userData } = useSelector((state: RootState) => state.user)
  const dispatch =  useDispatch()
  const handleGotoProfile =()=>{
    dispatch(setCloseCompleteProfileModal())
    navigate(`/profile/${userData?.userName}/user-info`)
  }
const navigate = useNavigate()
  return (
    <div className="max-w-md ">
        
      <h2 className="text-black/90  font-bold flex gap-1 items-center  flex-wrap mb-5"><TriangleAlert size={19} fill="yellow" color="orange" /> <span>Hey {userData?.userName}</span> </h2>
      <p className="text-black/50 text-center text-sm font-medium mb-5" >Before we get started, please fill out your language preferences? This will help us match you with the most suitable learning resources. Your proficiency in various languages is essential for a tailored session.</p>
      <div className="mb-2 flex justify-end">
        <Button onClick={()=>dispatch(setCloseCompleteProfileModal())} varient={"primary-outline-square"} size={'sm'} >Cancel</Button>
      <Button onClick={handleGotoProfile}  varient={"primary-square"}  size={"sm"}>Go to Profile</Button>
      </div>
      
    </div>
  )
}

export default ProfileCompletionWarning
