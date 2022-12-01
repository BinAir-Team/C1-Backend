const { datasearches, Sequelize } = require('../models');
const Op = Sequelize.Op

module.exports = {
    findCity(key) {
        return datasearches.findAll({
            where: {city: {[Op.iLike] : '%' + key + '%'}},
            attributes: {exclude: ['id','code','airport','createdAt','updatedAt']}
        });
    },
    
    findAirport(key) {
        return datasearches.findAll({
            where: {
                [Op.or]: [
                    {code: {[Op.iLike] : '%' + key + '%'}},
                    {airport: {[Op.iLike] : '%' + key + '%'}},
                ]
            },
            attributes: {exclude: ['id','city','createdAt','updatedAt']}
        });
    },
}