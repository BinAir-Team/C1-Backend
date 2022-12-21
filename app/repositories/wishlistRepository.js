const { wishlists } = require("../models");

module.exports = {
  getAllWishlists(limit, offset) {
    return wishlists.findAndCountAll({
      include: {
        all: true,
      },
      limit,
      offset,
    });
  },

  getWishlistById(id) {
    return wishlists.findByPk(id, {
      include: {
        all: true,
      },
    });
  },

  findWishlist(where, limit, offset) {
    return wishlists.findAndCountAll({
      include: {
        all: true,
      },
      where: where,
      limit,
      offset,
    });
  },

  createWishlist(wishlist) {
    return wishlists.create(wishlist);
  },

  deleteWishlist(id) {
    return wishlists.destroy({ where: { id: id } });
  },
};
