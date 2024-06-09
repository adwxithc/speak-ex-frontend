import { cn } from "../../../utils/style-utils";
import Container from "../../layout/container/Container";
import Image from '../../ui/image/Image'

interface SectionProps {
    title: string;
    blurHash:string;
    description: string;
    imageUrl: string;
    imagePosition?: 'left' | 'right';
    className?: string
  }

function Section({title, blurHash, description, imageUrl, imagePosition, className }:SectionProps) {
   

  return (
    <Container>
    <section className={cn("flex flex-col md:flex-row items-center py-2 ",className)}>

    {/* image */}
      <div className={cn(`md:w-1/2 mb-4 md:mb-0 order-1 md:order-1 `,imagePosition === 'right' && 'order-1 md:order-2')}>
        
        <Image height={300} width={500}  src={imageUrl} alt={title} className="w-full h-auto max-h-[350px] rounded-lg object-contain" blurHash={blurHash} />
      </div>

    {/* text */}
      <div className={cn(`md:w-1/2 order-1 md:order-2  px-4`,imagePosition === 'right' &&'order-2 md:order-1')}>
        <h2 className="text-2xl sm:text-4xl font-bold mb-6">{title}</h2>
        <p >{`"${description}"`}</p>
      </div>

    </section>
    </Container>
  )
}

export default Section
