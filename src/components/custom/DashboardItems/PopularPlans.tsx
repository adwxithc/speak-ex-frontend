
import { ICoinPurchasePlan } from "../../../types/database"
import Table, { IColumns } from "../table/Table"

function PopularPlans({popularPlans}:{popularPlans:ICoinPurchasePlan[]}) {

    const columns: IColumns<ICoinPurchasePlan>[] = [
    
        { Header: 'plan', accessor: 'image', Cell:(row:ICoinPurchasePlan)=>(<div className="h-14 w-14"><img className="object-cover object-center h-full w-full rounded " src={row.image}  /></div>) },
        { Header: 'coins', accessor: 'count' },
        { Header: 'Price', accessor: 'price' },
    ]

  return (
    <div className="font-semibold text-black/80 p-5">
        <h3 className=" mb-3" >Popular plans</h3>
      
        <div className=" overflow-hidden rounded-md ">
        <Table columns={columns} data={popularPlans} />
        </div>
 
        
        
      
    </div>
  )
}

export default PopularPlans
