
import moment from 'moment';
import { ILanguage } from '../../../../types/database';

interface ILanguageInfos {
  proficientLanguageInfo: ILanguage[];
  focusLanguageInfo: ILanguage;
}
function Languages({ focusLanguageInfo, proficientLanguageInfo }: ILanguageInfos) {
  return (
    <div className='p-1 max-w-3xl'>

      <h2 className='text-lg font-bold mb-5 '>Language Details</h2>
      <div className='mb-3 border-b py-5'>
        <h3 className='font-medium  mb-2 '>Focuse Language</h3>
        <div className='bg-black/5 p-3 rounded shadow-md flex flex-col font-semibold text-black/90 w-80 text-xs'>
          <h4 className='font-bold text-md text-center mb-3 capitalize'>{focusLanguageInfo.name}</h4>
          <span className='mb-2 inline-flex justify-between gap-5'>Id: <span className='text-black/50'>{focusLanguageInfo.id}</span></span>
          {/* <span className='mb-2 inline-flex justify-between gap-5'>Language: <span className='text-black/50'>{focusLanguageInfo.name}</span></span> */}
          <span className='mb-2 inline-flex justify-between gap-5'>Base Price: <span className='text-black/50'>{focusLanguageInfo.basePrice}</span></span>
          <span className='mb-2 inline-flex justify-between gap-5'>Rate: <span className='text-black/50'>{focusLanguageInfo.rate}</span></span>
          <span className='mb-2 inline-flex justify-between gap-5'>Created At: <span className='text-black/50'>{moment(focusLanguageInfo.createdAt).format('YYYY-MM-DD')}</span></span>
        </div>
      </div>

      <div className=''>
        <h3 className='font-medium  mb-2 '>Proficient Language</h3>

        <div className='flex flex-wrap gap-3'>
          {
            proficientLanguageInfo.map(lang => (
              <div className='bg-black/5 p-3 rounded shadow-md flex flex-col font-semibold text-black/90 w-80 text-xs mb-2'>
                <h4 className='font-bold text-md text-center mb-3 capitalize'>{lang.name}</h4>
                <span className='mb-2 inline-flex justify-between gap-5'>Id: <span className='text-black/50'>{lang.id}</span></span>
      
                <span className='mb-2 inline-flex justify-between gap-5'>Base Price: <span className='text-black/50'>{lang.basePrice}</span></span>
                <span className='mb-2 inline-flex justify-between gap-5'>Rate: <span className='text-black/50'>{lang.rate}</span></span>
                <span className='mb-2 inline-flex justify-between gap-5'>Created At: <span className='text-black/50'>{moment(lang.createdAt).format('YYYY-MM-DD')}</span></span>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Languages
