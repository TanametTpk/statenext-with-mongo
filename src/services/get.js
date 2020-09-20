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
        routeString: `
            {
                path: "/",
                method: "get",
                middlewares:[middlewares.getQuery, middlewares.getPopulate],
            },
        `
    }

}