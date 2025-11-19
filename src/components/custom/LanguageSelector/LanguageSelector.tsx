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
        <button 
          onClick={() => setOpen(true)} 
          className={cn(
            "focus:ring-2 focus:ring-primary/30 border-2 bg-white border-primary/70 text-primary hover:border-primary hover:bg-primary/5 p-2 px-4 font-semibold rounded-full flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md",
            className
          )}
        >
          <Globe size={18} />
          <span className="hidden sm:inline">{language?.lang || 'English'}</span>
          <svg 
            className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {
          open &&
          <ul className="shadow-lg bg-white rounded-xl p-2 absolute top-full mt-2 left-0 right-0 border border-gray-100 z-50 min-w-[160px]">
            {languages.map((lang: { code: string; lang: string; }) => (
              <li 
                onMouseDown={() => changeLanguage(lang.code)} 
                className={cn(
                  "mb-1 last:mb-0 hover:bg-primary/10 rounded-lg cursor-pointer text-left px-4 py-2.5 font-medium transition-colors duration-150",
                  i18n.language === lang.code ? "bg-primary/5 text-primary" : "text-gray-700"
                )} 
                key={lang.code}
              >
                {lang.lang}
              </li>
            ))}
          </ul>
        }
      </div>


  )
}

export default LanguageSelector;
