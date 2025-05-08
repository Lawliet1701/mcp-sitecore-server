/* File to test the other code */

import { PowershellClient } from './tools/powershell/client.js';

const client = new PowershellClient(
    'https://xmcloudcm.localhost/',
    'admin',
    'b',
    'sitecore'
);

const response = await client.executeScript(
    'Get-Item -Path "master:/sitecore/content/Home"',);

console.log(response);
console.log(response[0].text); // Assuming the response is an array of objects with a 'text' property