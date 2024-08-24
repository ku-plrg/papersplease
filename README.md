# papersplease

manual labelling tool

## Run example

1. `cd ./example && deno run -A --watch=../routes/,../static ../dev.ts`
2. Click `Upload manifest` button and select `./example/manifest.json`

## Installation

1. Fetch the repository.

```sh
git clone https://github.com/ku-plrg/papersplease
```

2. Register install script with `deno install` feature.

```sh
cd papersplease && deno install -n ppz -A ./install.ts --import-map=./deno.json
```

3. Now you can use paperplease with name `ppz`. Locate any directory you want
   and run `ppz`.

```sh
cd some-directory && ppz
```
