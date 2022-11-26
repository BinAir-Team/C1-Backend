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

    async getWishlistById(id){
        try{
            const wishlist = await wishlistRepository.getWishlistById(id);
            return wishlist;
        }
        catch(err){
            throw err;
        }
    },

    async findWhistlistByUser(usersId){
        try{
            const wishlist = await wishlistRepository.findWishlist({usersId: usersId});
            return wishlist;
        }
        catch(err){
            throw err;
        }
    },

    async findWhistlistByTicket(ticketsId){
        try{
            const wishlist = await wishlistRepository.findWishlist({ticketsId: ticketsId});
            return wishlist;
        }
        catch(err){
            throw err;
        }
    },

    async createWishlist(wishlist){
        try{
            const createdWishlist = await wishlistRepository.createWishlist(wishlist);
            return createdWishlist;
        }
        catch(err){
            throw err;
        }
    },

    async deleteWishlist(id){
        try{
            const deletedWishlist = await wishlistRepository.deleteWishlist(id);
            return deletedWishlist;
        }
        catch(err){
            throw err;
        }
    }
};