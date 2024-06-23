import { Star, StarHalf } from "lucide-react"
import Avatar from "../../ui/Avatar/Avatar"

export interface AluminiCardProps{
  name:string,
  feedback:string,
  profile:string,
  rating:number,
  userName:string
}

function AluminiCard({feedback,userName,name,profile,rating}:AluminiCardProps) {
  return (
    <>
    <div className="bg-white shadow-lg my-5 p-5  rounded-xl border cursor-pointer">
      <blockquote className="italic">
      <p className=" line-clamp-3 mb-5 text-sm text-black/50">
        "{feedback}"
      </p>
      </blockquote>
      <div className="flex justify-between ">

        <div className="flex gap-3 w-[200px]">
          <Avatar className="h-10 w-10" src={profile} />
          <div >
            <span className="font-semibold text-sm block text-black/90">{name}</span>
            <span className="text-black/60 block text-xs">{userName}</span>
          </div>

        </div>
        <span className="flex">
          {

            Array.from({ length: 5 }, (_, i) => (
              i + 1 <= rating ? <Star size={15} color={'orange'} fill={'orange'} key={i} /> : rating % 1 !== 0 && Math.floor(rating) == i ? <span className="relative"><StarHalf className="absolute" size={15} color={'orange'} fill={'orange'} /><Star size={15} color={'gray'} fill={'gray'} key={i} /></span> : <Star size={15} color={'gray'} fill={'gray'} key={i} />

            ))

          }
        </span>

      </div>
    </div>
    
    </>
  )
}

export default AluminiCard
