const getQuery = require('./configs/middlewares/getQuery')
const getObjectId = require('./configs/middlewares/getterObjectId')
const getPagination = require('./configs/middlewares/getterPagination')
const getPopulate = require('./configs/middlewares/getterPopulate')

module.exports = {
    getQuery,
    getObjectId,
    getPagination,
    getPopulate
}