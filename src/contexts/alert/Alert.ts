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

export type AlertProps = {
    /**
     * Unique key
     */
    id?: string;
    /**
    * Flag to automatically call `onDismiss` after `dismissDelay` runs out.
    */
    autoDismiss?: boolean,
    /**
     * Flag to show/hide notification close button.
     */
    dismissable?: boolean,
    /**
     * Alert variant
     */
    variant: AlertVariant,
    /**
     * Alert title
     */
    title: string,
    /**
     * Alert description
     */
    description?: string | React.ReactElement,
    /**
     * Time period after which `onDismiss` is called.
     */
    dismissDelay?: number,
    /**
     * Unique request ID.
     */
    requestId?: string,
    /**
     * Unique sentry error ID.
     */
    sentryId?: string,
    /**
     * data-testid attribute
     */
    dataTestId?: string
}

/**
 * The Alert interface allows alerts to be added to the notification system
 */
export type Alert = {
    addAlert: ({
        id,
        title,
        variant,
        description,
        dataTestId,
        autoDismiss,
        dismissable,
        dismissDelay,
        requestId,
        sentryId
    }: AlertProps) => void
}

/**
 * The AlertContext allows access to the Alert context
 */

export const AlertContext: React.Context<Alert | undefined> = React.createContext<Alert | undefined>(undefined);

/**
 * useAlert is a custom hook that is a shorthand for useContext(AlertContext)
 */
export const useAlert = (): Alert => useContext(AlertContext);
