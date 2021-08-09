import React, { useContext } from "react";

/**
 * The Auth object provides information about the authenticated user
 */
export type Auth = {
    /**
     * Get the username of the authenticated user
     */
    getUsername: () => Promise<string>
    /**
     * Get the is_org_admin of the authenticated user
     */
    isOrgAdmin: () => Promise<boolean>
    kas: {
        /**
         * Get the token for accessing the KAS Fleet Manager
         */
        getToken: () => Promise<string>
    }
    ams: {
        /**
         * Get the token for accessing the Account Management Service
         */
        getToken: () => Promise<string>
    }
    kafka: {
        /**
         * Get the token for access the Kafka instance
         */
        getToken: () => Promise<string>
    }
    srs: {
        /**
         * Get the token for accessing the SRS Fleet Manager
         */
        getToken: () => Promise<string>
    },
    apicurio_registry: {
        /**
         * Get the token for accessing the service registry data plane
         */
        getToken: () => Promise<string>
    }
}

/**
 * The AuthContext allows access to the Auth context
 */
export const AuthContext: React.Context<Auth | undefined> = React.createContext<Auth | undefined>(undefined);

/**
 * useAuth is a custom hook that is a shorthand for useContext(AuthContext)
 */
export const useAuth = (): Auth | undefined => useContext(AuthContext);