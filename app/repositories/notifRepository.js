const {notifications} = require('../models');

module.exports = {
    getAllNotif(){
        return notifications.findAll({
            include: {
                all: true, attributes: {exclude: ['createdAt','updatedAt','email','password','profile_image','phone','refresh_token']}
            },
        });
    },

    getNotifByUserId(id){
        return notifications.findAll({
            include: {
                all: true , attributes: {exclude: ['createdAt','updatedAt','email','password','profile_image','phone','refresh_token']}
            },
            where: {usersId: id}
        });
    },

    getNotifById(id){
        return notifications.findByPk(id,{
            include: {
                all: true , attributes: {exclude: ['createdAt','updatedAt','email','password','profile_image','phone','refresh_token']}
            },
        });
    },

    createNotif(data){
        return notifications.create(data);
    },

    deleteNotif(id){
        return notifications.destroy({where: {id: id}});
    },

    updateNotif(id,data){
        return notifications.update(id,data);
    }
};