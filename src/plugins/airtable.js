var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'patCM8D5baOqqcCSZ.c7b82e6ce5704b660788d97f3864a2e6626a28e76e14540e68f1597d023497e5'
});
var base = Airtable.base('appVMoyb4khjMiISW');

export default {
    base
}