import React, { useContext } from "react";

export enum AlertVariant {
    success = 'success',
    danger = 'danger',
    warning = 'warning',
    info = 'info',
    default = 'default'
}


export type Alert = {
    addAlert: (title: string, variant?: AlertVariant, message?: string | React.ReactElement,
        dataTestId?: string,
        skipAutoClose?: boolean) => void
}

export const AlertContext: React.Context<Alert | undefined> = React.createContext<Alert | undefined>(undefined);

export const useAlert = (): Alert => useContext(AlertContext);

