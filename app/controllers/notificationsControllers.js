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
            return notif;
        })
        .catch(err => {
            return err;
        });
    },
    deleteNotifById(req, res) {
        const {id} = req.notif
        notifService.deleteByPk(id)
        .then(notif => {
            return notif;
        })
        .catch(err => {
            return err;
        });
    },
    getNotifByid(req,res) {
        const {id} = req.notif
        notifService.findByPk(id)
        .then(notif => {
            return notif;
        })
        .catch(err => {
            return err;
        });
    }
}