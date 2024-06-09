
import Button from "../../../../components/ui/button/Button"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { ChangeEvent, FormEvent } from "react";

interface IEligiblePops{
    handleRequestSubmit:(e: FormEvent<HTMLFormElement>) => void;
    isValid:boolean;
    onDescriptionChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void
}

function Eligible({handleRequestSubmit,isValid,onDescriptionChange}:IEligiblePops) {
   
    const { userData } = useSelector((state: RootState) => state.user)

  
    return (
        <div className="max-w-xl mx-auto pb-5">
            <div className=" w-[20rem] mx-auto">
                <img src="https://img.freepik.com/free-vector/3d-cartoon-people-concept-online-meeting-virtual-conference-video-call_40876-3762.jpg?t=st=1717004539~exp=1717008139~hmac=16194f785441d3cd6216f747d004cf260b57a61032312c2c7c9b0ce946d3c2f6&w=900" alt="" />
            </div>

            <div className="mb-5">
                <h2 className=" text-black/90 font-semibold text-xl mb-3 text-center">You're Eligible to Monetize your Helping sessions</h2>
                <p className="text-center text-black/40 font-semibold text-sm">

                    You can earn money by conducting help sessions for users with gold coins.Hence, you will no longer receive silver coins for help sessions from now on.You will be rewarded with actual money for each session, based on the rate of the language in the session at that time.

                </p>

            </div>
            
            <div className="  p-2">
                {
                    
                    userData?.requestedForMonetization?
                    <div className="flex justify-center items-center p-5 bg-black/5 rounded-md drop-shadow-sm">
                        <span className=" text-yellow-400 text-lg text-center ">You have made a request for monetization.</span>
                    </div>:
                    
                <form onSubmit={handleRequestSubmit}>
                <h3 className="text-black/90 font-semibold m-3 ">Make monetization request</h3>
                <textarea onChange={onDescriptionChange} className="shadow border rounded-md p-2 resize-none w-full" placeholder="write something..." rows={3} ></textarea>
                <div className="flex justify-end">
                    <Button disabled={!isValid} varient={'primary-outline-square'} size={'sm'}>Send Request</Button>
                </div>
                </form>
                }

            </div>
        </div>
    )
}

export default Eligible
