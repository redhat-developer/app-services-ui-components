import React, { useContext } from "react";

export type Assets = {
    getPath: () => string
}

export const AssetsContext: React.Context<Assets | undefined> = React.createContext<Assets | undefined>(undefined);

export const useAssets = (): Assets => useContext(AssetsContext);
