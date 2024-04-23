import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import english from './translations/en';
import arabic from './translations/ar';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    resources: {
      en: english,
      ar: arabic,
    },
    lowerCaseLng: true,
    ns: ['translations','registerPage'],
    defaultNS: 'common',
    keySeparator: false,
    load: 'currentOnly',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
  })
  .then(()=>{
    initReactI18next.init(i18n);
  });

export default i18n;
