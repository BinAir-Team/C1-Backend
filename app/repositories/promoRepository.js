const { promotions } = require("../models");

module.exports = {
  // Get all promotions
  getAllPromos() {
    return promotions.findAll();
  },

  // get all promo role member with pagination
  getAllPromo(limit, offset) {
    return promotions.findAndCountAll({
      limit,
      offset,
    });
  },

  // Get promotion by id
  getPromoById(id) {
    return promotions.findByPk(id);
  },

  // Create a new promotion
  createPromo(promo) {
    return promotions.create(promo);
  },

  // Update a promotion
  updatePromo(id, promo) {
    return promotions.update(promo, { where: { id: id } });
  },

  // Delete a promotion
  deletePromo(id) {
    return promotions.destroy({ where: { id: id } });
  },

  //find by code
  findcode(code) {
    return promotions.findOne({
      where: { promo_code: code },
    });
  },
};
