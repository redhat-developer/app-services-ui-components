import React, {useContext} from "react";

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
     * @param message the title of the message
     * @param variant the type of the alert
     */
    addAlert: (message: string, variant?: AlertVariant) => void
}

/**
 * The AlertContext allows access to the Alert context
 */

export const AlertContext: React.Context<Alert | undefined> = React.createContext<Alert | undefined>(undefined);

/**
 * useAlert is a custom hook that is a shorthand for useContext(AlertContext)
 */
export const useAlert = (): Alert => useContext(AlertContext);
