import React from "react";

export type Config = {
    serviceDown: boolean
    resources: {
        showDrafts: boolean
    }
    controlPlane: {
        serviceApiBasePath: string,
        amsBasePath: string,
        eventCode: string,
        siteCode: string
    }
    dataPlane: {
        keycloak: {
            authServerUrl: string,
            clientId: string,
            realm: string
        }
    }
    federatedModules: {
        strimziUI: FederatedModuleConfig
        mkUiFrontend: FederatedModuleConfig
        guides: FederatedModuleConfig
    }
};


export type FederatedModuleConfig = {
    basePath: string
    entryPoint: string
}

export const ConfigContext = React.createContext<Config | undefined>(undefined);