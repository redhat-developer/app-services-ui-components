import React, { useContext } from "react";

/**
 * The AlertVariant corresponds to the Patternfly AlertVariant but is redeclared here to avoid a hard dependency.
 */
export enum AlertVariant {
    success = 'success',
    danger = 'danger',
    warning = 'warning',
    info = 'info',
    default = 'default'
}

/**
 * The Alert interface allows alerts to be added to the notification system
 */
export type Alert = {
    /**
     * addAlert allows an alert an alert to be added
     * @param title the title of the alert   
     * @param variant the type of the alert
     * @param message the title of the message
     * @param dataTestId the data-testid attribute of the alert
     * @param skipAutoClose the flag to skip auto close of the alert
     */
    addAlert: (title: string, variant?: AlertVariant, message?: string | React.ReactElement,
        dataTestId?: string,
        skipAutoClose?: boolean) => void
}

/**
 * The AlertContext allows access to the Alert context
 */

export const AlertContext: React.Context<Alert | undefined> = React.createContext<Alert | undefined>(undefined);

/**
 * useAlert is a custom hook that is a shorthand for useContext(AlertContext)
 */
export const useAlert = (): Alert => useContext(AlertContext);
