const transService = require("../services/transServices");
const ticketService = require("../services/ticketService");
const promoService = require("../services/promoService")
const notifControllers = require("./notificationsControllers");

const {v4: uuid} = require("uuid");
const fs = require("fs");
const moment = require("moment-timezone");

// get pagination
const getPagination = (page, size) => {
    const limit = size ? +size : 7;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};
  
// get page data
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: transactions } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    let newData = []
    transactions.forEach(a=>{
        let json1 = JSON.parse(a.dataValues.traveler);
        let json2 = JSON.parse(a.dataValues.quantity);
        newData.push({...a.dataValues,traveler: json1,quantity: json2});
    })
    return { totalItems, transactions: newData, totalPages, currentPage };
};

module.exports = {
    async getAllTrans(req, res) {
        try{
            const { page, size } = req.query;
            const { limit, offset } = getPagination(page, size);
            const finds = await transService.findAll(limit,offset);
            if (finds.length == 0) {
                res.status(404).json({
                  status: "error",
                  message: "Data not found",
                  data: {},
                });
                return
            }
            
            const result = getPagingData(finds, page, limit);
            res.status(200).json({
                msg: "get all trans with pagination success",
                status: 200,
                data: result,
            });
        } catch(err) {
            res.status(500).json({
                msg: "error get all data",
                status: 500,
                err
            });
        }
    },
    getTransByUserId(req, res) {
        const {id} = req.user
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        transService.findByUser(id, limit, offset)
        .then(trans => {
            if(trans.length == 0){
                res.status(404).json({
                    msg: "data by userId not found",
                    status: 404,
                    data: trans
                });
                return
            }else{
                const result = getPagingData(trans,page,limit)
                res.status(200).json({
                    msg: "get data by userId success",
                    status: 200,
                    data: result
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
    async deleteTransById(req, res) {
        const {id} = req.params
        const trans = await transService.findByPk(id);
        if(!trans){
            res.status(404).json({
                msg: "data not found or id wrong",
                status: 404
            })
            return
        }
        await notifControllers.createNotif(req.user.id,{id: uuid(),usersId: req.user.id,message: `Transaksi dengan id: ${id} dihapus oleh ${req.user.email} pada ${moment().locale("id").tz("Asia/Jakarta").format(
            "Do MMMM YYYY, HH:mm:ss z"
          )}`,isRead: false})      
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
        const {id} = req.user;
        const status = "PENDING PAYMENT";
        const {ticketsId, quantity, traveler, promo_code} = req.body;
        const ticketdata = await ticketService.getTicketById(ticketsId);
        if(!ticketdata){
            res.status(404).json({
                msg: "ticket not found / invalid",
                status: 404,
            });
            return
        }
        let pp = 0;
        if(ticketdata.dataValues.type == "roundtrip"){
            pp = 2;
        }else{
            pp = 1;
        }
        let amounts = ((ticketdata.dataValues.adult_price * quantity.adult)+(ticketdata.dataValues.child_price * quantity.child))*pp;
        if(promo_code != null){
            let today = moment().format("YYYY-MM-DD");
            const promodata = await promoService.findCode(promo_code);
            if(!promodata){
                res.status(404).json({
                    msg: "promo code not found / invalid",
                    status: 404,
                });
                return;
            }else{
                if(moment(promodata.dataValues.expire).format("YYYY-MM-DD") >= today){
                    const discount = promodata.dataValues.discount;
                    amounts = amounts - (amounts * (discount/100));
                }else{
                    res.status(400).json({
                        msg: "promo code is expire",
                        status: 400,
                    });
                    return;
                }
            }
        }
        const transdata = await transService.findByUser(id);
        
        const json_trav = JSON.stringify(traveler);
        const json_quan = JSON.stringify(quantity);

        let newData = {
            ...body,
            usersId: id,
            id: uuid(),
            payment_method: "default",
            quantity: json_quan,
            amounts: amounts,
            traveler: json_trav,
            status: status,
            date: new Date()
        }
        await notifControllers.createNotif(id,{id: uuid(),usersId: id,message: `Transaksi nomor ${transdata.count+1}, dengan tujuan ${ticketdata.dataValues.from}-${ticketdata.dataValues.to} sukses diproses pada ${moment().locale("id").tz("Asia/Jakarta").format(
            "Do MMMM YYYY, HH:mm:ss z"
          )}`,isRead: false})
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
    async updateTrans(req,res) {
        const {id} = req.params;
        const {payment_method} = req.body
        if(req.file == null){
            res.status(404).json({
                msg: "image verification not found",
                status: 404,
            });
            return
        }
        await notifControllers.createNotif(req.user.id,{id: uuid(),usersId: req.user.id,message:`Pembayaran Anda sudah diverifikasi pada ${moment().locale("id").tz("Asia/Jakarta").format(
            "Do MMMM YYYY, HH:mm:ss z"
          )}, silahkan cek status transaksi anda`,isRead: false})
        transService.updateTrans(id,{status: "PAYMENT SUCCESS",payment_method})
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