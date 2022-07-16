# Node + TypeScript

https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript

```
mkdir node_project
cd !$

npm init -y
npm install --save-dev typescript
npx tsc --init

npm install --save-dev eslint
npx eslint --init
npx eslint . --ext .ts
```

Types are given in files with `.d.ts` extension

`tsc` is the typescript compiler command

# TS Config

TS config file: `tsconfig.json`

```
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
```

Create with `tsc --init`

module: Node uses "commonjs"

# TSLint config

`./node_modules/.bin/tslint --init`

Likely want to allow `console` with:

```
{
    ...
    "rules" : {
        "no-console": false
    }
    ...
}
```