const searchService = require('../services/searchService');

module.exports = {
    getCity(req, res) {
        const {key} = req.params
            searchService.findCity(key)
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
    },
    getAirport(req, res) {
        const {key} = req.params
        searchService.findAirport(key)
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
    },
}