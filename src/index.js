const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
//const swig = require('swig'); Otro template para html
const pug = require('pug');
const nodemailer = require ('nodemailer');
const bodyParser = require('body-parser');



//set
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//engine SWIG, EJS, jade y PUG
/*app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))*/
app.engine('html', pug.renderFile);
app.set('view engine', 'html');
app.set('views', './src/public');


app.use(cors());

//rutas
const contactoRouters = require('./routes/contacto');
const productosRouters = require('./routes/productos');
const ubicacionRouters = require('./routes/ubicacion');
const turismoRouters = require('./routes/turismo');
const usersRouters = require('./routes/users');
const fechasRouters = require('./routes/fechas');
const adminRouters = require('./routes/admin');
const login_adminRouters = require('./routes/login_admin');
const nuevo_adminRouters = require('./routes/nuevo_admin');
const registro_successRouters = require('./routes/registro_success');


app.get('/', (req,res) => {
    res.render("home")
});

app.use('/contacto', contactoRouters);
app.use('/productos', productosRouters);
app.use('/ubicacion', ubicacionRouters);
app.use('/turismo', turismoRouters);
app.use('/users', usersRouters);//ruta para creacion de usuarios 
app.use('/fechas', fechasRouters);//ruta para creacion, get o put de fechas
app.use('/login_admin', login_adminRouters);
app.use('/admin', adminRouters);
app.use('/nuevo_admin', nuevo_adminRouters);
app.use('/registro_success', registro_successRouters);


//nodemailer
app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Email: ${email}</li>
            <li>Teléfono: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;
  
    console.log(contentHTML);
  
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: `gervasioriveiro@gmail.com`,
            pass: `mgmvehfoofdurvmx`
        },
        tls:{
            rejectUnauthorized: false
        }
    });
  
  /*transporter.sendMail({
        from: 'gervasioriveiro@gmail.com',
        to: 'gervasioriveiro@gmail.com',
        subject: 'Mail de prueba',
        text:'Esto es un  prueba'
    });*/
  
  const info = await transporter.sendMail({
        from: '"Server Gmail" <gervasioriveiro@gmail.com>',
        to: 'gervasioriveiro@gmail.com',
        subject: 'Contacto Nuevo Cliente',
        html: contentHTML
    })
  
   /* res.send('received');
  });*/
  
  console.log('Message sent', info.messageId);
  
  res.redirect('/success.html');
  
  });


//Ruta para descargar archivo
 app.get('/descargar', (req, res) => {
  const file = `${__dirname}/public/lotes.xlsx`;
  res.download(file);
});


let port = process.env.PORT || 8080;
  
app.listen(port, () => {
    console.log('El server trabaja en el puerto 8080')
});