const promoService = require("../services/promoService");
const notifControllers = require("./notificationsControllers");

const { v4: uuid } = require("uuid");
const moment = require("moment");

// get pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 7;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// get paging data
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: promos } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, promos, totalPages, currentPage };
};

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

  // Get all promotions with pagination
  getAllPromosWithPagination: async (req, res) => {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);

      const data = await promoService.getAllPromo(limit, offset);

      const response = getPagingData(data, page, limit);

      res.status(200).json({
        status: "success",
        message: "Success",
        data: response,
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
      const { title, desc, promo_code, discount, terms, promo_image, expire } =
        req.body;
      await notifControllers.createNotif(req.user.id, {
        id: uuid(),
        usersId: req.user.id,
        message: `Sukses Menambah promo dengan title: ${title} pada ${moment()
          .locale("id")
          .tz("Asia/Jakarta")
          .format("Do MMMM YYYY, h:mm:ss z")}`,
        isRead: false,
      });
      const newPromo = await promoService.createPromo({
        id: uuid(),
        title,
        desc,
        promo_code,
        discount,
        terms,
        expire,
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
      const { title, desc, promo_code, discount, terms, promo_image } =
        req.body;
      const promo = await promoService.updatePromo(id, {
        title,
        desc,
        promo_code,
        discount,
        terms,
        promo_image,
      });
      await notifControllers.createNotif(req.user.id, {
        id: uuid(),
        usersId: req.user.id,
        message: `Sukses update promo dengan title: ${title} pada ${moment()
          .locale("id")
          .tz("Asia/Jakarta")
          .format("Do MMMM YYYY, h:mm:ss z")}`,
        isRead: false,
      });
      const updatedPromo = await promoService.getPromoById(id);
      res.status(200).json({
        status: "success",
        message: "Success",
        data: updatedPromo,
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
      await notifControllers.createNotif(req.user.id, {
        id: uuid(),
        usersId: req.user.id,
        message: `Sukses delete promo dengan id: ${
          req.params.id
        } pada ${moment()
          .locale("id")
          .tz("Asia/Jakarta")
          .format("Do MMMM YYYY, h:mm:ss z")}`,
        isRead: false,
      });
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
