const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt.js');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chacra');
const User = mongoose.model('Users',{id:String, name:String, email:String, password:String,});


//http://localhost:8080/users/newuser - Para postman

router.post('/newuser', async(request,response) =>{
  const salt = await bcrypt.genSalt(10);

  const body = request.body;
  const newUser= new User();
  newUser.id =  body.id;
  newUser.name =  body.name;
  newUser.email =  body.email;
  newUser.password =  await bcrypt.hash(body.password,salt);
  const result = await newUser.save().then ((res) => {
      return res;

  });
  /*response.json({result:result});---------------------------> RESPONDE JSON CON DATOS DE USUARIO*/
  console.log('Registro exitoso, bienvenido!');
  response.redirect('/registro_success.html');
  });



 router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' });
    
  console.log('Ingreso exitoso, bienvenido!');
  res.redirect('/admin.html');

    /*res.json({
      error: null,
      data: 'exito bienvenido',
  });------------------------------> PARA VER EN JSON EL LOGIN*/

});
  

 /* router.get('/usuarios', verifyToken, async (request, response) => {
    console.log("User: ", request.user);
    response.json({
      success: true,
      users
    })
  })*/


  module.exports = router;