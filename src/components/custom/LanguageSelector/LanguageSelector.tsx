
import { ChangeEvent, useEffect } from "react"
import { useTranslation } from "react-i18next"


function LanguageSelector() {
    const {i18n}=useTranslation()
    const languages = [
        {code:'en', lang:'English'},
        {code:'fr', lang:'French'},
        {code:'hi', lang:'Hindi'},
        {code:'ar', lang:'Arabic'},
        {code:'ml', lang:'Malayalam'}
    ]

    const changeLanguage =(e:ChangeEvent<HTMLSelectElement>)=>{
            
            i18n.changeLanguage(e.target.value)
    }

    useEffect(()=>{
        document.body.dir=i18n.dir()
    },[i18n,i18n.language])
  return (
    <div>
      <select onChange={(e)=>changeLanguage(e)} >
        {languages.map(lng=><option selected={lng.code==i18n.language} key={lng.code} value={lng.code}>{lng.lang}</option>)}
        
      </select>
    </div>
  )
}

export default LanguageSelector
