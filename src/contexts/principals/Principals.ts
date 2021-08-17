import React, { useContext } from "react";

export enum PrincipalType {
    UserAccount= "USER_ACCOUNT",
    ServiceAccount = "SERVICE_ACCOUNT"
}

export type Principal = {
    principalType: PrincipalType
    id: string
    displayName?: string
    emailAddress?: string
}

/**
 * The Principals object provides information about the Principals for access management
 */
export type Principals = {
    /**
     * Get all the principals
     */
    getAllPrincipals: () => Principal[]
}

/**
 * The PrincipalsContext allows access to the Principals context
 */
export const PrincipalsContext: React.Context<Principals | undefined> = React.createContext<Principals | undefined>(undefined);

/**
 * usePrincipals is a custom hook that is a shorthand for useContext(PrincipalsContext)
 */
export const usePrincipals = (): Principals => useContext(PrincipalsContext);
