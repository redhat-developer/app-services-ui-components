import i18next, { i18n, ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncBackend from "./AsyncBackend";

export function initI18next(
  lng: string,
  resources: {
    [language: string]: {
      [namespace: string]: () => Promise<ResourceLanguage>;
    };
  },
  debug = false
): i18n {
  const instance = i18next.createInstance();
  const languages = Object.keys(resources);
  const namespaces = Object.keys(resources[lng] || resources[languages[0]]);
  instance
    // pass the i18n instance to react-i18next.
    .use(AsyncBackend)
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      lng,
      fallbackLng: "en",
      load: "languageOnly",
      backend: { resources },
      debug,
      detection: { caches: [] },
      contextSeparator: "~",
      ns: namespaces,
      partialBundledLanguages: true,
      appendNamespaceToCIMode: true,
      nsSeparator: ":",
      keySeparator: ".",
      postProcess: [`markdownPostprocessor`],
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
        format: function (value, format, _lng) {
          if (format === "lowercase") return value.toLocaleLowerCase();
          return value;
        },
      },
      react: {
        useSuspense: true,
      },
      saveMissing: false,
      // missingKeyHandler: function (lng, ns, key) {
      //   // window.windowError = `Missing i18n key "${key}" in namespace "${ns}" and language "${lng}."`;
      //   // eslint-disable-next-line no-console
      //   //  console.error(window.windowError); // we use these in OpenShift to break tests
      // },
    })
    .then(() => {
      debug && console.log("Done initializing i18n");
    });

  return instance;
}
