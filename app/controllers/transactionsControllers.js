const transService = require('../services/transServices');
const ticketService = require('../services/ticketService');

module.exports = {
    getAllTrans(req, res) {
            transService.findAll()
            .then(cars => {
                res.status(200).json({
                    msg: "get all data success",
                    status: 200,
                    data: cars
                });
            })
            .catch(err => {
                res.status(500).json({
                    msg: "error get all data",
                    status: 500,
                    err
                });
            });
    },
    getTransByUserId(req, res) {
        const {id} = req.params

        transService.findByUser(id)
        .then(cars => {
            if(cars.length == 0){
                res.status(404).json({
                    msg: "data by userId not found",
                    status: 404,
                    data: cars
                });
                return
            }else{
                res.status(200).json({
                    msg: "success get data by userId",
                    status: 200,
                    data: cars
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "error get data",
                status: 500,
                err
            });
        });
    },
    deleteTransById(req, res) {
        const {id} = req.params
        transService.deleteByPk(id)
        .then(cars => {
            if(cars == 0){
                res.status(404).json({
                    msg: "data already deleted or not found",
                    status: 404,
                    data: cars
                });
                return
            }else{
                res.status(200).json({
                    msg: "delete data success",
                    status: 200,
                    data: cars
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "error delete data",
                status: 500,
                err
            });
        });
    },
    async createTrans(req, res) {
        const {body} = req
        const {ticketsId, quantity} = req.body

        const ticketdata = await ticketService.getTicketById(ticketsId)
        
        const amounts = (ticketdata.dataValues.adult_price * quantity[0])+(ticketdata.dataValues.child_price * quantity[1]);

        let newData = {
            ...body,
            amounts: amounts,
            
        }

        transService.createTrans(id)
        .then(cars => {
            if(cars.length == 0){
                res.status(404).json({
                    msg: "data by userId not found",
                    status: 404,
                    data: cars
                });
                return
            }else{
                res.status(200).json({
                    msg: "success get data by userId",
                    status: 200,
                    data: cars
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "error get data",
                status: 500,
                err
            });
        });
    },
}