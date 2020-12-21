/**
 * 
 * @param {Array} currenciesList array of object, contains currency details 
 * @param {String} basecurrency base currency for calculating exchange rate 
 * @param {Object} currentExchangeRate exchange rate with Euro as base currency
 */
exports.currenciesWithExchangeRate = (currenciesList, baseCurrency, currentExchangeRate) => {

    let currencyExchangeRateList = [];

    currenciesList.map((currency, index) => {
        let calculatedExchangeRate = calculateExchangeRate(currentExchangeRate, currency.code, baseCurrency)
        let currencyObj = {
            id: index,
            ...currency,
            baseCurrency,
            exchangeRateWithBaseCurrency: calculatedExchangeRate.exRateWithBaseCurrency,
            exchangeRateWithCurrencyCodeAsBaseCurrency: calculatedExchangeRate.exRateCurrencyCodeAsBaseCurrency
        }
        currencyExchangeRateList.push(currencyObj);
    });

    return currencyExchangeRateList;
}

/**
 * 
 * @param {Object} currentExchangeRate exchange rate with Euro as base currency
 * @param {String} currencyCode Code of particular country
 * @param {String} baseCurrency base currency in which we want exchange rates
 */
const calculateExchangeRate = (currentExchangeRate, currencyCode, baseCurrency) => {

    //ex. 1 euro to sek which is 10.11 SEK
    let oneEuroToBaseCurrency = currentExchangeRate[baseCurrency];

    //ex. 1 SEK = 0.099
    let oneBaseCurrencyToEuro = 1 / oneEuroToBaseCurrency;

    //Gives exchange rate, for ex. currencyCode = 'USD', 1 SEK = 0.12 USD, so 100 SEK = 0.12 * 100 USD which is 12 USD
    let exRateWithBaseCurrency = oneBaseCurrencyToEuro * currentExchangeRate[currencyCode];

    //Ex. 1 USD = 8.24 SEK
    let exRateCurrencyCodeAsBaseCurrency = 1 / (oneBaseCurrencyToEuro * currentExchangeRate[currencyCode]);

    return { exRateWithBaseCurrency, exRateCurrencyCodeAsBaseCurrency };
}   
