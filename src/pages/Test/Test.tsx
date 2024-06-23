import { Globe } from "lucide-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";



function Test() {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', lang: 'English' },
    { code: 'fr', lang: 'French' },
    { code: 'hi', lang: 'Hindi' },
    { code: 'ar', lang: 'Arabic' },
    { code: 'ml', lang: 'Malayalam' }
  ];

  const changeLanguage = (langCode: string) => {
  
    i18n.changeLanguage(langCode);
  };

  const [open, setOpen] = useState(false)
  const language= languages.find(l=>l.code==i18n.language);

  return (
    <div className="bg-secondary h-screen flex  justify-center items-center ">

      <div className="relative" onBlur={()=>setOpen(false)}>
        <button  onClick={()=>setOpen(true)} className="border-2 bg-white mb-1 border-black p-1 px-2 font-semibold rounded-full flex items-center "><span>{language?.lang}</span><Globe className="ml-1" size={20} /></button>
        {
          open &&
          <ul className="shadow-md bg-white rounded p-1 absolute  -left-2 -right-2">
            {languages.map((lang: { code: string; lang: string; }) => (<li onMouseDown={()=>changeLanguage(lang.code)} className="mb-1  hover:bg-black/10 rounded cursor-pointer text-center font-semibold text-black/80" key={lang.code}>{lang.lang}</li>))}
          </ul>
        }
      </div>


    </div>
  )
}

export default Test
