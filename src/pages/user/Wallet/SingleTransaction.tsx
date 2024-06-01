import moment from "moment"
import { ITransaction } from "../../../types/database"

function SingleTransaction({transaction}:{transaction:ITransaction}) {
    
    return (
        <div className="flex flex-col gap-2 justify-between text-sm bg-white p-3 shadow-md rounded-md text-black/70 mb-5">
            <div className="w-full flex flex-wrap justify-between items-center">

                <p><span className="font-semibold ">Id : </span><span className="text-black/40 font-semibold">{transaction.id}</span></p>

                {
                    transaction.type=='credit'
                    ? <span className="p-0.5 px-2 font-semibold text-black/70 bg-green-500/30 rounded-md border-2 border-green-500/80">Credit</span>
                    : <span className="p-0.5 px-2 font-semibold text-black/70 bg-red-500/30 rounded-md border-2 border-red-500/80">Debit</span>
                }
               
            </div>
            <div>
                <span className="font-semibold text-black/50">{moment(transaction.createdAt).format('YYYY-MM-DD HH:MM:SS')}</span>
            </div>

            <p><span className=" font-semibold">Description : </span><p className="t">{transaction.description}</p></p>
        </div>
    )
}

export default SingleTransaction
