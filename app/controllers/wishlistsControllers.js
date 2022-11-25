const wishlistService = require('../services/wishlistServices');

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
};