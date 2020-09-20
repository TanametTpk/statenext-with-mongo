const CRUD = require('./CRUD')
const createModelLibs = require('./libs/model')
const getAll = require('require-all')
const connectDb = require('./libs/connectDb')
const mongoose = require('mongoose')
const pluralize = require('pluralize')
const fs = require("fs")

const configs = getAll({
    dirname: __dirname + "/configs",
})

const connect = (models, dbConfigs, options) => {

    let services = {}
    let routes = {}
    let _models = {}

    // connect mongodb
    connectDb(null, dbConfigs, options)

    // create all model
    models.map((modelObj) => {

        // change name to pluralize for correct REST API paths
        let modelName = pluralize.plural(modelObj.name)
        let permission = modelObj.permission

        // create mongoose model
        _models = {
            ..._models,
            [modelName]: mongoose.model(modelName, modelObj.model)
        }
        
        // create CRUD function and REST route with controller
        let model = createModelLibs(modelName, permission)
        let crudModel = CRUD(model, modelName)

        // assign services for export
        services[modelName] = crudModel.services

        // check for auto create route
        if (options && options.autoRouting) {
            let routeDir = `./autoRoutes`

            // if dir not exist then create new one
            if (!fs.existsSync(routeDir)){
                fs.mkdirSync(routeDir)
            }

            fs.writeFileSync(`${routeDir}/${modelName}.ts`, crudModel.fileContent)

            // assign controller name to routes
            let routesKey = Object.keys(crudModel.routes)
            routes[modelName] = routesKey.map((rkey, index) => {

                return {
                    ...crudModel.routes[rkey],
                    controller:modelName
                }

            })

        }

    })

    // exports
    return {
        services,
        // routes,
        middlewares:configs.middlewares,
        _models
    }

}

module.exports = {
    connect
}