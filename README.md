# aet-react-boilerplate

Use typescript in create-react-app project as well as adding it to a react project from scratch with webpack and babel. And also includes about react hooks, (useState, useContext, useReducer and useEffect), in a react typescript project as well as using suspense to lazy load a component.

## What is typescript and why should we use typescript

1. **Open source** programming language.
2. Developed and maintained by **Microsoft**.
3. A **superset** of Javascript.
4. Bring **static typing** to Javascript.

There two categories of typing. Those are **dynamic/loosely** and **static** typing. So Javascript is loosely typing, but typescript is static typing.

## Typescript process

**Typescript code** ====Compiles to===> J**avascript** ====is easily read by the===> **Browser**

## Description about files

- **src/index.tsx -** Base file that webpack used to retrieve application related data.
- **public/index.html -** React all elements are rendering on this page.
- **webpack.config.js -** All the webpack configurations include inside this Javascript file. It helps to generate main bundle file.
- **.babelrc -** This use for the transpile all the typescript code into normal javascript. Basically it converts all React code into readable javascript for the browser.

## Add below extensions on VSCode

- Bracket Pair Colorizer 2
- Browser Preview
- Code Spell Checker
- Color Picker
- CSS Peek
- Debugger for Chrome
- DotENV
- ES7 React/Redux/GraphQL/React-Native snippets
- ESLint
- GitHub Pull Requests and Issues
- GitLens — Git supercharged
- HTML CSS Support
- Image preview
- Import Cost
- Live Server
- Night Owl
- Node.js Modules Intellisense
- Prettier - Code formatter
- Regex Previewer
- REST Client
- SVG Viewer
- Tailwind CSS IntelliSense
- TypeScript Import Sorter
- vscode-icons

## Eslint and Prettier Configuration on VSCode

**Eslint** is basically a program that analyzes the code for potential errors and bad practices. It has difference code rules, which able to enable or disable. **Prettier** creates an abstract syntax tree from your code and uses it to write new code formatted according to a set of rules, when hit the save.

First add the two extensions (Eslint and Prettier) into VSCode and enable those.
Set global setting **format on save** as true.

After that install below dependencies.

```sh

yarn add typescript --dev
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
yarn add eslint-plugin-react --dev
yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
yarn add eslint-plugin-html --dev
yarn add eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react-hooks
yarn add husky lint-staged stylelint-config-recommended --dev

```

## Dev Dependency installation Guide

```sh

mkdir aet-react-boilerplate
cd react-modern-app
yarn init
yarn add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime --dev
yarn add webpack-cli webpack-dev-server babel-loader --dev
yarn add style-loader css-loader postcss-loader --dev
yarn add html-loader file-loader @types/file-loader source-map-loader --dev
yarn add babel-plugin-formatjs --dev
yarn add babel-plugin-lodash --dev

```

## Dependency installation Guide

```sh

yarn add react react-dom @types/react @types/react-dom
yarn webpack clean-webpack-plugin copy-webpack-plugin html-webpack-plugin mini-css-extract-plugin optimize-css-assets-webpack-plugin terser-webpack-plugin
yarn add dotenv dotenv-webpack
yarn add @types/node
yarn add react-router-dom @types/react-router-dom
yarn add redux react-redux redux-devtools-extension redux-thunk @types/react-redux
yarn add axios
yarn @material-ui/core @material-ui/lab
yarn @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
yarn add lodash-es @types/lodash-es
yarn add tailwindcss @tailwindcss/postcss7-compat postcss autoprefixer @fullhuman/postcss-purgecss
yarn add crypto-js @types/crypto-js
yarn add jwt-decode
yarn add moment
yarn add react-intl
yarn add validator @types/validator
yarn add jest jest-enzyme enzyme enzyme-adapter-react-16 enzyme-to-json identity-obj-proxy react-test-renderer ts-jest @types/jest @types/enzyme
yarn add react-select @types/react-select
yarn add react-toastify
yarn add serve

```

## Tech stack

- ### [webpack](https://webpack.js.org/)

  Webpack has properly used for production deployment and development deployment. All static assets have bundled properly using appropriate loader. In this project has used some third party libraries as modules like ‘CopyPlugin’, ‘HtmlWebpackPlugin’, ‘MiniCssExtractPlugin’, ‘TerserPlugin’, ‘PurgecssPlugin’

