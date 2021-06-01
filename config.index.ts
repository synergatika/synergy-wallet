import { writeFile } from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
    production: true,
    apiUrl: '${process.env.API_URL}',
    appUrl: '${process.env.APP_URL}',
    openUrl: '${process.env.OPEN_URL}',
    mapApiKey: '${process.env.MAP_API_KEY}',
  
    access: [
        true, // community,
        true, // loyalty,
        true, // microcredit,
        false // microfunding
    ],
    subAccess: [
        true, //partner_address,
        true, // partner_contact,
        true, // partner_payments,
        true, // partner_auto_registration,
        true  // partner_fixed_campaign
    ],
  
    version: '${process.env.RELEASE_VERSION}'
};`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
    if (err) {
        return console.log(err);
    }
});