const { getCountries } = require('../../services/getCountries');
const { currenciesWithExchangeRate } = require('../../common/currenciesWithExchangeRate');
const { getCurrencyExchangeRate } = require('../../services/getCurrencyExchangeRate');

const BASECURRENCY = 'SEK';

exports.getCountryDetails = async (req, res) => {
    let { name } = req.params;
    let resPromise = await Promise.all([getCountries(name), getCurrencyExchangeRate()]);

    let formatedCountriesList = formatData(resPromise[0], resPromise[1]);
    let response = {
        status: true,
        data: formatedCountriesList
    }
    return res.status(200).send(response);
}

/**
 * 
 * @param {Array} countriesList list of countries
 */
const formatData = (countriesList, currentExchangeRate) => {
    let formatedList = [];
    countriesList.map((country, index) => {
        let countryObj = {
            id: index,
            fullname: country.name,
            population: country.population,
            officialCurrencies: currenciesWithExchangeRate(country.currencies, BASECURRENCY, currentExchangeRate)
        }
        formatedList.push(countryObj);
    });
    return formatedList;
}