- ### [Babel](https://babeljs.io/)

  Babel transpiles/converts use for modern JavaScript ( ECMAScript 2015+ ) code into a backward compatible version of JavaScript in current and older browsers or environments.

- ### [React Router](https://reactrouter.com/)

  Using React Routere all routes has been handled. 404 page, Public and Protected route handling and Authorized route handling according to user roles also handle using React Router.

- ### [axios](https://www.npmjs.com/package/axios)

  Axios acts as a HTTP client library, helps with sending HTTP requests and managing the responses. The project comprises of an API layer which is created using axios and all API calls are handled through that.

- ### [Redux](https://redux.js.org/)

  Using Redux architecture in implementing the project, therefore

  - Easy transmission of data
  - States in Redux are immutable, therefore state only changes over action-creators.
  - Redux helps to centralize the states, therefore we can use previously fetched data in one page, throughout the system.

- ### [redux-thunk](https://www.npmjs.com/package/redux-thunk)

  Redux middlewear calls action creators which returns a function other than returning an action object. The returned function then receives store’s dispatch method that is used in dispatching regular synchronous actions inside function body when the asynchronous operation is completed.

- ### [Material-UI](https://material-ui.com/)

  In this application has used Material UI library more effectively. And also has styled Material UI component properly

- ### [tailwindcss](https://tailwindcss.com/)

  Using Tailwind CSS, therefore

  - Customizable UI.
  - Comes with default configurations, hence high development speed.
  - Tailwind’s utilities are generated with responsive versions, hence can be used these in future
    if site needs to be responsive.

- ### [Font Awesome](https://fontawesome.com/)

  Has used custom icon library font awesome more effetiently.

- ### [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) and [Airbnb](https://airbnb.io/javascript/react/)

  Using code formatters, style guides and linting tools in development, in order to maintain clear and readable code.

  - ESlint is used in maintaining our codebase according to a standard(linting). These two libraries has their own default standards and we can even customize those standards.
  - Prettier is used in formatting project’s codebase, since it does the job better than ESlint even though ESLInt is capable of doing its own code formatting where possible. This will help in code maintainability.
  - Aribnb’s set of rules provide ESlint configurations, in order for linting to work

- ### [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/)

  In here Jest acts as a test runner, assertion library, and mocking library. Enzyme provides JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components’ output.

- ### [lodash-es](https://www.npmjs.com/package/lodash-es)

  Using lodash, therefore

  - Can create composite functions, manipulate objects and arrays easily.
  - Helps in tree shaking.
  - Compatible with major browsers regardless of version

- ### [husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged)

  Better to use Husky library with lint-staged to prevent bad commits.

- ### [react-intl](https://formatjs.io/)

  Web localization with ‘React-Intl’ plugin. React-Intl for format dates, numbers, and strings, including pluralization and handling translations in the system.

- ### [validator](https://www.npmjs.com/package/validator)

  A library of string validators and sanitizers.

- ### [Moment](https://momentjs.com/)

  Moment.js is a great help in managing dates in JavaScript.

## Project Structure

