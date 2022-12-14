const notifRepository = require("../repositories/notifRepository");

module.exports = {
    async findAll(limit,offset) {
        try{
            const notif = await notifRepository.getAllNotif(limit,offset);
            return notif;
        }
        catch(err) {
            throw err;
        }
    },

    async findByPk(id) {
        try{
            const notif = await notifRepository.getNotifById(id);
            return notif;
        }
        catch(err) {
            throw err;
        }
    },

    async deleteByPk(id) {
        try{
            const notif = await notifRepository.deleteNotif(id);
            return notif;
        }
        catch(err) {
            throw err;
        }
    },

    async findByUser(id){
        try{
            const notif = await notifRepository.getNotifByUserId(id);
            return notif;
        }
        catch(err){
            throw err;
        }
    },

    async createNotif(datas) {
        try{
            const notif = await notifRepository.createNotif(datas);
            return notif;
        }
        catch(err) {
            throw err;
        }
    },
    async updateNotif(id,datas) {
        try{
            const notif = await notifRepository.updateNotif(id,datas);
            return notif;
        }
        catch(err) {
            throw err;
        }
    },
    async updateNotifAll(id,datas) {
        try{
            const notif = await notifRepository.updateNotifAll(id,datas);
            return notif;
        }
        catch(err) {
            throw err;
        }
    },
}