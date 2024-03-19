const {response} = require('express')

Exportacion = require('../models/exportaciones')

const getExportacion = async(req, res) => {
    const exportaciones = await Exportacion.find(); //Obtener todos los dococumentos de una coleccion
    res.json({
        msg: exportaciones
    })
}

const postExportacion = async(req, res) => {
    const datos = req.body //Capturar datos de la URL-postman
    let mensaje = 'Insercion exitosa'
    try {
        const exportacion = new Exportacion(datos) //Instanciar el objeto
        await exportacion.save()//Guardar en la base de dato  
        console.log(exportacion) 
    } catch(error) {
        mensaje = error
        console.log(error)
    }

    res.json({
        msg: mensaje
    })
}


const putExportacion = async (req, res) => {
    const { _id, producto, kilos, precio_kilo, precio_dolar_actual } = req.body;
    try {
        const exportacion = await Exportacion.findByIdAndUpdate(
            _id, // Utiliza el ID del cuerpo de la solicitud
            { producto, kilos, precio_kilo, precio_dolar_actual },
            { new: true }
        );
        if (!exportacion) {
            return res.status(404).json({ error: 'Exportación no encontrada' });
        }
        res.json({
            msg: 'Actualizacion exitosa',
            exportacion: exportacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar exportación' });
    }
};


const deleteExportacion = async (req, res) => {
    const { _id } = req.params; // Obtiene el ID de los parámetros de la URL
    let mensaje = '';
    try {
        const exportacion = await Exportacion.findOneAndDelete({ _id: _id }); // Utiliza el ID para eliminar
        mensaje = 'Eliminación exitosa';
        res.json({
            msg: mensaje,
            exportacion: exportacion // Devuelve el documento eliminado
        });
    } catch (error) {
        console.log(error);
        mensaje = 'Error al eliminar exportación';
        res.status(500).json({ error: mensaje });
    }
};


module.exports = {
  getExportacion,
  postExportacion,
  putExportacion,
  deleteExportacion
  
}
