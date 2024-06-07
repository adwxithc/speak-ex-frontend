import moment from "moment";
import Table, { IColumns } from "../../../components/custom/Table/Table"
import { useDeletePurchasePlanMutation, useGetPurchasePlansQuery } from "../../../redux/features/admin/coinPurchase/coinPurchasePlanApiSlice"
import { ICoinPurchasePlan } from "../../../types/database";
import Button from "../../../components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DialogBox from "../../../components/custom/DialogBox/DialogBox";
import { ClipLoader } from "react-spinners";
import { IBackendResponse } from "../../../types/queryResults";



function GoldCoins() {


  const navigate = useNavigate()
  const [deletePurchasePlan, { isLoading }] = useDeletePurchasePlanMutation()
  const [isOpen, setIsOpen] = useState(false)
  const [plans, setPlans] = useState<ICoinPurchasePlan[]>([])
  const [selectedId, setSelectedId] = useState('')

  const handleShowImage = (row: ICoinPurchasePlan) => {
    return (
      <div className="flex justify-center">
        <div className="h-20 w-20 rounded  shadow">
          <img className="h-full w-full object-cover object-center" src={row.image} alt={row.title} />
        </div>
      </div>
    )
  }

  const handleDeletePlan = async () => {
    const res = await deletePurchasePlan({ id: selectedId }).unwrap() as IBackendResponse<ICoinPurchasePlan>

    setPlans(prev => [...prev.filter(plan => plan.id !== res.data.id)])
    setIsOpen(false)
  }

  const handleDeleteWarning = (id: string) => {
    setIsOpen(true)
    setSelectedId(id)
  }

  const columns: IColumns<ICoinPurchasePlan>[] = [

    { Header: 'Image', accessor: 'image', Cell: handleShowImage },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Coin Count', accessor: 'count' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Created At', accessor: 'createdAt', Cell: (row: ICoinPurchasePlan) => <span>{moment(row.createdAt).format('YYYY-MM-DD')}</span> },
    { Header: 'Id', accessor: 'id' },
    {
      Header: 'Action', accessor: 'deleted', Cell: (row: ICoinPurchasePlan) => (
        <div>
          <Button varient={'danger-square'} size={'sm'} onClick={() => handleDeleteWarning(row.id)}>Delete</Button>
        </div>
      )
    },
  ];

  const { data: purchasePlanData, refetch } = useGetPurchasePlansQuery({})


  useEffect(() => {
    setPlans(purchasePlanData?.data as ICoinPurchasePlan[] || [])
  }, [purchasePlanData?.data])

  useEffect(() => {
    refetch()
  }, [refetch])



  return (
    <div className="">

      <h1 className="text-2xl text-black/90 mb-5 font-semibold text-center">Purchase Plans</h1>

      <div className="flex justify-end mb-3">
        <Button onClick={() => navigate('/admin/create-plan')} varient={'primary-square'} size={'md'} >Add New Plan</Button>
      </div>

      <div className=" border  rounded-md  overflow-auto">
        <Table columns={columns} data={plans} />
      </div>


      <DialogBox {...{ isOpen, setIsOpen, onClose: () => setIsOpen(false), title: 'Delete comment' }} >
        <>
          <p className="mt-2 text-sm/6 text-black/50">
            Are you sure you want to delete this plan? Once deleted, it cannot be recovered.

          </p>
          <div className="mt-4">
            <Button
              className="inline-flex items-center gap-2 rounded-md bg-primary py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={handleDeletePlan}
            >
              {
                isLoading ?
                  <ClipLoader size={20} color="white" /> :
                  'Yes, do it!'
              }

            </Button>
          </div>
        </>
      </DialogBox>
    </div>
  )
}

export default GoldCoins
