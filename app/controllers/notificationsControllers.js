const notifService = require("../services/notifService");
const transService  = require("../services/transServices")
const {v4: uuid} = require("uuid");
const moment = require("moment-timezone");

// get pagination
const getPagination = (page, size) => {
    const limit = size ? +size : 7;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};
  
// get page data
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: notifications } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, notifications, totalPages, currentPage };
};

module.exports = {
    getAllNotif(req, res) {
            const { page, size } = req.query;
            const { limit, offset } = getPagination(page, size);
            notifService.findAll(limit,offset)
            .then(notif => {
                const result = getPagingData(notif, page, limit);
                res.status(200).json({
                    msg: "success get all notifications",
                    status: 200,
                    data: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    msg: "error get all notifications",
                    status: 500,
                    err
                });
            });
    },
    getNotifByUserId(req, res) {
        const {id} = req.user

        notifService.findByUser(id)
        .then(notif => {
            res.status(200).json({
                msg: "success get notifications",
                status: 200,
                data: notif
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "error get notifications",
                status: 500,
                err
            });
        });
    },
    async deleteNotifById(req, res) {
        const {id} = req.params
        let check = await notifService.findByPk(id)
        if(!check){
            res.status(404).json({
                msg: "data not found",
                status: 404,
            });
            return
        }
        notifService.deleteByPk(id)
        .then(notif => {
            res.status(200).json({
                msg: "success delete notif",
                status: 200,
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "error delete notif",
                status: 500,
                err
            });
        });
    },
    async getNotifByid(req,res) {
        const {id} = req.params
        let check = await notifService.findByPk(id)
        if(!check){
            res.status(404).json({
                msg: "data not found",
                status: 404,
            });
            return
        }
        notifService.findByPk(id)
        .then(notif => {
            res.status(200).json({
                msg: "success get by id",
                status: 200,
                data: notif
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "error get by id",
                status: 500,
                err
            });
        });
    },
    async updateNotif(req,res) {
        const {id} = req.body
        notifService.updateNotif(id,{isRead: true})
        .then(notif => {
            res.status(200).json({
                msg: "success update notif",
                status: 200,
                data: notif[1].sort((a, b) => a.createdAt - b.createdAt)
            });
        })
        .catch(err => {
            res.status(404).json({
                msg: "notif not found to update",
                status: 404,
            });
        });
    },
    async updateNotifAll(req,res) {
        const {id} = req.user
        notifService.updateNotifAll(id,{isRead: true})
        .then(notif => {
            res.status(200).json({
                msg: "success update all notif",
                status: 200,
                data: notif[1].sort((a, b) => a.createdAt - b.createdAt)
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "all notif fails updated",
                status: 500,
                err
            });
        });
    },
    async createNotif(id,datas) {
        try{
            let today = moment().tz("Asia/Jakarta").format("YYYY-MM-DDTHH:mm");
            const insert = await notifService.createNotif(datas);
            const transSelesai = await transService.findAll(undefined,undefined,"SUCCESS");
            const transPending = await transService.findAll(undefined,undefined,"PENDING");
            const selesai = transSelesai.rows.filter((a)=>{return `${a.ticket.date_start}T${a.ticket.arrival_time}` < today}).map((a)=>{return a.id});
            const pending = transPending.rows.filter((a)=>{return `${a.ticket.date_start}T${a.ticket.departure_time}` < today}).map((a)=>{return a.id});
            await transService.updateTrans(selesai,{status:"SELESAI"});
            await transService.updateTrans(pending,{status:"CANCELED"});
            const find = await notifService.findByUser(id);
            global.io.sockets.in(id).emit("notify-update", find);
            return insert
        } catch(err){
            return err
        }
    },
    async createAdmin(req,res){
        const {usersId,message} = req.body
        const datas = {
            id: uuid(),
            usersId: usersId,
            message: message,
            isRead: false
        }
        const create = await notifService.createNotif(datas)
        if(create){
            const find = await notifService.findByUser(usersId)
            global.io.sockets.in(usersId).emit("notify-update", find);
            res.status(200).json({
                msg: "success create notif",
                status: 200,
                data: create
            });
        }else{
            res.status(500).json({
                msg: "fails create notif",
                status: 500,
            });
        }
    }
}