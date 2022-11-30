const promoService = require("../services/promoService");

module.exports = {
  // Get all promotions
  getAllPromos: async (req, res) => {
    try {
      const promos = await promoService.getAllPromos();
      res.status(200).json({
        status: "success",
        message: "Success",
        data: promos,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  },

  // Get promotion by id
  getPromoById: async (req, res) => {
    try {
      const promo = await promoService.getPromoById(req.params.id);
      res.status(200).json({
        status: "success",
        message: "Success",
        data: promo,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  },

  // Create a new promotion
  createPromo: async (req, res) => {
    try {
      const {
        title,
        desc,
        period,
        travel_period,
        promo_code,
        discount,
        terms,
        promo_image,
      } = req.body;
      const newPromo = await promoService.createPromo({
        title,
        desc,
        period,
        travel_period,
        promo_code,
        discount,
        terms,
        promo_image,
      });
      res.status(201).json({
        status: "success",
        message: "Success",
        data: newPromo,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  },

  // Update a promotion
  updatePromo: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        title,
        desc,
        period,
        travel_period,
        promo_code,
        discount,
        terms,
        promo_image,
      } = req.body;
      const promo = await promoService.updatePromo(id, {
        title,
        desc,
        period,
        travel_period,
        promo_code,
        discount,
        terms,
        promo_image,
      });
      res.status(200).json({
        status: "success",
        message: "Success",
        data: promo,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  },

  // Delete a promotion
  deletePromo: async (req, res) => {
    try {
      await promoService.deletePromo(req.params.id);
      res.status(200).json({
        status: "success",
        message: "Success",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  },
};
