
import { ChangeEvent, FormEvent } from "react";
import Button from "../../../../components/ui/Button/Button";
import { Info } from "lucide-react";
interface IReportFormProps{
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    text: string;
    handleChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void
}

function ReportForm({handleSubmit,handleChange,text}:IReportFormProps) {

   
 
  return (
    <div className="w-[50vw]">
        <h2 className="text-center font-semibold text-lg mb-4">Report Adwaith</h2>
        <form onSubmit={handleSubmit}>
            <textarea value={text} onChange={handleChange} className="bg-gray-100 text-gray-700 rounded-md p-2 block w-full outline-none resize-none pretty-scrollbar" rows={5} placeholder="Write something..."></textarea>
            <p className="text-gray-400 text-xs mt-1 flex items-center gap-1"> <Info size={14} /> If your feedback is valid, rest assured that our admin will personally review all your concerns and take appropriate actions.</p>
            <div className="flex justify-center p-2 mt-2">
               <Button disabled={!text} className="rounded hover:bg-red-500 hover:text-white" varient={'danger-outline'} size={'md'}>Submit.</Button>
            </div> 
            
        </form>
      
    </div>
  )
}

export default ReportForm
