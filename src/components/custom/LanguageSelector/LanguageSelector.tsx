import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../../../utils/style-utils";

function LanguageSelector({className}:{className?:string}) {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', lang: 'English', available: true },
    { code: 'fr', lang: 'French', available: true },
    { code: 'hi', lang: 'Hindi', available: true },
    { code: 'ar', lang: 'Arabic', available: false },
    { code: 'ml', lang: 'Malayalam', available: true }
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
          onClick={() => setOpen(prev => !prev)} 
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
            {languages.map((lang: { code: string; lang: string; available: boolean }) => (
              <li 
                className="mb-1 last:mb-0"
                key={lang.code}
              >
                <button
                  onMouseDown={() => lang.available && changeLanguage(lang.code)} 
                  disabled={!lang.available}
                  className={cn(
                    "w-full rounded-lg text-left px-4 py-2.5 font-medium transition-colors duration-150",
                    lang.available 
                      ? "hover:bg-primary/10 cursor-pointer" 
                      : "opacity-50 cursor-not-allowed",
                    i18n.language === lang.code && lang.available ? "bg-primary/5 text-primary" : "text-gray-700"
                  )}
                >
                  <span className="flex items-center justify-between">
                    {lang.lang}
                    {!lang.available && <span className="text-xs text-gray-400 ml-2">(Coming soon)</span>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        }
      </div>


  )
}

export default LanguageSelector;
