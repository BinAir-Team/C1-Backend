const searchRepository = require('../repositories/searchRepository');

module.exports = {
    async findSearch() {
        try{
            const search = await searchRepository.findSearch();
            return search;
        }
        catch(err) {
            throw err;
        }
    },
    async addSearch(data) {
        try{
            const search = await searchRepository.addSearch(data);
            return search;
        }
        catch(err) {
            throw err;
        }
    },
}