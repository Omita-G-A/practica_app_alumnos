const express = require('express');
const { connectDB } = require('./config/configuracion');

const rutas = require('./routes/rutas');

connectDB();
// const clase = ''; // criterio de busqueda clase & active
     
const app = express()
const PORT = process.env.PORT || 8080;


app.set('view engine', 'ejs');

// middleware per passar dades a des req.body amb es formularis
app.use(express.urlencoded({ extended: true })); // 

app.use(express.static('public'));


// RUTAS
// default
app.get('/', (req, res) => {
    res.render('index.ejs');
});
// demás rutas
// no estic gens segura d'això
app.use('/', rutas);

app.use((req, res) => {
    res.status(404).render('404');
});


app.listen(PORT, () => {
    console.log('Escuchando desde puerto', PORT);
});