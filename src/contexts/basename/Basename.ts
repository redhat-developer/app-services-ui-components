import React, { useContext } from "react";

/**
 * The Basename object provides information about the basename for the current module when running in the service
 */
export type Basename = {
    /**
     * The current basename for the module
     */
    getBasename: () => string
}

/**
 * The BasenameContext allows access to the Basename context
 */
export const BasenameContext: React.Context<Basename | undefined> = React.createContext<Basename | undefined>(undefined);

/**
 * useBasename is a custom hook that is a shorthand for useContext(BasenameContext)
 */
export const useBasename = (): Basename => useContext(BasenameContext);
