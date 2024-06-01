
import Avatar from '../../../components/ui/Avatar/Avatar'
import { ArrowDown, ArrowUp, BadgeIndianRupee, Coins } from 'lucide-react'
import { ISessionDetails } from '../../../types/database'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import moment from 'moment'

function SingleSession({session}:{session:ISessionDetails}) {

    const { userData } = useSelector((state: RootState) => state.user)
    const type = session.helperData.id==userData?.id?'Helping session':'Learning session'
    const otherUser = session.helperData.id==userData?.id?session.learnerData:session.helperData
    const {duration, date, coinExchanged} = useMemo(()=>{
        const datetime1 = moment(session.startingTime);
        const datetime2 = moment(session.endingTime); 

        // Calculate the difference between the two datetimes
        const duration = moment.duration(datetime2.diff(datetime1));

        const totalSeconds = duration.asSeconds();
        const totalHours = Number((totalSeconds / 3600).toFixed(2));
        const coinExchanged= totalHours* session.rate;

        // Get the difference in hours, minutes, and seconds
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        const date = moment(session.startingTime).format('YYYY-MM-DD');
        return {duration:`${hours} hours, ${minutes} minutes, ${seconds} seconds`, date,coinExchanged}
    },[session.endingTime, session.rate, session.startingTime])

    return (
        <div className="flex flex-col flex-wrap  sm:flex-row justify-between gap-5 border-b py-5 ">
            
            <div className="flex items-center gap-3 ">
                <Avatar src={otherUser.profile} className="h-11 w-11" />
                <div className="flex flex-col  justify-center ">
                    <span className="text-black/90 font-semibold ">{otherUser.firstName + ' '+otherUser.lastName}</span>
                    <span className="text-sm font-medium text-black/60">{otherUser.userName}</span>
                </div>
            </div>

            <div className="sm:flex items-center justify-center gap-1 hidden ">
                <span className="font-medium text-black/70">{type}</span>
            </div>

            <span className="flex items-center  ">
                {

                
                    session.learnerData.id==userData?.id?
                    <ArrowDown color="red" size={17} />
                    :<ArrowUp color="green" size={17} />
                  

                }

                
                
                <span  className="text-sm ml-1 mr-0.5">{session.isMonetized && session.helperData.id==userData?.id?session.moneyToTheHelper:coinExchanged}</span>
                { session.isMonetized?(
                    session.learnerData.id==userData?.id?
                    <Coins fill="yellow" size={17} color="orange" />
                    :<BadgeIndianRupee fill='#00c006' size={17} color='#005903' />
                ):(
                    <Coins fill="gray" size={18} color="black" />
                )
                }
                
            </span>
            <div className="flex items-center">
                <span className="text-black/60 sm:text-black/80  font-semibold text-sm">{date}</span>
            </div>

            <div className="text-black/60 text-sm font-medium">
                <span > {duration}</span>
               

            </div>
        </div>
    )
}

export default SingleSession
