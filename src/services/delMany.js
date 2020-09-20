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
        },
        getContent: (controller_name) => `
            {
                path: "/",
                method: "delete",
                action: "delMany",
                controller: "${controller_name}",
                middlewares:[middlewares.getQuery],
            },
        `
    }

}