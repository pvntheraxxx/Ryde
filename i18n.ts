import i18next, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import ru from './locales/ru.json';
import en from './locales/en.json';

const detectedLang = Localization.getLocales()?.[0]?.languageCode ?? 'en';

const config: InitOptions = {
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: detectedLang.startsWith('ru') ? 'ru' : 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
};

i18next.use(initReactI18next).init(config);

export default i18next;
