import { cn } from "../../../utils/style-utils";
import Container from "../../layout/Container/Container";


interface SectionProps {
    title: string;
    description: string;
    imageUrl: string;
    imagePosition?: 'left' | 'right';
    className?: string
  }

function Section({title , description, imageUrl, imagePosition, className }:SectionProps) {
   

  return (
    <Container>
    <div className={cn("flex flex-col md:flex-row items-center py-8",className)}>

    {/* image */}
      <div className={cn(`md:w-1/2 p-11 md:p-20 mb-4 md:mb-0 order-1 md:order-1`,imagePosition === 'right' && 'order-1 md:order-2')}>
        <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg " />
      </div>

    {/* text */}
      <div className={cn(`md:w-1/2 order-1 md:order-2  px-4`,imagePosition === 'right' &&'order-2 md:order-1')}>
        <h2 className="text-2xl sm:text-5xl font-bold mb-4">{title}</h2>
        <p >{`"${description}"`}</p>
      </div>

    </div>
    </Container>
  )
}

export default Section
