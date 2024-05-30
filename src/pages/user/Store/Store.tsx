import { useSelector } from "react-redux"
import Button from "../../../components/ui/Button/Button"
import { useGetCoinPurchasePlansQuery } from "../../../redux/features/user/session/sessionApiSlice"
import { ICoinPurchasePlan } from "../../../types/database"
import Skelton from "./Skelton"
import { RootState } from "../../../redux/store"
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useCreatePaymentMutation } from "../../../redux/features/user/coinPurchase/coinPurchaseApiSlice"
import { IBackendResponse } from "../../../types/queryResults"
import { PuffLoader } from "react-spinners"
import { useState } from "react"
const public_stripe_key = import.meta.env.VITE_STRIPE_PUBLIC_KET


function Store({ modalAnimationCompleted }: { modalAnimationCompleted: boolean }) {

  const { data: PurchasePlanData } = useGetCoinPurchasePlansQuery({})
  const [selectedPlan, setSelectedPlan] = useState('')
  const purchasePlans = PurchasePlanData?.data as ICoinPurchasePlan[]
  const { userData } = useSelector((state: RootState) => state.user)
  const [createPayment] = useCreatePaymentMutation()

  const handleCheckout = async (planId: string) => {
    setSelectedPlan(planId)
    // handle checkout logic 
    const stripePromise: Stripe | null = await loadStripe(public_stripe_key);

    const session = await createPayment({ userId: userData?.id, coinPurchasePlanId: planId }).unwrap() as IBackendResponse<string>

    if (stripePromise) {
      stripePromise.redirectToCheckout({
        sessionId: session.data,

      });
    }
  }

  return (

    <div className=" border mt-5 shadow-md  max-w-4xl mx-auto rounded-md overflow-hidden ">
      <div className=" p-3 drop-shadow-sm bg-black/5">
        <h2 className="text-center  font-bold text-xl text-black/70">Purchase Coins</h2>
      </div>
      <div className="flex justify-center  flex-wrap gap-3 w-full p-2 sm:p-5  ">
        {purchasePlans && modalAnimationCompleted ? (
          purchasePlans?.length > 0 ?


            purchasePlans?.map(plan => {
              return (
                <div className=" rounded overflow-hidden  shadow-md hover:scale-105 transition-all">
                  <div className="aspect-square  w-40 flex flex-col justify-center items-center shadow-inner bg-[#bfbebe]" style={{ background: 'radial-gradient(circle, #fff, #dfdfdf)' }}>
                    <img className="h-32" src={plan.image} alt="" />

                    <span className="  text-yellow-500 font-semibold ">{plan.title}</span>

                  </div>
                  <div className="bg-gray-200/30 p-2 ">

                    <div className="flex items-center justify-center gap-2 mb-1">
                      <img className="h-5 w-5" src="src/assets/Images/menuIcon/gold.png" alt="" />
                      <span className="text-yellow-500 font-bold text-lg ">{plan.count}</span>
                    </div>
                    <div className="flex justify-center">
                      <Button onClick={() => handleCheckout(plan.id)} className="rounded border w-full    hover:shadow-black/20"   ><span className="font-bold  text-black/70 py-1">{selectedPlan == plan.id  ? <PuffLoader size={20} /> : `Buy ${plan.price} rs`}</span></Button>
                    </div>

                  </div>
                </div>

              )
            }) :
            <div className="sm:w-[50vw] flex justify-center p-1"><span className="text-yellow-600 font-medium text-xs sm:text-sm ">Currently there is no gold coin purchase plan available..!</span></div>

        ) :
          <>
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
          </>

        }
      </div>

    </div>

  )
}

export default Store
