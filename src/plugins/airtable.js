var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'pat7gis5M5WUjBB0k.96c185880f2a0373812348634a9edd77aac29b451fe97d52a2ad1730d1e8df1c'
});
var base = Airtable.base('appV4dTy0kqasy4Ch');

export default {
    base
}