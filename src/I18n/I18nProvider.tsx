import { ResourceLanguage } from "i18next";
import React, { FunctionComponent } from "react";
import { I18nextProvider } from "react-i18next";
import { initI18next } from "./initI18next";

export type I18nProviderProps = {
  lng: string;
  resources: {
    [language: string]: {
      [namespace: string]: () => Promise<ResourceLanguage>;
    };
  };
  debug?: boolean;
};
export const I18nProvider: FunctionComponent<I18nProviderProps> = ({
  lng,
  resources,
  debug,
  children,
}) => (
  <I18nextProvider i18n={initI18next(lng, resources, debug)}>
    {children}
  </I18nextProvider>
);
