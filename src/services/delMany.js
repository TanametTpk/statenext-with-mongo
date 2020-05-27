const middlewares = require('../middlewares')

module.exports = (model, payload) => {

    const delMany = async (req)=> {

        return await model.deleteObjMany(req.query)

    };

    return {
        service: {delMany},
        route:{
            path: "/",
            method: "delete",
            middlewares:[middlewares.getQuery],
        }
    }

}