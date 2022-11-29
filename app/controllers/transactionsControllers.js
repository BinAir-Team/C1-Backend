const transService = require('../services/transServices');
const ticketService = require('../services/ticketService');
const {v4: uuid} = require('uuid');
const fs = require('fs');

module.exports = {
    getAllTrans(req, res) {
            transService.findAll()
            .then(trans => {
                let newData = []
                trans.forEach(a=>{
                    let json1 = JSON.parse(a.dataValues.traveler);
                    let json2 = JSON.parse(a.dataValues.quantity);
                    newData.push({...a.dataValues,traveler: json1,quantity: json2});
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
                    let json1 = JSON.parse(a.dataValues.traveler);
                    let json2 = JSON.parse(a.dataValues.quantity);
                    newData.push({...a.dataValues,traveler: json1,quantity: json2});
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
        const {ticketsId, quantity, traveler} = req.body;
        const ticketdata = await ticketService.getTicketById(ticketsId);
        let pp = 0;
        if(ticketdata.dataValues.type == "Pulang Pergi"){
            pp = 2;
        }else{
            pp = 1;
        }
        const json_trav = JSON.stringify(traveler);
        const json_quan = JSON.stringify(quantity);
        const amounts = ((ticketdata.dataValues.adult_price * quantity.adult)+(ticketdata.dataValues.child_price * quantity.child))*pp;
        
        let newData = {
            ...body,
            id: uuid(),
            quantity: json_quan,
            amounts: amounts,
            traveler: json_trav,
            status: status,
            date: new Date()
        }
        transService.createTrans(newData)
        .then(trans => {
            let newData = []
            let json1 = JSON.parse(trans.dataValues.traveler);
            let json2 = JSON.parse(trans.dataValues.quantity);
            newData.push({...trans.dataValues,traveler: json1,quantity: json2})
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
        const {id} = req.params;
        if(req.file == null){
            res.status(404).json({
                msg: "image verification not found",
                status: 404,
            });
            return
        }
        transService.updateTrans(id,{status: "PAYMENT SUCCESS"})
        .then(trans => {
            fs.unlinkSync(req.file.path);
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
                let json1 = JSON.parse(trans.dataValues.traveler);
                let json2 = JSON.parse(trans.dataValues.quantity);
                newData.push({...trans.dataValues,traveler: json1,quantity: json2})
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