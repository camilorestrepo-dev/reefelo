import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./en.json";
import esJSON from "./es.json";

i18n.use(initReactI18next).init<InitOptions>({
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: enJSON },
    es: { translation: esJSON },
  },
  lng: navigator.language.split("-")[0],
  fallbackLng: "es",
});

export default i18n;
