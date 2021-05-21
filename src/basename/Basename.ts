import React, { useContext } from "react";

export type Basename = {
    getBasename: () => string
}

export const BasenameContext: React.Context<Basename | undefined> = React.createContext<Basename | undefined>(undefined);

export const useBasename = (): Basename => useContext(BasenameContext);
