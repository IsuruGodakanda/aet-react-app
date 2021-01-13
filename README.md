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

$ yarn add typescript --dev
$ yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
$ yarn add eslint-plugin-react --dev
$ yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
$ yarn add eslint-plugin-html --dev
$ yarn add eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react-hooks
$ yarn add husky lint-staged --dev

```

## Dependency installation Guide

```sh

$ mkdir aet-react-boilerplate
$ cd react-modern-app
$ yarn init
$ yarn add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-proposal-class-properties --dev
$ yarn add webpack
$ yarn add webpack-cli webpack-dev-server babel-loader --dev
$ yarn add react react-dom @types/react @types/react-dom
$ yarn add style-loader css-loader postcss-loader --dev
$ yarn add dotenv
$ yarn add html-loader file-loader @types/file-loader source-map-loader --dev
$ yarn clean-webpack-plugin copy-webpack-plugin html-webpack-plugin mini-css-extract-plugin optimize-css-assets-webpack-plugin terser-webpack-plugin
$ yarn add lodash-es @types/lodash-es
$ yarn add tailwindcss @fullhuman/postcss-purgecss
$ yarn add serve

```
