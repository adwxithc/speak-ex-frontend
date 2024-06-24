import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../../../utils/style-utils";

function LanguageSelector({className}:{className?:string}) {
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
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const [open, setOpen] = useState(false)
  const language = languages.find(l => l.code == i18n.language);

  return (
  

      <div className="relative w-full text-sm" onBlur={() => setOpen(false)}>
        <button onClick={() => setOpen(true)} className={cn("focus:ring-2 border-2 bg-white mb-1 border-primary text-primary p-0.5  px-2 font-semibold rounded-full flex items-center ",className)}><span>{language?.lang}</span><Globe className="ml-1" size={17} /></button>
        {
          open &&
          <ul className="shadow-md bg-white rounded p-1 absolute  -left-2 -right-2">
            {languages.map((lang: { code: string; lang: string; }) => (<li onMouseDown={() => changeLanguage(lang.code)} className="mb-1  hover:bg-primary/10 rounded cursor-pointer text-center font-semibold text-primary/90" key={lang.code}>{lang.lang}</li>))}
          </ul>
        }
      </div>


  )
}

export default LanguageSelector;
