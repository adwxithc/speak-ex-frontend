
import AluminiCard from '../Card/AluminiCard';
import Container from '../../layout/Container/Container';

function Carosal() {

  return (
    <Container className='px-8 mx-auto'>
      <h1 className='text-3xl font-semibold'>Alumini Words</h1>
    <div className='flex gap-5 overflow-scroll  relative hide-scrollbar'>
    

        <AluminiCard />
        <AluminiCard/>
        <AluminiCard/>
        <AluminiCard/>

     
    </div>
    </Container>
  )
}

export default Carosal
