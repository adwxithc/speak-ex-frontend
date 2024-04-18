import parse from 'html-react-parser';

function ShowContent({html}:{html:string}) {
  return (
    <div className='tiptap h-full'>
    <div className=''>
      {parse(html)}
      
    </div>
    </div>

  )
}

export default ShowContent
