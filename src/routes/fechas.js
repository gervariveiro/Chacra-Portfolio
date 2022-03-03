const { decodeBase64 } = require('bcryptjs');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chacra');
const Fecha = mongoose.model('Fechas',{date:String,});

// nueva fecha
router.post('/newfecha', async (request,response) =>{
  
    const body = request.body;
    const newFecha= new Fecha();
    newFecha.id =  body.id;
    newFecha.date =  body.date;
    const result = await newFecha.save().then ((response) => {
        return response;
    });
    console.log('Se creo una nueva fecha');
    response.redirect('/registro_success.html');
    });


    router.post("/updatefecha/:id", async (request, response) => {
        try{
            updateFecha = await Fecha.updateOne(
                {id: request.params.id},
                { $set: {date: request.body.date} });
        }
        catch (err) {
            response.json({ message: err});
        }
        console.log('La fecha fue modificada');
        response.redirect('/registro_success.html');
    });
              //FUNCIONA POST y PATCH TB.
        



router.get('/getfechas', (req, res) => {  //----------------> GET TODAS LAS FECHAS
        Fecha
            .find()
            .then((data) => res.json(data))
    });

router.get('/remates', (request, response) => {
        Fecha.findOne({},(err, date) => {
            response.render('remates.pug', (date));
          });
    });       

    //RENDERIZA SOLO EL DATO BUSCADO



/*router.get('/remates', (request, response) => {     ---------> RENDERIZA TODO EL ARREGLO
        Fecha.find({},(err, date) => {
        response.render('remates.pug', {date : date});
      });
    });*/


module.exports = router;