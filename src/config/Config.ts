import React, { useContext } from "react";

export type Config = {
    serviceDown: boolean
    guides: {
        showDrafts: boolean
    }
    ams: {
        apiBasePath: string,
        eventCode: string,
        siteCode: string,
        quotaId: string
    }
    kas: {
        apiBasePath: string,
    }
    masSso: {
        authServerUrl: string,
        clientId: string,
        realm: string
    }
    kafka: undefined,
    federatedModules: {
        kafka: FederatedModuleConfig
        kas: FederatedModuleConfig
        guides: FederatedModuleConfig
    }
};


export type FederatedModuleConfig = {
    basePath: string
    entryPoint: string
}

export const ConfigContext: React.Context<Config | undefined> = React.createContext<Config | undefined>(undefined);

export const useConfig = (): Config => useContext(ConfigContext);
