import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"

const IntlDropdown = () => {
   const { i18n } = useTranslation()
   const langObj = [
      {
         countryCode : "us",
         lang        : "English",
         code        : "en"
      },
      {
         countryCode : "ir",
         lang        : "Persian",
         code        : "fa"
      },
      {
         countryCode : "tr",
         lang        : "Türkiye",
         code        : "tr"
      },
      {
         countryCode : "in",
         lang        : "Hindi",
         code        : "hi"
      },
      {
         countryCode : "cn",
         lang        : "Chinese",
         code        : "zh"
      },
      {
         countryCode : "pt",
         lang    : "spain",
         code    : "pt"
      },
      {
         countryCode : "sa",
         lang    : "Arabic (Saudi Arabia)",
         code    : "ar-SA"
      },
      {
         countryCode : "de",
         lang        : "Deutsch",
         code        : "de"
      }
   ]
   
   const handleLangUpdate = (e, lang) => {
      e.preventDefault()
      i18n.changeLanguage(lang)
   }
   const found = langObj.find(lang => lang.code === i18n.language).countryCode || "fa"
  
   return (
        <UncontrolledDropdown href = "/" tag = "li" className = "dropdown-language nav-item" >
           <DropdownToggle href = "/" tag = "a" className = "nav-link" onClick = { e => e.preventDefault() } >
              <ReactCountryFlag
                   svg
                   className = "country-flag flag-icon"
                   countryCode = { langObj.find(lang => lang.code === i18n.language)?.countryCode || "ir" }
              />
              <span
                   className = "selected-language" >{ langObj.find(lang => lang.code === i18n.language)?.lang || "fa" }</span >
           </DropdownToggle >
           <DropdownMenu className = "mt-0" end >
              {
                 langObj.map(({code, countryCode, lang}) => {
                 return <DropdownItem href = "/" tag = "a" onClick = { e => handleLangUpdate(e, code) } >
                    <ReactCountryFlag className = "country-flag"
                         
                         countryCode = {countryCode} svg />
                    <span className = "ms-1" >{ lang }</span >
                 </DropdownItem >
                 
                 })
              }
          
           </DropdownMenu >
        </UncontrolledDropdown >
   )
}

export default IntlDropdown
