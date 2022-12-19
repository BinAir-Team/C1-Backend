const notifService = require('../services/notifService');
const {v4: uuid} = require('uuid');

module.exports = {
    getAllNotif(req, res) {
            notifService.findAll()
            .then(notif => {
                res.status(200).json({
                    msg: "success get all notifications",
                    status: 200,
                    data: notif
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
                data: notif
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
                data: notif
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
            const insert = await notifService.createNotif(datas);
            const find = await notifService.findByUser(id);
            global.io.sockets.in(id).emit('notify-update', find);
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
            global.io.sockets.in(usersId).emit('notify-update', find);
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