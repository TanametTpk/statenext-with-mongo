const middlewares = require('../middlewares')

module.exports = (model, payload) => {

    const update = async (req)=> {

        let updatedObj = await model.update({ _id : req._objectId } , req.body);
        return updatedObj

    };

    return {
        service: {update},
        route:{
            path: ":objectId",
            method: "put",
            middlewares: [middlewares.isValidObjectId, middlewares.getObjectId],
        },
        getContent: (controller_name) => `
            {
                path: ":objectId",
                method: "put",
                controller: "${controller_name}",
                middlewares: [middlewares.isValidObjectId, middlewares.getObjectId],
            },
        `
    }

}