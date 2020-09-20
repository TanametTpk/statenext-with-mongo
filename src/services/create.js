module.exports = (model, payload) => {

    const create = async (req)=> {

        return await model.create(req.body);

    };

    return {
        service: {create},
        route:{
            path: "/",
            method: "post",
            middlewares: [],
        },
        getContent: (controller_name) => `
            {
                path: "/",
                method: "post",
                action: "create",
                controller: "${controller_name}",
                middlewares: [],
            },
        `
    }

}