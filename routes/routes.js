
const { signUp } = require('../controllers/auth/signup');
const { login } = require('../controllers/auth/login');
const { getCountryDetails } = require('../controllers/country/countryDetails');
const { authenticateToken } = require('../middlewares/authenticateToken');
module.exports = (router) => {
    router.post('/api/v1/signup', signUp);
    router.post('/api/v1/login', login);
    router.get('/api/v1/country/:name', authenticateToken, getCountryDetails)
    return router;
}
