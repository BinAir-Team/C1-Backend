const {wishlists} = require('../models');

module.exports = {
    getAllWishlists(){
        return wishlists.findAll();
    },
};