
import { Star } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
interface IStarProps{
    value:number;
    rating:number;
    ratingHover:number;
    handleRatingChange:(value:number)=>void;
    handleRatingSelect:(value:number)=>void 
  }

const Star1 = ({ value, rating, ratingHover, handleRatingChange, handleRatingSelect }:IStarProps) => {
    return (
      <>
        <input
          value={value}
          name="rating"
          id={`star${value}`}
          type="radio"
          className="hidden text-[#ffda47]"
          checked={rating === value}
          onChange={() => handleRatingSelect(value)}
        />
        <label
          onMouseEnter={() => handleRatingChange(value)}
          onMouseLeave={() => handleRatingChange(0)}
          htmlFor={`star${value}`}
          className={`cursor-pointer `}
        >
         <Star size={35} color={` ${rating >= value || ratingHover >= value ? '#ffda47' : '#9d9c9c6a'}`} fill={` ${rating >= value || ratingHover >= value ? '#ffda47' : '#9d9c9c6a'}`} />
        </label>
      </>
    );
  };

  interface IRatingProps{
    rating:number;
    setRating:Dispatch<SetStateAction<number>>
  }
function Rating({rating,setRating}:IRatingProps) {
    
    const [ratingHover, setRatingHover] = useState(0);
  
    const handleRatingChange = (value:number) => {
      setRatingHover(value);
    };
    const handleRatingSelect = (value:number) => {
      setRating(value);
    };
  
    return (
      <div className="flex gap-3 sm:gap-4 text-[#9d9c9c6a]">
        {[1, 2, 3, 4, 5].map((value) => (
          <div className='flex flex-col items-center' >
          <Star1
            key={value}
            value={value}
            rating={rating}
            ratingHover={ratingHover}
            handleRatingChange={handleRatingChange}
            handleRatingSelect={handleRatingSelect}
          />
          {
            value==1?<span className='text-xs text-gray-400'>Very bad</span>:value==5?<span className='text-xs text-gray-400'>Very good</span>:''
          }
          </div>
        ))}
       
      </div>
    );
}

export default Rating
