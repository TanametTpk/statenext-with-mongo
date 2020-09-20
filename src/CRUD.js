const getAll = require('require-all')

const templateServices = getAll({
    dirname: __dirname + "/services",
})

module.exports = (model, modelName) => {

    let services = {}
    let routes = {}
    let fileContent = ""

    Object.values(templateServices).map((templateService) => {

        let { service, route, getContent } = templateService(model)
        services = {
            ...services,
            ...service
        }

        let serviceName = Object.keys(service)[0]

        routes = {
            ...routes,
            [serviceName]:{
                ...route,
                action:serviceName
            }
        }

        let aleadyHaveFile = fileContent
        if (aleadyHaveFile) {
            fileContent = aleadyHaveFile + getContent(modelName) + "\n"
        }else {
            fileContent = getContent(modelName)
        }

    })

    fileContent = `import { middlewares } from 'statenext-with-mongo';\nexport default [
        ${fileContent}
    ]`

    return {
        services,
        routes,
        fileContent
    }

}