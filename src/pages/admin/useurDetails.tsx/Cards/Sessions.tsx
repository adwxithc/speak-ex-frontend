import { Star, StarHalf } from "lucide-react";

interface ISessionsData {
  helpingSessions: number;
  learningSessions: number;
  rating: number;
  avgHelpingSessionsPerMonth: number;
  avgLearningSessionsPerMonth: number
}
function Sessions({ sessionData}: {sessionData:ISessionsData}) {
  return (
    <div className='max-w-[200px] sm:max-w-md p-3'>
      <img className="h-48 w-48 mx-auto mb-5 rounded-full" src="/src/assets/Images/menuIcon/profile.png" alt="" />
      
      <h2 className='text-lg font-bold mb-5'>Sessions</h2>
      <div className="text-black/50 font-medium w-full max-w-96 text-sm">
            <p className="flex justify-between mb-3 gap-3">
            <span className="capitalize"> Rating:</span>
            <span className="flex gap-1  flex-wrap">
            {
               
              Array.from({ length:5  }, (_, i) => (
                  i+1<sessionData.rating? <Star size={17} color={'orange'} fill={'orange'} key={i} /> : sessionData.rating%1!==0 && Math.floor(sessionData.rating) == i ?  <span className="relative"><StarHalf className="absolute" size={17} color={'orange'} fill={'orange'} /><Star size={17} color={'gray'}  fill={'gray'} key={i} /></span>:<Star size={17} color={'gray'}  fill={'gray'} key={i} />

                ))
                 
            }
            </span>
            </p>
        <p className="flex justify-between mb-3 gap-3">
          <span className="capitalize"> total helping Session count:</span> <span className="text-black/70 font-normal">{sessionData.helpingSessions}</span>
        </p>
        <p className="flex justify-between mb-3 gap-3">
          <span className="capitalize"> total learning Session count:</span> <span className="text-black/70 font-normal">{sessionData.learningSessions}</span>
        </p>
        <p className="flex justify-between mb-3 gap-3">
          <span className="capitalize"> average helping Sessions per month:</span> <span className="text-black/70 font-normal">{sessionData.avgHelpingSessionsPerMonth}</span>
        </p>

        <p className="flex justify-between mb-3 gap-3">
          <span className="capitalize"> average learning Sessions per month:</span> <span className="text-black/70 font-normal">{sessionData.avgLearningSessionsPerMonth}</span>
        </p>

      </div>

    </div>
  )
}

export default Sessions
