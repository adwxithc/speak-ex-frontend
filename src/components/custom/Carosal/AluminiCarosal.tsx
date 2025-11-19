
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
  const heading = t('alumniHeading', { returnObjects: true }) as {part1: string, highlight: string, part2: string}
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
      <div className='mb-16 md:mb-20'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl ml-5 md:ml-8 font-bold text-gray-900 mb-8'>
          {heading.part1} <span className='text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'>{heading.highlight}</span> {heading.part2}
        </h1>
        <div className='flex gap-5 md:gap-6 overflow-scroll hide-scrollbar px-5 md:px-8'>

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
