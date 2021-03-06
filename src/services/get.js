const middlewares = require('../middlewares')

module.exports = (model, payload) => {

    const get = async (req) => {

        let target = await model.findManyAndPopulate(req.query , req._populate);
        return target;
        
    }

    return {
        service: {get},
        route:{
            path: "/",
            method: "get",
            middlewares:[middlewares.getQuery, middlewares.getPopulate],
        },
        getContent: (controller_name) => `
            {
                path: "/",
                method: "get",
                action: "get",
                controller: "${controller_name}",
                middlewares:[middlewares.getQuery, middlewares.getPopulate],
            },
        `
    }

}