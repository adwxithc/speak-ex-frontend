import { cn } from "../../../utils/style-utils";
import {  motion } from 'framer-motion'
import Image from '../../ui/Image/Image'

interface SectionProps {
  title: string;
  description: string;
  imageUrl: string;
  imagePosition?: 'left' | 'right';
  className?: string
}

const fadeInAnimationVarientTop = {
  initial: {
    opacity: 0,
    y: 200
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
     
    }
  },
}
const fadeInAnimationVarientBottom = {
  initial: {
    opacity: 0,
    y: -200
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
     
    }
  },
}

function Section({  description, imageUrl, imagePosition, className }: SectionProps) {


  return (

    <section className={cn("flex flex-col md:flex-row flex-wrap gap-10 p-2 overflow-hidden md:px-10 h-96 md:h-72 ", className)}>

      {/* image */}
      <motion.div
        variants={fadeInAnimationVarientTop}
        initial='initial'
        
        whileInView='animate'
        viewport={{ once: true }}
        className={cn(` p-1 flex-1 h-full w-full overflow-hidden bg-yellow-50/80 rounded-xl `, imagePosition === 'right' && 'md:order-2')}
      >

        <Image className="h-full w-full object-contain" height={300} width={500} src={imageUrl} alt={description} />
      </motion.div>

      {/* text */}
      <motion.div 
      variants={fadeInAnimationVarientBottom}
      initial='initial'
      
      whileInView='animate'
      viewport={{ once: true }}
      className='  flex-1 flex items-center  '>
        <h2 className="text-black/80 px-14 italic  font-semibold text-center md:text-left text-2xl mb-5 leading-relaxed ">"{description}"</h2>

      </motion.div>

    </section>

  )
}

export default Section
