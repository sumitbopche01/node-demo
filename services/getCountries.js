const fetch = require('node-fetch');
const { restCountriesBasepath } = require('../config/urls');

/**
 * @description Call third party api and return response
 */
exports.getCountries = async (name) => {
    try {
        let url = restCountriesBasepath + name;
        let countriesRes = await fetch(url);
        let countriesData = await countriesRes.json();

        if (countriesData) {
            return countriesData;
        }
    }
    catch (e) {
        console.log('Error (getCountries.js) ', e);
        return [];
    }
}
