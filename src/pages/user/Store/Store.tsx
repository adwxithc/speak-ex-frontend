import { useSelector } from "react-redux"
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { PuffLoader } from "react-spinners"
import { useState } from "react"

import Button from "../../../components/ui/Button/Button"
import { useGetCoinPurchasePlansQuery } from "../../../redux/features/user/session/sessionApiSlice"
import { ICoinPurchasePlan } from "../../../types/database"
import { RootState } from "../../../redux/store"
import { useCreatePaymentMutation } from "../../../redux/features/user/coinPurchase/coinPurchaseApiSlice"
import { IBackendResponse } from "../../../types/queryResults"
import PlanSkeleton from "./PlanSkeleton"

const public_stripe_key = import.meta.env.VITE_STRIPE_PUBLIC_KET;

function Store({ modalAnimationCompleted }: { modalAnimationCompleted: boolean }) {

  const { data: PurchasePlanData,isLoading } = useGetCoinPurchasePlansQuery({})
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

    <div className="border-2 border-gray-200 mt-5 shadow-2xl max-w-5xl mx-auto rounded-2xl overflow-hidden bg-white">
      <div className="p-5 md:p-6 bg-gradient-to-r from-primary via-primary to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <h2 className="text-center font-bold text-2xl md:text-3xl text-white relative z-10 drop-shadow-lg">Purchase Gold Coins</h2>
        <p className="text-center text-white/90 text-sm mt-1 relative z-10">Choose a plan and unlock more learning opportunities</p>
      </div>
      <div className="flex justify-center flex-wrap gap-4 md:gap-6 w-full p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white">
        {
        !isLoading && modalAnimationCompleted ? (
          purchasePlans?.length > 0 ?


            purchasePlans?.map(plan => {
              return (
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-gray-200 bg-white group">
                  <div className="aspect-square w-44 sm:w-48 flex flex-col justify-center items-center shadow-inner relative overflow-hidden" style={{ background: 'radial-gradient(circle at top, #fff, #f5f5f5, #e8e8e8)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 via-transparent to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img className="h-32 sm:h-36 drop-shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300" src={plan.image} alt={plan.title} />

                    <span className="text-yellow-600 font-bold text-base sm:text-lg mt-2 relative z-10 drop-shadow-sm">{plan.title}</span>

                  </div>
                  <div className="bg-gradient-to-b from-gray-50 to-white p-3 sm:p-4 border-t-2 border-gray-100">

                    <div className="flex items-center justify-center gap-2 mb-3 bg-yellow-50 rounded-lg py-2 px-3 shadow-sm">
                      <img className="h-6 w-6 drop-shadow-md" src="src/assets/Images/menuIcon/gold.png" alt="Gold coin" />
                      <span className="text-yellow-600 font-bold text-xl">{plan.count}</span>
                      <span className="text-gray-500 text-sm font-medium">coins</span>
                    </div>
                    <div className="flex justify-center">
                      <Button onClick={() => handleCheckout(plan.id)} className="rounded-lg border-2 border-primary/20 w-full hover:shadow-lg hover:shadow-primary/30 bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-800 transition-all duration-300">
                        <span className="font-bold text-white py-1.5 flex items-center justify-center gap-2">
                          {selectedPlan == plan.id ? <PuffLoader size={20} color="#fff" /> : (
                            <>
                              <span className="text-base">₹{plan.price}</span>
                              <span className="text-sm font-normal opacity-90">• Buy Now</span>
                            </>
                          )}
                        </span>
                      </Button>
                    </div>

                  </div>
                </div>

              )
            }) :
            <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-6 md:p-8">
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 shadow-md">
                <p className="text-yellow-700 font-semibold text-sm sm:text-base text-center">Currently there are no gold coin purchase plans available.</p>
                <p className="text-yellow-600 text-xs sm:text-sm text-center mt-2">Please check back later!</p>
              </div>
            </div>

        ) :
          <>
            <PlanSkeleton />
            <PlanSkeleton />
            <PlanSkeleton />
            <PlanSkeleton />
          </>

        }
      </div>

    </div>

  )
}

export default Store
