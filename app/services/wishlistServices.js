const wishlistRepository = require('../repositories/wishlistRepository');

module.exports = {
    async getAllWishlists(){
        try{
            const wishlists = await wishlistRepository.getAllWishlists();
            return wishlists;
        }
        catch(err){
            throw err;
        }
    },
};