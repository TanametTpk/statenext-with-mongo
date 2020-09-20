const getAll = require('require-all')

const templateServices = getAll({
    dirname: __dirname + "/services",
})

module.exports = (model) => {

    let services = {}
    let routes = {}
    let fileContent = ""

    Object.values(templateServices).map((templateService) => {

        let { service, route, routeString } = templateService(model)
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
            fileContent = aleadyHaveFile + routeString + "\n"
        }else {
            fileContent = routeString
        }

    })

    fileContent = `export defailt [
        ${fileContent}
    ]`

    return {
        services,
        routes,
        fileContent
    }

}