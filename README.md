# Synergy Wallet

## Contibution Guide

```
mkdir wallet
cd wallet

git clone git@github.com:synergatika/synergy-core.git
git clone git@github.com:synergatika/synergy-wallet.git

cd synergy-core
npm install

cd stories/services/
```
| Create here a new file named "secrets.environment.ts" with the code in the end|
|-----------------------------------------|
```
cd ../../../synergy-wallet
npm install

cd src/environments/
```
| Create here a new file named "secrets.environment.ts" with the code in the end|
|-----------------------------------------|
```
cd ../../
npx ng serve
```

[![asciicast](https://asciinema.org/a/qIfIt1EGecGZTetbJa8GXZFPg.svg)](https://asciinema.org/a/qIfIt1EGecGZTetbJa8GXZFPg)

## Credits

This application is part of a project that has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 825268.

*****
Insert the following code into the two "secrets.environment.ts" files that have been created:
```javascript
  const secrets = {
  // URLs
    apiUrl: 'https://api.mydomain.gr', // or localhost
    appUrl: 'https://wallet.mydomain.gr', // or localhost
    openUrl: 'https://open.mydomain.gr', // or localhost

    // Map Key
    mapApiKey: 'your key goes here',
}

export default secrets;
```
*****
