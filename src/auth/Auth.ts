import React from "react";

export type Auth = {
    getToken: () => Promise<string>
}

export const AuthContext = React.createContext<Auth | undefined>();