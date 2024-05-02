# papersplease

manual labelling tool

## Run example

1. `cd ./example && deno run -A --watch=../routes/,../static ../dev.ts`
2. Click `Upload manifest` button and select `./example/manifest.json`

## Installation (TODO; not working currently)

A current version of the Deno CLI is required to install and host
`papersplease`. To install, run the following command:

```
deno run -A -r https://papersplease.deno.dev/install
```

You will be prompted for a location to install `papersplease`.

Once the installation is complete, change to the installation directory and run
the following to start the `papersplease` server:

```
deno task start
```

You can also upgrade your installation to the latest version by performing:

```
deno task upgrade
```
