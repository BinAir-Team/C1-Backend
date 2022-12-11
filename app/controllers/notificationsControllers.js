const notifService = require('../services/notifService');

module.exports = {
    getAllNotif(req, res) {
            notifService.findAll()
            .then(notif => {
                return notif;
            })
            .catch(err => {
                return err;
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
    deleteNotifById(req, res) {
        const {id} = req.params
        notifService.deleteByPk(id)
        .then(notif => {
            return notif;
        })
        .catch(err => {
            return err;
        });
    },
    getNotifByid(req,res) {
        const {id} = req.params
        notifService.findByPk(id)
        .then(notif => {
            return notif;
        })
        .catch(err => {
            return err;
        });
    },
    async updateNotif(req,res) {
        const {id} = req.body
        const notif = await notifService.findByPk(id);
        if(!notif){
            res.status(404).json({
                msg: "notif not found",
                status: 404,
            });
            return
        }
        notifService.updateNotif(id,{isRead: true})
        .then(notif => {
            res.status(200).json({
                msg: "notif updated",
                status: 200,
                data: notif
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "notif fails updated",
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
    }
}