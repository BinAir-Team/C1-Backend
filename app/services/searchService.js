const searchRepository = require('../repositories/searchRepository');

module.exports = {
    async findCity(key) {
        try{
            const search = await searchRepository.findCity(key);
            return search;
        }
        catch(err) {
            throw err;
        }
    },

    async findAirport(key) {
        try{
            const search = await searchRepository.findAirport(key);
            return search;
        }
        catch(err) {
            throw err;
        }
    },
}