📦aet-react-app <br />
┣ 📂.vscode `(vs code configurations)` <br />
┃ ┣ 📜launch.json `(Configuration file for debugger for chrome extension)` <br />
┃ ┣ 📜restClient.http `(Testing script for rest API calls)` <br />
┃ ┗ 📜settings.json `(Has settings for vs code)` <br />
┣ 📂public `(Public file resources)` <br />
┃ ┗ 📜index.html <br />
┣ 📂src `(Main sources of the application)` <br />
┃ ┣ 📂assets `(Static sources of the application)` <br />
┃ ┃ ┣ 📂animations `(Animations that are used in the system)` <br />
┃ ┃ ┣ 📂data `(Data that are used in arrays are stored in data json files in here)` <br />
┃ ┃ ┣ 📂fonts `(Fonts that are used in the system)` <br />
┃ ┃ ┗ 📂images `(Images that are used in the system)` <br />
┃ ┣ 📂components `(Re-usable components are here (ex: accordions, data tables, form input fields, error boundary, etc.))` <br />
┃ ┃ ┣ 📂Cards <br />
┃ ┃ ┣ 📂ConfirmDialog <br />
┃ ┃ ┣ 📂ErrorBoundary <br />
┃ ┃ ┣ 📂InputFields <br />
┃ ┃ ┃ ┣ 📂Button <br />
┃ ┃ ┃ ┣ 📂Dropdown <br />
┃ ┃ ┃ ┣ 📂Switch <br />
┃ ┃ ┃ ┗ 📂Text <br />
┃ ┃ ┣ 📂Loader <br />
┃ ┃ ┣ 📂Modal <br />
┃ ┃ ┣ 📂Table <br />
┃ ┃ ┃ ┣ 📂Header <br />
┃ ┃ ┃ ┗ 📂Search <br />
┃ ┃ ┗ 📂Template <br />
┃ ┃ ┃ ┣ 📂Footer <br />
┃ ┃ ┃ ┣ 📂Header <br />
┃ ┃ ┃ ┗ 📂SideBar <br />
┃ ┣ 📂config `(This folder includes files with environment variables)` <br />
┃ ┃ ┣ 📜dev.env <br />
┃ ┃ ┣ 📜prod.env <br />
┃ ┃ ┗ 📜staging.env <br />
┃ ┣ 📂pages `(Landing pages are implemented here. (ex: Login, client, client create, etc. ))` <br />
┃ ┃ ┣ 📂Auth <br />
┃ ┃ ┗ 📂NotFound <br />
┃ ┣ 📂redux <br />
┃ ┃ ┣ 📂actions `(Action creators are implemented in here)` <br />
┃ ┃ ┣ 📂reducers `(Reducers which are related to action creators are implemented in here)` <br />
┃ ┃ ┣ 📂types `(Action types are implemented in here)` <br />
┃ ┃ ┗ 📜Store.ts `(Redux store configurations are in here.)` <br />
┃ ┣ 📂routes `(All system routes are initialized in this service.)` <br />
┃ ┃ ┗ 📜routeHandleHOC.tsx `Public and Protected routes are handle by this HOC` <br />
┃ ┣ 📂services `(All system services are initialized in this service.)` <br />
┃ ┃ ┣ 📜api.ts `(All the API call methods are implemented in here)` <br />
┃ ┃ ┣ 📜baseAPI.ts `(API REST service layer configurations.)` <br />
┃ ┃ ┣ 📜loaderService.tsx `(This high order component is used to show a buffering state when a page loading becomes true.)` <br />
┃ ┃ ┣ 📜securityService.ts `(This service use for handle all browser storage persist data. Using this we can hanfle browser storage data more secure.)` <br />
┃ ┃ ┗ 📜userRoleService.tsx `(Acording to the user roles page restriction and component restriction handle by this.)` <br />
┃ ┣ 📂typings `(All the global types are initialize in here.)` <br />
┃ ┣ 📂utils `(All utility services are defined in this folder.)` <br />
┃ ┃ ┣ 📜assetUtil.ts `(All images are centralized and exported from here to other pages.)` <br />
┃ ┃ ┣ 📜commonUtil.ts `(All common methods are centralized and exported from here to other pages.)` <br />
┃ ┃ ┣ 📜fontAwesomeUtil.ts `(All the using fontawesome icons are centralized and exported from here to other pages.)` <br />
┃ ┃ ┗ 📜listUtil.ts `(All the drop down options are exported from here)` <br />
┃ ┣ 📜App.tsx <br />
┃ ┣ 📜index.css <br />
┃ ┣ 📜index.tsx <br />
┃ ┗ 📜setupEnzyme.ts <br />
┣ 📜.babelrc `(All babel configurations are in here.)` <br />
┣ 📜.eslintrc.json `(All eslint configurations are in here.)` <br />
┣ 📜.gitignore <br />
┣ 📜.prettierrc `(All prettier configurations are in here.)` <br />
┣ 📜jest.config.js `(All jest configurations are in here.)` <br />
┣ 📜package.json <br />
┣ 📜tailwind.config.js `(All tailwindcss configurations are in here.)` <br />
┣ 📜tsconfig.json `(All typescript configurations are in here.)` <br />
┣ 📜webpack.config.js `(All webpack configurations are in here.)` <br />
