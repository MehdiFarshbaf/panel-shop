// ** I18n Imports
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// ** Languages Imports
const en = new URL('../../assets/data/locales/en.json', import.meta.url).href
const fa = new URL('../../assets/data/locales/fa.json', import.meta.url).href


const languages = {
  en,
   fa,
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  
  .use(initReactI18next)
  .init({
    lng: 'fa',
    backend: {
      loadPath: lng => languages[lng]
    },
    fallbackLng: 'en',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  },)

export default i18n
