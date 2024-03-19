const express = require('express')
const cors  = require('cors')
const bodyParser = require('body-parser')
const { dbConection } = require('../database/config')

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.exportacionPath = '/exportaciones' //Ruta de la API
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    listen(){
        this.app.listen(
            this.port, () => {
                console.log('Escuchando por el puerto '+this.port)
            } 
        )
    }
    routes(){
        this.app.use(this.exportacionPath, require('../routes/exportaciones'))
    }

    middlewares(){//
        this.app.use( cors() ); //Indicar el uso de cors
        this.app.use( bodyParser.json()) //Parsear objetos a insertar en la db
    }

    async conectarDB(){
        await dbConection()
    }

}

module.exports = {Server} //Exportación de la clase