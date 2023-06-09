import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './assets/en';
import fr from './assets/fr';
import {getLanguage} from "./controller/AuthService";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: en               // 'common' is our custom namespace
      },
      fr: {
        common: fr
      },
    },
    lng: getLanguage() || 'fr',
    fallbackLng: ['fr', 'en'],
    debug: process.env.NODE_ENV !== 'production',
    ns: ['common'],
    defaultNS: 'common',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  });
export default i18n;

export function changeLanguage(language) {
  i18n.changeLanguage(language).then(() => console.log("successful change language")).catch((err) => console.log("error lang"));
}
