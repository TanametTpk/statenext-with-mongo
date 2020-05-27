import main from './main'
import * as _ from 'lodash'
import middlewares from './middlewares'

export interface DatabaseConfig {

    protocol?: string
    hostname?: string
    port?: string
    database_name?: string
    username?: string
    password?: string
    rewrite?: string

}

export interface DatabaseOption {
    autoRouting: boolean
    dbVerbose: boolean
}

export interface DatabaseSystem {
    services: any
    routes: any
    middlewares: any
    _models: any
}

export { middlewares }

const connect = (models: any, config: DatabaseConfig, option: DatabaseOption): DatabaseSystem => {

    const defaultConfig:DatabaseConfig = {

        protocol: "mongodb",
        hostname: "localhost",
        port: "27017",
        database_name: "test",
        username:"",
        password:""
      
    }

    const dbConfig:DatabaseConfig = _.defaults(config, defaultConfig) 
    return main.connect(models, dbConfig, option)
}

export default { connect }