const {Router} = require('express')

const route = Router()


//Listar todos los datos
//Importando el controlador
const { getExportacion, postExportacion, putExportacion, deleteExportacion } = require('../controllers/exportanciones')

route.get('/', getExportacion)

route.post('/', postExportacion)

route.put('/:_id', putExportacion);

route.delete('/:_id', deleteExportacion);


module.exports = route 
