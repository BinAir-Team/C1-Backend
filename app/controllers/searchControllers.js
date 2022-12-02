const searchService = require('../services/searchService');

module.exports = {
    getSearch(req, res) {
            searchService.findSearch()
            .then(search => {
                res.status(200).json({
                    msg: "find data success",
                    status: 200,
                    data: search
                });
            })
            .catch(err => {
                res.status(500).json({
                    msg: "error find data",
                    status: 500,
                    err
                });
            });
    }
}