const wishlistService = require('../services/wishlistServices');
const notifService = require('../services/notifService');
const {v4: uuidv4} = require('uuid');

module.exports = {
    async getAllWishlists(req, res){
        try{
            const wishlists = await wishlistService.getAllWishlists();
            res.status(200).send({
                status: "success",
                message: "wishlist found",
                data: wishlists
            });
        }
        catch(err){
            res.status(500).send({
                status: "error",
                message: err,
                data: {}
            });
        }
    },

    async getWishlistById(req, res){
        try{
            const wishlist = await wishlistService.getWishlistById(req.params.id);
            if(wishlist){
                res.status(200).send({
                    status: "success",
                    message: "wishlist found",
                    data: wishlist
                });
            }
            else{
                res.status(404).send({
                    status: "error",
                    message: "wishlist not found",
                    data: {}
                });
            }
        }
        catch(err){
            res.status(500).send({
                status: "error",
                message: "whistlist not found",
                data: {}
            });
        }
    },

    async findWhistlistByUser(req, res){
        try{
            const wishlist = await wishlistService.findWhistlistByUser(req.user.id);
            if(wishlist.length > 0){
                res.status(200).send({
                    status: "success",
                    message: "wishlist found",
                    data: wishlist
                });
            }
            else{
                res.status(404).send({
                    status: "error",
                    message: "wishlist not found",
                    data: {}
                });
            }
        }
        catch(err){
            res.status(500).send({
                status: "error",
                message: err,
                data: {}
            });
        }
    },

    async findWhistlistByTicket(req, res){
        try{
            const wishlist = await wishlistService.findWhistlistByTicket(req.query.ticketsId);
            if(wishlist){
                res.status(200).send({
                    status: "success",
                    message: "wishlist found",
                    data: wishlist
                });
            }
            else{
                res.status(404).send({
                    status: "error",
                    message: "wishlist not found",
                    data: {}
                });
            }
        }
        catch(err){
            res.status(500).send({
                status: "error",
                message: err,
                data: {}
            });
        }
    },

    async createWishlist(req, res){
        try{
            const id = uuidv4();
            const usersId = req.body.usersId;
            const ticketsId = req.body.ticketsId;
            await notifService.createNotif({id: uuid(),usersId: usersId,message: `Sukses menambahkan wishlist tiket`,isRead: false})
            const createdWishlist = await wishlistService.createWishlist({id, usersId, ticketsId});
            res.status(200).send(
                {
                    status: "success",
                    message: "wishlist created",
                    data: createdWishlist
                }
            );
        }
        catch(err){
            res.status(500).send({
                status: "error",
                message: err,
                data: {}
            });
        }
    },

    async deleteWishlist(req, res){
        try{
            await notifService.createNotif({id: uuid(),usersId: req.user.id,message: `Sukses menghapus wishlist tiket`,isRead: false})
            const deletedWishlist = await wishlistService.deleteWishlist(req.params.id)
            .then((deletedWishlist) => {
                if(deletedWishlist === 1){
                    res.status(200).send({
                        status: "success",
                        message: "wishlist deleted",
                        data: {}
                    });
                }
                else{
                    res.status(404).send({
                        status: "error",
                        message: "wishlist not found",
                        data: {}
                    });
                }
            });
        }
        catch(err){
            res.status(500).send({
                status: "error",
                message: err,
                data: {}
            });
        }
    }
};