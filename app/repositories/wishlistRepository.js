const {wishlists} = require('../models');

module.exports = {
    getAllWishlists(){
        return wishlists.findAll({
            include: {
                all: true
            }
        });
    },

    getWishlistById(id){
        return wishlists.findByPk(id,
            {
                include: {
                    all: true
                }
            });
    },

    findWishlist(where){
        return wishlists.findAll({
            include: {
                all: true
            },
            where: where
        });
    },

    createWishlist(wishlist){
        return wishlists.create(wishlist);
    },

    deleteWishlist(id){
        return wishlists.destroy({where: {id: id}});
    }
};