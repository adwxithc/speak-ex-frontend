import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Button from "../../../../components/ui/Button/Button";
import { useGetSessionQuery } from "../../../../redux/features/user/session/sessionApiSlice";
import { ISession } from "../../../../types/database";


interface ISessionDurationProps {
  terminate: () => void;
  startTime: number;
}

function SessionDuration({ startTime, terminate }: ISessionDurationProps) {

  const location = useLocation();
  const { type } = location.state;
  const { wallet } = useSelector((state: RootState) => state.user)
  const [formatedDuration, setFormatedDuration] = useState('00:00:00');

  const [duration, setDuration] = useState(0);
  const [openDialog, setOpenDialog] = useState(false)
  const { sessionId = '' } = useParams()

  const { data: sessionInfo } = useGetSessionQuery({ sessionCode: sessionId }, { skip: type === 'host' })

 

  useEffect(() => {
    if (sessionInfo && wallet) {
      const session=sessionInfo.data as ISession;
      
      const totalCost = session?.rate * (duration / 3600);

      if (wallet?.silverCoins && wallet?.silverCoins - totalCost < 5) {
        setOpenDialog(true)
      }
      if (!wallet?.silverCoins || wallet?.silverCoins <= totalCost) {
        terminate()
      }

    }
  }, [duration, sessionInfo, terminate, wallet])



  const formatTime = useCallback((timeInSeconds: number) => {

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);


  useEffect(() => {
    if (startTime == 0) return
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = Math.floor((currentTime - startTime) / 1000);

      setDuration(elapsed)
      setFormatedDuration(formatTime(elapsed));
    }, 1000);

    return () => clearInterval(interval);
  }, [formatTime, startTime]);



  function close() {

    setOpenDialog(false)

  }
  return (
    <>
      <span className="text-white">{formatedDuration}</span>
      <Transition appear show={openDialog}>
        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                    Session Timeout
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/60">
                    You've used majority of your chat coins for this session, and this sesssion is about to terminate due to lack of coins.
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Got it!
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>



  )
}

export default SessionDuration
