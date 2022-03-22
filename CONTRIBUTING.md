# Contributing

## Table Of Contents

- [Pull Requests](#pull-requests)
- [Styleguides](#styleguides)
    * [Git Commit Messages](#git-commit-messages)
    * [Coding Standards](#coding-standards)
        + [Typescript strict mode](#typescript-strict-mode)
        + [Imports](#imports)
        + [View Props](#view-props)
        + [Function Components](#function-components)
        + [Hooks](#hooks)
        + [Inference vs Types for useState](#inference-vs-types-for-usestate)
        + [useReducers](#usereducers)
        + [useEffect](#useeffect)
        + [useRef](#useref)
        + [Additional Typescript Pointers](#additional-typescript-pointers)
    * [Classnames and ID Naming Conventions](#classnames-and-id-naming-conventions)
    * [Testing](#testing)
- [Configurations](#configurations)
- [Image Support](#image-support)


## Getting started

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork, and configure the remotes:

```bash
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/app-services-ui-components.git

# Navigate to the newly cloned directory
cd app-services-ui-components

# Assign the original repo to a remote called "upstream"
git remote add upstream git@github.com:redhat-developer/app-services-ui-components.git

# Fetch the code and branches from remote repo "upstream"
git fetch upstream
```

2. Create a branch:

```bash

git checkout -b my-branch upstream/main

```

3. Install the dependencies

```bash

npm install
 
```

4. Run Storybook locally

```bash

npm run storybook
 
```

5. Develop your changes. After development is complete, run build and ensure tests and lint standards pass.

```bash
npm run lint
npm run build
npm run test
```

6. Add a commit using `git commit`:

    Follow the [Git Commit Messages](#git-commit-messages) guidelines to know how to write effective commit messages.

7. Rebase

    Use `git rebase` (not `git merge`) to sync your work from time to time. Ensure all commits related to a single issue have been [squashed](https://github.com/ginatrapani/todo.txt-android/wiki/Squash-All-Commits-Related-to-a-Single-Issue-into-a-Single-Commit).

```bash
git fetch upstream
git rebase upstream/main
```

8. Push

```bash

git push origin my-branch

```

9. Create a Pull Request

    [Open a pull request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the `main` branch. Please be sure to include all of the following in your Pull Request:

    * Any relevant issues associated with this pull request
    * What did you change and how to find the changes on Storybook
   
   A link to preview the Storybook for the Pull Request will be automatically generated as a [status checks](https://help.github.com/articles/about-status-checks/) after the build is complete.


## Pull Requests

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](https://github.com/redhat-developer/app-services-ui-components/blob/main/PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification
* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* When only changing documentation, include `[ci skip]` in the commit title


### Coding Standards

@rhoas/app-services-ui-components uses best practices based off the official [React TypeScript Cheat sheet](https://react-typescript-cheatsheet.netlify.app/), with modifications for this project. The React TypeScript Cheat sheet is maintained and used by developers through out the world, and is a place where developers can bring together lessons learned using TypeScript and React.

#### Typescript strict mode

Typescript is setup in [`strict` mode](https://www.typescriptlang.org/tsconfig#strict). 

#### Imports

Since we are using TypeScript 4.x + for this project, default imports should conform to the new standard set forth in TypeScript 2.7:

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
```

> Note: the project makes use of the [automatic JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) introduced by React 17. 
> You don't need to import React explicitly anymore and you should prefer import destructuring of React's features.
>
> ```typescript
> // 🚫 avoid
> import React from "react";
> const [foo, setFoo] = React.useState('foo');
> 
> // ✅ prefer
> import { useState } from "react";
> const [foo, setFoo] = useState('foo');
> ```

For imports that are not the default import use the following syntax:

```typescript
import { X1, X2, ... Xn } from 'package-x';
```

#### View Props

For props we are using **type** instead of **interfaces**. The reason to use types instead of interfaces is for consistency between the views and because it's more constrained (See [Types or Interfaces](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/types_or_interfaces) for more clarification). By using types we are ensuring that both views will not deviate from the agreed upon [contract](https://dev.to/reyronald/typescript-types-or-interfaces-for-react-component-props-1408).

The following is an example of using a type for props:

```typescript
export type ExampleComponentProps = {
  message: string;
};
```

Since we are using typescript we no longer need to use prop-types as typescript provides the functionality we received with prop-types via types. To set the default value of the props you can do so in by specifying a value in the argument's for the function component. The following is an example on how to do that:

```typescript
type GreetProps = { age?: number };

const Greet: FunctionComponent<GreetingProps> = ({ age = 21 }) => // etc
```

#### Function Components

This project uses function components and hooks over class components.

```typescript
export type ExampleComponentProps = {
  message: string;
} 

export const ExampleComponent: VoidFunctionComponent<ExampleComponentProps> = ({
  message,
  children,
}) => (
  <>
    <div>{message}</div>
    <div>{children}</div>
  </>
);
```

For components that do not have any additional you don't need to pass an additional type to the generic

```typescript
export const ExampleNoPropsComponent: VoidFunctionComponent = () => (
  <div>Example Component with no props</div>
);
```

Use `VoidFunctionComponent` when the component doesn't make any use of the `children` property.
If it does, use `FunctionComponent` instead.

Additional details around function components can be found [here](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components).


#### Hooks

When using hooks with Typescript there are few recommendations that we follow below. Additional recommendations besides the ones mention in this document can be found [here](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks).



#### Inference vs Types for useState

Currently we recommend using inference for the primitive types booleans, numbers, and string when using useState. Anything other then these 3 types should use a declarative syntax to specify what is expected. For example the following is an example of how to use inference:

```typescript
const [isEnabled, setIsEnabled] = useState(false);
```

Here is an example how to use a declarative syntax. When using a declarative syntax if the value can be null that will also need to be specified:

```typescript
const [user, setUser] = useState<IUser | null>(null);

setUser(newUser);
```


#### useReducers

When using reducers make sure you specify the [return type and do not use inference](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks#usereducer).

```typescript
const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement', payload: '5' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>
        +
      </button>
    </>
  );
}
```

#### useEffect

For useEffect only [return the function or undefined](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks#useeffect).

```typescript
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;
  // bad! setTimeout implicitly returns a number because the arrow function body isn't wrapped in curly braces
  useEffect(
    () =>
      setTimeout(() => {
        /* do stuff */
      }, timerMs),
    [timerMs]
  );
  return null;
}
```


#### useRef

When using useRef there are two options with Typescript. The first one is when creating a [read-only ref](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks#useref).

```typescript
const refExample = useRef<HTMLElement>(null!);
```

By passing in null! it will prevent Typescript from returning an error saying refExample maybe null.

The second option is for creating [mutable refs](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks#useref) that you will manage.

```typescript
const refExampleMutable = (useRef < HTMLElement) | (null > null);
```


#### Additional Typescript Pointers

Besides the details outlined above a list of recommendations for Typescript is maintained by several Typescript React developers [here](https://react-typescript-cheatsheet.netlify.app/). This is a great reference to use for any additional questions that are not outlined within the coding standards.

### Classnames and ID Naming Conventions

IDs and classes should follow:

`mas--[page or context]__component--element`

where:

- `mas` = Managed Application Services
- `page or context = the context that the component is part of
- `component` = name of the component
- `element` = element in the component

### Testing

The codebase is tested using [Jest](https://jestjs.io/) in combination with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

Tests should live next to the tested source. Test files should follow the naming convention `[ComponentName].test.tsx`.

Try not to rely too much on Jest's snapshots feature. Snapshots can be useful for components that don't change often,
and are mostly static. If a component has any kind of logic - if statements, state - you should not be using snapshots.

It is a good idea to write a test per each Storybook's story that describes a component, in order 
to keep the stories under control on the CI/CD pipeline. [@storybook/testing-react](https://storybook.js.org/addons/@storybook/testing-react) 
provides some helper to test stories written using the Component Story Format ([CSF](https://storybook.js.org/docs/react/api/csf)).

Pull Request's are automatically checked for code coverage. The threshold is set to 70% of coverage. If a Pull Request doesn't reach this threshold, 
it will not be mergeable without an explicit action from an admin.
 

## Configurations

* [TypeScript Config](https://github.com/redhat-developer/app-services-ui-components/blob/main/tsconfig.json)
* [Jest Config](https://github.com/redhat-developer/app-services-ui-components/blob/main/jest.config.js)

## Image Support

Add images into the [static](https://github.com/redhat-developer/app-services-ui-components/blob/main/static) folder.

To make them available to the package and consumers of the package, add an export for the image to the [images.ts](https://github.com/redhat-developer/app-services-ui-components/blob/main/src/images.ts) source.

```typescript
export const MyImage = new URL(
  "../static/images/MyImage.svg",
  import.meta.url
).href;
```

This syntax will return the URL of the module as served at runtime, making the image available in any environment its 
consumed without additional setup needed by the user of the package.

Add the same export into the [__mocks__/imagesMock.js](https://github.com/redhat-developer/app-services-ui-components/blob/main/__mocks__/imagesMock.js) 
file to make the image available to the Jest test suite.

### Running storybook

Storybook allows developers to test components in separation.
After changing any code related to component developers should verify their changes by running:

```
npm run storybook
```
