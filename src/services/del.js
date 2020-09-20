const middlewares = require('../middlewares')

module.exports = (model, payload) => {

    const del = async (req)=> {

        let target = await model.find({ _id : req._objectId });
        let deletedObj = await model.deleteObj(target);
        return model.wrap( deletedObj );

    };

    return {
        service: {del},
        route:{
            path: ":objectId",
            method: "delete",
            middlewares: [middlewares.getObjectId],
        },
        routeString: `
            {
                path: ":objectId",
                method: "delete",
                middlewares: [middlewares.getObjectId],
            },
        `
    }

}