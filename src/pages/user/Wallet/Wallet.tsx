
import { useEffect, useState } from "react";
import { useGetTransactionsQuery } from "../../../redux/features/user/session/sessionApiSlice"
import SingleTransaction from "./SingleTransaction"
import { ITransaction } from "../../../types/database";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import PaginationButtons from "../../../components/ui/paginationButtons/PaginationButtons";

function Wallet() {
    const { wallet } = useSelector((state: RootState) => state.user)
    const [type, setType] = useState<'all'|'credit'|'debit'>('all')
    const [currentPage,setCurrentPage] = useState(0)
    const [totalPages,setTotalPages] = useState(0)

    const { data } = useGetTransactionsQuery({type,page:currentPage+1})
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    console.log(data);

    useEffect(() => {
        const transactions = data?.data?.transactions as ITransaction[]
        setTransactions(transactions || [])
        setTotalPages(Math.ceil(data?.data.totalTransactions / 5))
    }, [data?.data.totalTransactions, data?.data?.transactions])

    return (
        <div className='p-5 px-10'>

            <h2 className="text-4xl text-black/80 mb-2">Wallet</h2>
            <p className="text-sm text-black/60 mb-8">Track your transactions & wallet balance here </p>
           
            <div className="flex flex-wrap gap-5 mb-8">
                <div className="flex flex-col items-center gap-2 flex-1 border-2 border-blue-400/40 shadow rounded-md p-3 bg-yellow-500/10">
                    <span className="font-semibold text-4xl text-black/70">{wallet?.goldCoins}</span>
                    <span className="font-semibold text-yellow-500 text-lg">Gold</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1 border-2 border-blue-400/40 shadow rounded-md p-3 bg-gray-500/10">
                    <span className="font-semibold text-4xl text-black/70">{wallet?.silverCoins}</span>
                    <span className="font-semibold text-gray-700/80 text-lg">Silver</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1 border-2 border-blue-400/40 shadow rounded-md p-3 bg-green-500/10">
                    <span className="font-semibold text-4xl text-black/70">{wallet?.money}</span>
                    <span className="font-semibold text-green-700 text-lg">Money</span>
                </div>

                <div>


                </div>

            </div>
            <div className="mb-2 flex flex-wrap gap-5 sm:flex-row items-center justify-between">
                <h3 className="font-semibold text-black/80 ">Transactions</h3>
                <div className="flex p-1 bg-gray-300/40 rounded-md gap-1 transition-colors text-sm">
                    <span onClick={() => setType('all')} className={`transition-colors p-2 rounded-md cursor-pointer  ${type == 'all' && 'bg-gray-700/40 text-white'}`}>All</span>
                    <span onClick={() => setType('credit')} className={`transition-colors p-2 rounded-md cursor-pointer ${type == 'credit' && 'bg-gray-700/40 text-white'}`}>Credits</span>
                    <span onClick={() => setType('debit')} className={`transition-colors p-2 rounded-md cursor-pointer ${type == 'debit' && 'bg-gray-700/40 text-white'}`}>Debits</span>
                </div>

            </div>
            <div className="bg-primary/5 p-5 rounded-md">
                <ul>
                    {
                        transactions.map(transaction => (
                            <li key={transaction.id}>
                                <SingleTransaction {...{ transaction }} />
                            </li>
                        ))
                    }



                </ul>
                <PaginationButtons {...{currentPage,setCurrentPage,totalPages}} />
            </div>
        </div>
    )
}

export default Wallet
