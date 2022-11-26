const transService = require('../services/transServices');
const ticketService = require('../services/ticketService');
const {v4: uuid} = require('uuid');

module.exports = {
    getAllTrans(req, res) {
            transService.findAll()
            .then(trans => {
                let newData = []
                trans.forEach(a=>{
                    let split = a.traveler.split("/").map(a=>{return a.split(",")})
                    newData.push({...a.dataValues,traveler: split})
                })
                res.status(200).json({
                    msg: "get all data success",
                    status: 200,
                    data: newData
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
        .then(trans => {
            if(trans.length == 0){
                res.status(404).json({
                    msg: "data by userId not found",
                    status: 404,
                    data: trans
                });
                return
            }else{
                let newData = []
                trans.forEach(a=>{
                    let split = a.traveler.split("/").map(a=>{return a.split(",")})
                    newData.push({...a.dataValues,traveler: split})
                })
                res.status(200).json({
                    msg: "get data by userId success",
                    status: 200,
                    data: newData
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
        .then(trans => {
            if(trans == 0){
                res.status(404).json({
                    msg: "data already deleted or not found",
                    status: 404,
                    data: trans
                });
                return
            }else{
                res.status(200).json({
                    msg: "delete data success",
                    status: 200,
                    data: trans
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
        const {body} = req;
        const status = "PENDING PAYMENT";
        const {ticketsId} = req.body;
        const quantity = req.body.quantity.split(",");
        const ticketdata = await ticketService.getTicketById(ticketsId);
        
        const amounts = (ticketdata.dataValues.adult_price * quantity[0])+(ticketdata.dataValues.child_price * quantity[1]);
        
        let newData = {
            ...body,
            id: uuid(),
            amounts: amounts,
            status: status,
            date: new Date()
        }
        transService.createTrans(newData)
        .then(trans => {
            let newData = []
            let split = trans.dataValues.traveler.split("/").map(a=>{return a.split(",")})
            newData.push({...trans.dataValues,traveler: split})
            res.status(200).json({
                msg: "insert data success",
                status: 200,
                data: newData
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "error insert data",
                status: 500,
                err
            });
        });
    },
    updateTrans(req,res) {
        const {images} = req.body;
        const {id} = req.params;
        const dummyImageCheck = true;
        if(dummyImageCheck != true){
            res.status(404).json({
                msg: "image verification not found",
                status: 404,
                err
            });
            return
        }
        transService.updateTrans(id,{status: "PAYMENT SUCCESS"})
        .then(trans => {
            if(trans.length == 0){
                res.status(404).json({
                    msg: "transactions not found",
                    status: 404,
                    data: trans
                });
                return
            }else{
                res.status(200).json({
                    msg: "update status success",
                    status: 200,
                    data: trans
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "error update status data",
                status: 500,
                err
            });
        });
    },
    getTransByid(req,res) {
        const {id} = req.params
        transService.findByPk(id)
        .then(trans => {
            if(trans == null){
                res.status(404).json({
                    msg: "data by id not found",
                    status: 404,
                });
                return
            }else{
                let newData = []
                let split = trans.dataValues.traveler.split("/").map(a=>{return a.split(",")})
                newData.push({...trans.dataValues,traveler: split})
                res.status(200).json({
                    msg: "data by id success",
                    status: 200,
                    data: newData
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "error find by id",
                status: 500,
                err
            });
        });
    }
}