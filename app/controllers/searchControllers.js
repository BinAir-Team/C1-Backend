const searchService = require('../services/searchService');
const {v4: uuid} = require('uuid');

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
    },
    addSearch(req, res) {
        if(req.body.code == null || req.body.city == null || req.body.airport == null){
            res.status(404).json({
                msg: "missing input data",
                status: 404,
            })
            return
        }
        searchService.addSearch({...req.body,id: uuid()})
        .then(search => {
            res.status(200).json({
                msg: "add data success",
                status: 200,
                data: search
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "add data fail",
                status: 500,
                err
            });
        });
}
}