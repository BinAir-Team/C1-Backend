const promoRepository = require("../repositories/promoRepository");

module.exports = {
  // Get all promotions
  getAllPromos() {
    return promoRepository.getAllPromos();
  },

  // get all promo with pagination
  getAllPromo(limit, offset) {
    return promoRepository.getAllPromo(limit, offset);
  },

  // Get promotion by id
  getPromoById(id) {
    return promoRepository.getPromoById(id);
  },

  // Create a new promotion
  createPromo(promo) {
    return promoRepository.createPromo(promo);
  },

  // Update a promotion
  updatePromo(id, promo) {
    return promoRepository.updatePromo(id, promo);
  },

  // Delete a promotion
  deletePromo(id) {
    return promoRepository.deletePromo(id);
  },

  // find by code
  findCode(code) {
    return promoRepository.findcode(code);
  },
};
