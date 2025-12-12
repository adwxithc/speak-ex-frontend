import { Dispatch, SetStateAction } from 'react'
import Button from '../../ui/Button/Button';
import Image from '../../ui/Image/Image';

interface ICroppedImage{
    imageAfterCrop:string;
    setCurrentPage:Dispatch<SetStateAction<string>>;
    setpic:Dispatch<SetStateAction<string>>;
    setShowNext?:Dispatch<SetStateAction<boolean>>

}

function CroppedImage({imageAfterCrop,setCurrentPage,setpic,setShowNext}:ICroppedImage) {
  return (
    <div className="w-full">
        <div className='w-full flex justify-center mb-6'>
          <div className='max-w-full rounded-xl overflow-hidden shadow-lg border-2 border-gray-200'>
            <Image width={800} height={600} className="object-contain max-h-[400px] w-full" src={imageAfterCrop} alt="Cropped preview" />
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-3'>
          <Button 
            varient={'primary-outline'} 
            size={'md'} 
            onClick={() => setCurrentPage('crop-img')} 
            type="button"
            className="min-w-[120px]"
          >
            Re-crop Image
          </Button>
          <Button 
            varient={'primary'} 
            size={'md'} 
            onClick={() => { setCurrentPage('choose-img'); setpic(''); setShowNext && setShowNext(false) }}
            className="min-w-[120px]"
          >
            Choose Different
          </Button>
        </div>
    </div>
  )
}

export default CroppedImage
