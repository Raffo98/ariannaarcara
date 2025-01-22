// var Airtable = require('airtable');
// require('dotenv').config();
// const apiKey = process.env.API_KEY;
// Airtable.configure({
//     endpointUrl: 'https://api.airtable.com',
//     apiKey: API_KEY
//     // apiKey: 'pat7gis5M5WUjBB0k.96c185880f2a0373812348634a9edd77aac29b451fe97d52a2ad1730d1e8df1c'
// });
// var base = Airtable.base('appV4dTy0kqasy4Ch');

// export default {
//     base
// }

import Airtable from 'airtable';
import 'dotenv/config';
import process from 'process';

console.log("ere");


const apiKey = process.env.VUE_APP_API_KEY;


console.log("superato", apiKey);


if (!apiKey) {
  throw new Error("API_KEY non definita. Assicurati che sia presente nel file .env");
}

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: apiKey,
});

const base = Airtable.base('appV4dTy0kqasy4Ch');

export default {
  base,
};
