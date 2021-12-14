import i18next, { i18n, ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import MarkdownPostprocessor from "i18next-markdown-postprocessor";
import dayjs from "dayjs";
import AsyncBackend from "./AsyncBackend";

export function initI18next(
  lng: string,
  resources: {
    [language: string]: {
      [namespace: string]: () => Promise<ResourceLanguage>;
    };
  }
): i18n {
  const instance = i18next.createInstance();
  const languages = Object.keys(resources);
  const namespaces = Object.keys(resources[lng] || resources[languages[0]]);
  instance
    .use(MarkdownPostprocessor)
    // pass the i18n instance to react-i18next.
    .use(AsyncBackend)
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(
      {
        lng,
        fallbackLng: "en",
        load: "languageOnly",
        backend: { resources },
        debug: process.env.NODE_ENV === "development",
        detection: { caches: [] },
        contextSeparator: "~",
        ns: namespaces,
        partialBundledLanguages: true,
        appendNamespaceToCIMode: true,
        nsSeparator: ":",
        keySeparator: ".",
        postProcess: [`markdownPostprocessor`],
        interpolation: {
          format: function (value, format, lng) {
            if (format === "number") {
              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Browser_compatibility
              return new Intl.NumberFormat(lng).format(value);
            }
            if (value instanceof Date) {
              // if (format === "fromNow") {
              //   return dayjs(value).fromNow(options.omitSuffix === true);
              // }
              return dayjs(value).format(format);
            }
            return value;
          },
          escapeValue: false, // not needed for react as it escapes by default
        },
        react: {
          useSuspense: true,
        },
        saveMissing: false,
        // missingKeyHandler: function (lng, ns, key) {
        //   // window.windowError = `Missing i18n key "${key}" in namespace "${ns}" and language "${lng}."`;
        //   // eslint-disable-next-line no-console
        //   // console.error(window.windowError); // we use these in OpenShift to break tests
        // },
      },
      () => {
        dayjs.locale(i18next.language);
      }
    );

  instance.on("languageChanged", function (lng) {
    dayjs.locale(lng);
  });

  return instance;
}
