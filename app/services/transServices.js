const transRepository = require("../repositories/transRepository");

module.exports = {
    async findAll(limit,offset,status) {
        try{
            const trans = await transRepository.findAll(limit,offset,status);
            return trans;
        }
        catch(err) {
            throw err;
        }
    },

    async findByPk(id) {
        try{
            const trans = await transRepository.findByPk(id);
            return trans;
        }
        catch(err) {
            throw err;
        }
    },

    async deleteByPk(id) {
        try{
            const trans = await transRepository.deleteByPk(id);
            return trans;
        }
        catch(err) {
            throw err;
        }
    },

    async findByUser(id,limit,offset,status){
        try{
            const trans = await transRepository.findByUserId(id,limit,offset,status);
            return trans;
        }
        catch(err){
            throw err;
        }
    },

    async createTrans(datas) {
        try{
            const trans = await transRepository.createTransactions(datas);
            return trans;
        }
        catch(err) {
            throw err;
        }
    },
    
    async updateTrans(id,datas) {
        try{
            const trans = await transRepository.updateTransactions(id,datas)
            return trans;
        }
        catch(err) {
            throw err;
        }
    }
}