const middlewares = require('../middlewares')

module.exports = (model, payload) => {

    const getSpecific = async (req)=> {

        let modelTarget = await model.find( {_id: req._objectId } , req._populate );
        modelTarget = await model.wrap( modelTarget );
        return modelTarget
    };

    return {
        service: {getSpecific},
        route:{
            path: ":objectId",
            method: "get",
            middlewares:[middlewares.getObjectId, middlewares.getPopulate],
            priority: 1
        },
        routeString: `
            {
                path: ":objectId",
                method: "get",
                middlewares:[middlewares.getObjectId, middlewares.getPopulate],
                priority: 1
            },
        `
    }

}