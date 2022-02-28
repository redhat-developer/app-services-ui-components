# @rhoas/app-services-ui-components

> @rhoas/app-services-ui-components contains a number of components for the Managed Application Services UI.

[![npm version](https://badge.fury.io/js/@rhoas%2Fapp-services-ui-components.svg)](https://badge.fury.io/js/@rhoas%2Fapp-services-ui-components) [![codecov](https://codecov.io/gh/redhat-developer/app-services-ui-components/branch/main/graph/badge.svg?token=1SP1HDRP54)](https://codecov.io/gh/redhat-developer/app-services-ui-components)

The project is documented using Storybook, published on [GitHub Pages](https://redhat-developer.github.io/app-services-ui-components).

## Usage

```tsx
import { Something } from '@rhoas/app-services-ui-components';

<Something />
```

## Install

With [npm](https://npmjs.org/) installed, add the package to your peer and development dependencies.

```bash

$ npm install --save-dev --save-peer --save-exact @rhoas/app-services-ui-components

```

It's not recommended installing the package as a direct dependency to avoid having it bundled in your project's bundle.

Finally, make sure to list the dependency as a shared singleton in your federated 
module section on the Webpack's config file.  
Be sure to enable the singleton option in order to have the internationalization 
layer work correctly. 

```js
// webpack.js

const { dependencies, peerDependencies } = require('./package.json');

module.exports = () => {
  return {
    // ...
    plugins: [
      // other plugins
      new webpack.container.ModuleFederationPlugin({
        name: 'my-module',
        filename: 'my-module.js',
        exposes: {
          './MyModule': './src/MyModule',
        },
        shared: {
          ...dependencies,
          ...peerDependencies,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: peerDependencies['react'],
          },
          'react-dom': {
            eager: true,
            singleton: true,
            requiredVersion: peerDependencies['react-dom'],
          },
          'react-i18next': {
            singleton: true,
            requiredVersion: peerDependencies['react-i18next'],
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: peerDependencies['react-router-dom'],
          },
          '@rhoas/app-services-ui-components': {
            singleton: true,
            requiredVersion: peerDependencies['@rhoas/app-services-ui-components'],
          },
          '@rhoas/app-services-ui-shared': {
            singleton: true,
            requiredVersion: peerDependencies['@rhoas/app-services-ui-shared'],
          },
          '@patternfly/quickstarts': {
            singleton: true,
            requiredVersion: '*',
          },
        },
      })
    ]
  };
}
```

## Optional: set up the shared context providers

> This step is required *only* if you want to run your application without
> the `app-services-ui` dev server. Never place the following code in components
> you make available as a federated module!

```tsx
// App.tsx

import { VoidFunctionComponent } from "react";
import { I18nProvider, ModalProvider } from "@rhoas/app-services-ui-components";

const App: VoidFunctionComponent = () => (
  <I18nProvider
    lng={'en'}
    resources={{
      en: {
        common: () => import('@rhoas/app-services-ui-components/locales/en/common.json'),
        'create-kafka-instance': () => import('@rhoas/app-services-ui-components/locales/en/create-kafka-instance.json'),
        kafka: () => import('@rhoas/app-services-ui-components/locales/en/kafka.json'),
        metrics: () => import('@rhoas/app-services-ui-components/locales/en/metrics.json'),
        overview: () => import('@rhoas/app-services-ui-components/locales/en/overview.json'),
        datascienceoverview: () => import('@rhoas/app-services-ui-components/locales/en/datascienceoverview.json'),
        apimgmtoverview: () => import('@rhoas/app-services-ui-components/locales/en/apimgmtoverview.json'),
        "manage-kafka-permissions": () => import("@rhoas/app-services-ui-components/locales/en/manage-kafka-permissions.json"),},
    }}
    debug={true}
  >
    <ModalProvider>
      my app goes here
    </ModalProvider>
  </I18nProvider>
);
```

## See Also

- [`redhat-developer/app-services-ui`](https://github.com/redhat-developer/app-services-ui) Managed Application Services main UI
- [`redhat-developer/kas-ui`](https://github.com/bf2fc6cc711aee1a0c2a/kas-ui) Control Plane UI (list Kafka instances, create Kafka instances)
- [`redhat-developer/kafka-ui`](https://github.com/bf2fc6cc711aee1a0c2a/kafka-ui) Data Plane UI (details about a Kafka instance: metrics, topics, ACLs, etc.)
- [`redhat-developer/srs-ui`](https://github.com/bf2fc6cc711aee1a0c2a/srs-ui) Service Registry UI
- [`redhat-developer/cos-ui`](https://github.com/bf2fc6cc711aee1a0c2a/cos-ui) Managed Connectors UI

## License

[Apache](https://github.com/redhat-developer/app-services-ui-components/blob/main/LICENSE.md)

