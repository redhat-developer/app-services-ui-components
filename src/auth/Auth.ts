import React, {useContext} from "react";

export type Auth = {
    getUsername: () => Promise<string>
    kas: {
        getToken: () => Promise<string>
    }
    ams: {
        getToken: () => Promise<string>
    }
    kafka: {
        getToken: () => Promise<string>
    }
}

export const AuthContext: React.Context<Auth | undefined> = React.createContext<Auth | undefined>(undefined);

export const useAuth = (): Auth => useContext(AuthContext);