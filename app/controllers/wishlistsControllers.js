const wishlistService = require('../services/wishlistServices');
const notifService = require('../services/notifService');
const {v4: uuidv4} = require('uuid');

module.exports = {
    async getAllWishlists(req, res){
        try{
            const wishlists = await wishlistService.getAllWishlists();
            res.status(200).send(wishlists);
        }
        catch(err){
            res.status(500).send(err);
        }
    },

    async getWishlistById(req, res){
        try{
            console.log("params id" ,req.params.id);
            const wishlist = await wishlistService.getWishlistById(req.params.id);
            res.status(200).send(wishlist);
        }
        catch(err){
            res.status(500).send(err);
        }
    },

    async findWhistlistByUser(req, res){
        try{
            const wishlist = await wishlistService.findWhistlistByUser(req.user.id);
            res.status(200).send(wishlist);
        }
        catch(err){
            res.status(500).send(err);
        }
    },

    async findWhistlistByTicket(req, res){
        try{
            console.log("query ticket id" ,req.query.ticketsId);
            const wishlist = await wishlistService.findWhistlistByTicket(req.query.ticketsId);
            res.status(200).send(wishlist);
        }
        catch(err){
            res.status(500).send(err);
        }
    },

    async createWishlist(req, res){
        try{
            const id = uuidv4();
            const usersId = req.body.usersId;
            const ticketsId = req.body.ticketsId;
            await notifService.createNotif({id: uuid(),usersId: usersId,message: `Sukses menambahkan wishlist tiket`,isRead: false})
            const createdWishlist = await wishlistService.createWishlist({id, usersId, ticketsId});
            res.status(200).send(createdWishlist);
        }
        catch(err){
            res.status(500).send(err);
        }
    },

    async deleteWishlist(req, res){
        try{
            await notifService.createNotif({id: uuid(),usersId: req.user.id,message: `Sukses menghapus wishlist tiket`,isRead: false})
            const deletedWishlist = await wishlistService.deleteWishlist(req.params.id)
            .then((deletedWishlist) => {
                if(deletedWishlist === 1){
                    res.status(200).send({message: 'Wishlist deleted successfully'});
                }
                else{
                    res.status(404).send({message: 'Wishlist not found'});
                }
            });
        }
        catch(err){
            res.status(500).send(err);
        }
    }
};