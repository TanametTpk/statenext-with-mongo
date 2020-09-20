const middlewares = require('../middlewares')

module.exports = (model, payload) => {

    const getPagination = async (req)=> {
        
        let promiseItems = model.findManyAndPopulate(req.query , req._populate , req._page , req._size )
        let promiseCount = model.count(req.query)

        let [items, total] = await Promise.all([promiseItems, promiseCount])
        let hasNext = (items.length + (req._page) * req._size) < total

        return {
            items,
            total,
            hasNext,
            size: items.length,
            pages: Math.ceil(total / req._size)
        }

    };

    return {
        service: {getPagination},
        route:{
            path: "pages/:page",
            method: "get",
            middlewares:[middlewares.getPagination, middlewares.getQuery, middlewares.getPopulate],
        },
        getContent: (controller_name) => `
            {
                path: "pages/:page",
                method: "get",
                action: "getPagination",
                controller: "${controller_name}",
                middlewares:[middlewares.getPagination, middlewares.getQuery, middlewares.getPopulate],
            },
        `
    }

}