import dayjs from "dayjs";
// locales, used in dayjs should be loaded separately via import
import "dayjs/locale/en";
import "dayjs/locale/ru";
import { I18nProvider, TranslationMessages } from "ra-core";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { en } from "./core/i18n/messages/en";
import { ru } from "./core/i18n/messages/ru";

const translations: Record<string, TranslationMessages> = {
  en,
  ru,
};

const createdPolyglotI18nProvider: I18nProvider = polyglotI18nProvider(
  (locale: string) => translations[locale],
  "en", // default locale
  [
    { locale: "en", name: "English" },
    { locale: "ru", name: "Русский" },
  ]
);

export const i18nProvider: I18nProvider = {
  ...createdPolyglotI18nProvider,
  changeLocale: (locale, options) => {
    // synchronizes react-admin locale update with dayjs locale
    dayjs.locale(locale);

    return createdPolyglotI18nProvider.changeLocale(locale, options);
  },
};
