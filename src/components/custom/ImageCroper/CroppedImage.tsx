import { Dispatch, SetStateAction } from 'react'
import Button from '../../ui/button/Button';

interface ICroppedImage{
    imageAfterCrop:string;
    setCurrentPage:Dispatch<SetStateAction<string>>;
    setpic:Dispatch<SetStateAction<string>>;
    setShowNext?:Dispatch<SetStateAction<boolean>>

}

function CroppedImage({imageAfterCrop,setCurrentPage,setpic,setShowNext}:ICroppedImage) {
  return (
    <div>
        <div className=' max-w-[600px]'>
        <img src={imageAfterCrop} alt="" />
        </div>
        <div className='flex justify-center mt-3'>
        <Button varient={'primary-outline'} size={'md'} onClick={() => setCurrentPage('crop-img')} type="button" >Crop</Button>
        <Button varient={'primary'} size={'md'} onClick={() => { setCurrentPage('choose-img'); setpic(''); setShowNext && setShowNext(false) }} >New Image</Button>
        </div>

    </div>
  )
}

export default CroppedImage
