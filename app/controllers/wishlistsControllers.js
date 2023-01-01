const wishlistService = require("../services/wishlistServices");
const notifControllers = require("./notificationsControllers");
const {v4: uuidv4} = require("uuid");

const getPagination = (page, size) => {
    const limit = size ? +size : 7;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: wishlists } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, wishlists, totalPages, currentPage };
};

module.exports = {
    async getAllWishlists(req, res){
        try{
            const {page, size} = req.query;
            const {limit, offset} = getPagination(page, size);
            const wishlists = await wishlistService.getAllWishlists(limit, offset);
            if(!wishlists){
                res.status(404).send({
                    status: "error",
                    message: "wishlist not found",
                    data: {}
                });
            }
            const response = getPagingData(wishlists, page, limit);
            res.status(200).send({
                status: "success",
                message: "wishlist found",
                data: response
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
            const {page, size} = req.query;
            const {limit, offset} = getPagination(page, size);
            const wishlist = await wishlistService.findWhistlistByUser(req.user.id, limit, offset);
            if(wishlist){
                const response = getPagingData(wishlist, page, limit);
                res.status(200).send({
                    status: "success",
                    message: "wishlist found",
                    data: response
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
            const {page, size} = req.query;
            const {limit, offset} = getPagination(page, size);
            const wishlist = await wishlistService.findWhistlistByTicket(req.query.ticketsId, limit, offset);
            if(wishlist){
                const response = getPagingData(wishlist, page, limit);
                res.status(200).send({
                    status: "success",
                    message: "wishlist found",
                    data: response
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
            await notifControllers.createNotif(usersId,{id: uuidv4(),usersId,message: `Sukses menambahkan wishlist tiket`,isRead: false})
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
            await notifControllers.createNotif(req.user.id,{id: uuidv4(),usersId: req.user.id,message: `Sukses menghapus wishlist tiket`,isRead: false})
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