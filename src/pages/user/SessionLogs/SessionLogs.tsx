
import { useEffect, useState } from "react";
import { useGetVideoSessionsQuery } from "../../../redux/features/user/session/sessionApiSlice"
import SingleSession from "./SingleSession"
import { ISessionDetails } from "../../../types/database";
import PaginationButtons from "../../../components/ui/PaginationButtons/PaginationButtons";



function SessionLogs() {

  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0);
  const [type, setType] = useState<'all'|'learning'|'helping'>('all');

  const { data } = useGetVideoSessionsQuery({ page: currentPage + 1 ,type});


  const [sessions, setSessions] = useState<ISessionDetails[]>([])
  useEffect(() => {
    const result = (data?.data.sessions || []) as ISessionDetails[];
    setSessions(result || [])
    setTotalPages(Math.ceil(data?.data.totalSessions / 5))
  }, [data?.data])
  return (
    <div className="p-8 md:px-10">
      <h2 className="text-black/80 text-3xl mb-3">Session Logs</h2>
      <p className="text-sm text-black/50 mb-10">Track your session history here</p>
      <div className="mb-2 flex flex-wrap gap-5 sm:flex-row items-center justify-between">
        <h3 className="font-semibold text-black/80 ">Recent Sessions</h3>
        <div className="flex p-1 bg-gray-300/40 rounded-md gap-1 transition-colors text-sm">
          <span onClick={()=>setType('all')} className={`transition-colors p-2 rounded-md cursor-pointer  ${type=='all' && 'bg-gray-700/40 text-white'}`}>All</span>
          <span onClick={()=>setType('learning')} className={`transition-colors p-2 rounded-md cursor-pointer ${type=='learning' && 'bg-gray-700/40 text-white'}`}>Learning</span>
          <span onClick={()=>setType('helping')} className={`transition-colors p-2 rounded-md cursor-pointer ${type=='helping' && 'bg-gray-700/40 text-white'}`}>Helping</span>
        </div>

      </div>

      <div>
        <ul>
          {
            sessions.map(session => (<li key={session.id}><SingleSession {...{ session }} /></li>))
          }


        </ul>
        <PaginationButtons {...{ currentPage, setCurrentPage, totalPages }} />

      </div>

    </div>
  )
}

export default SessionLogs
