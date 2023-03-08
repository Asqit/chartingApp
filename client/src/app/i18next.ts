import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Languages
import czech from '~/assets/locales/cz/translation.json';
import english from '~/assets/locales/en/translation.json';

const resources = {
	en: { translation: english },
	cz: { translation: czech },
};

i18next.use(initReactI18next).use(LanguageDetector).init({
	fallbackLng: 'en',
	resources,
	debug: true,
});
