import React, { useContext } from "react";

/**
 * The Assets provide access to information about the assets making up the current module, including the path to the assets
 */
export type Assets = {
    /**
     * Provides the path of the asset
     */
    getPath: () => string
}

/**
 * The AssetsContext allows access to the Alert context
 */
export const AssetsContext: React.Context<Assets | undefined> = React.createContext<Assets | undefined>(undefined);

/**
 * useAssets is a custom hook that is a shorthand for useContext(AssetsContext)
 */
export const useAssets = (): Assets | undefined => useContext(AssetsContext);
