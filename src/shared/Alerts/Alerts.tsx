import type { FunctionComponent } from "react";
import { useState, useCallback } from "react";
import type { AlertProps } from "@rhoas/app-services-ui-shared";
import { AlertContext } from "@rhoas/app-services-ui-shared";
import { AlertToastGroup } from "./AlertToastGroup";

export const AlertProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const createId = () => new Date().getTime();

  const hideAlert = useCallback((key: string | undefined) => {
    setAlerts((alerts) => [...alerts.filter((el) => el.id !== key)]);
  }, []);

  const addAlert = useCallback((props: AlertProps) => {
    const id = createId().toString();
    setAlerts((alerts) => [...alerts, { ...props, id }]);
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert }}>
      <AlertToastGroup alerts={alerts} onCloseAlert={hideAlert} />
      {children}
    </AlertContext.Provider>
  );
};
