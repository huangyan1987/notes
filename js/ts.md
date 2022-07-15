Prereq:
```
nvm install --lts
nvm use --lts
```

Setup:
```
mkdir project-name
cd project-name
npm init -y
npm i -D @types/node nodemon rimraf typescript prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-prettier eslint-config-prettier ts-node
mkdir src && touch src/index.ts
touch tsconfig.json .prettierrc .eslintrc.js .editorconfig .gitignore
```
To import Node components:
`import * as os from 'os';


React:
`npx create-react-app my-app --template typescript

