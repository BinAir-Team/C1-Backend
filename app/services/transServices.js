const transRepository = require('../repositories/transRepository');

module.exports = {
    async findAll() {
        try{
            const trans = await transRepository.findAll();
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

    async findByUser(id){
        try{
            const trans = await transRepository.findByUserId(id);
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