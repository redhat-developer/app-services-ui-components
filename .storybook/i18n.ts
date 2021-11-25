import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import Pseudo from "i18next-pseudo";
import dayjs from "dayjs";

export const initI18N = (lng: string, resources: Resource) => {
  const pseudolocalizationEnabled = lng === "pseudo";

  const kasi18n = i18n.createInstance();

  kasi18n
    .use(new Pseudo({ enabled: pseudolocalizationEnabled, wrapped: true }))
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(
      {
        resources,
        lng: !pseudolocalizationEnabled && lng,
        fallbackLng: "en",
        load: "all",
        debug: process.env.NODE_ENV === "development",
        detection: { caches: [] },
        contextSeparator: "~",
        // add any namespaces you're using here for loading purposes
        ns: ["public"],
        defaultNS: "public",
        nsSeparator: ":",
        keySeparator: ".",
        postProcess: ["pseudo"],
        interpolation: {
          format: function (value, format, lng, options) {
            options = options || {};
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
        saveMissing: true,
        // missingKeyHandler: function (lng, ns, key) {
        //   // window.windowError = `Missing i18n key "${key}" in namespace "${ns}" and language "${lng}."`;
        //   // eslint-disable-next-line no-console
        //   // console.error(window.windowError); // we use these in OpenShift to break tests
        // },
      },
      () => {
        dayjs.locale(i18n.language);
      }
    );

  kasi18n.on("languageChanged", function (lng) {
    dayjs.locale(lng);
  });

  return kasi18n;
};
