const fetch = require('node-fetch');
const { exchangeRateBasepath } = require('../config/urls');

/**
 * @description Call third party api for exchange rate which returns response with euro as basecurrency 
 */
exports.getCurrencyExchangeRate = async (name) => {
    try {
        let url = exchangeRateBasepath;
        let exchangeRateRes = await fetch(url);
        let exchangeRateData = await exchangeRateRes.json();

        if (exchangeRateData) {
            return exchangeRateData.rates ? exchangeRateData.rates : {};
        }
    }
    catch (e) {
        console.log('Error (getCurrencyExchangeRate.js) ', e);
        return [];
    }
}
