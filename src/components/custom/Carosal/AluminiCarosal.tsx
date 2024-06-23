
import AluminiCard, { AluminiCardProps } from '../Card/AluminiCard';
import DialogBox from '../DialogBox/DialogBox';
import { useMemo, useState } from 'react';
import Avatar from '../../ui/Avatar/Avatar';
import { useTranslation } from 'react-i18next';

const feedbacks = [
  {
  
    userName: 'sarax',
    profile: 'Images/aluminies/sara.jpg',
    rating: 4.6
  },
  {

    userName: 'john',

    profile: 'Images/aluminies/john.jpg',
    rating: 5
  },
  {

    userName: 'javad42',

    profile: 'Images/aluminies/javad.jpg',
    rating: 4
  },
  {
  
    userName: 'june',

    profile: 'Images/aluminies/june.jpg',
    rating: 4.5
  }
]

function Carosal() {

  const { t } = useTranslation(['landingPage'])
  const arr = t('alumnis', { returnObjects: true }) as {name:string,feedback:string}[]
  const updatedFeedBack =  useMemo(()=>{
    return arr.map((item,index)=>({...item,...feedbacks[index]}))
  },[arr])

  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState<AluminiCardProps | null>(null)
  const handleClick = (item: AluminiCardProps) => {

    setFeedback(item)
    setOpen(true)
  }

  return (
    <>
      <div className='mb-10 relative -top-20'>
        <h1 className='text-3xl ml-5 font-semibold'>What Our   <span className='text-primary/50'>Alumni</span> Say</h1>
        <div className='flex gap-5 overflow-scroll  hide-scrollbar'>

          {
            updatedFeedBack.map((item) => <div onClick={() => handleClick(item)}><AluminiCard {...{ feedback: item.feedback, name: item.name, profile: item.profile, rating: item.rating, userName: item.userName }} /></div>)
          }

        </div>
      </div>
      <DialogBox {...{ isOpen: open, onClose: () => { setOpen(false); setFeedback(null) } }}>
        <div className='flex gap-2 items-center mb-2'>
          <Avatar src={feedback?.profile} />
          <span className='font-semibold text-lg text-black/90'>{feedback?.name}</span>


        </div>
        <blockquote className="italic">
          <p className=" mb-5 font-semibold  text-black">
            "{feedback?.feedback}"
          </p>
        </blockquote>
      </DialogBox>
    </>
  )
}

export default Carosal
