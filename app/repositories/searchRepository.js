const { datasearches, Sequelize } = require("../models");
const Op = Sequelize.Op

module.exports = {
    findSearch() {
        return datasearches.findAll({
            attributes: {exclude: ["id","createdAt","updatedAt"]}
        });
    },
    addSearch(data) {
        return datasearches.create(data)
    }
}