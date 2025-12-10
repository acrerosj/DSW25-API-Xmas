const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

let reindeers = [
    {
        id: 1,
        name: 'Rudolf'
    },
    {
        id: 2,
        name: 'Juank'
    }, 
    {
        id: 3,
        name: 'Alfonso'
    }
];

const app = express();
const PORT = 3000;

app.use(cors());

// Crear la ruta para ver la documentación.
let swaggerDocument;
try {
    swaggerDocument = require('../swagger-output.json');
} catch {
    console.error('Swagger no generado aún. Vuelve a ejecutar npm run start o dev');
}

if (swaggerDocument) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

//----------RUTAS--------------------//
app.get('/',  (req, res) => {
    res.send('<h1>API de Navidad</h1>');
});

app.get('/algo',  (req, res) => {
    res.send('<h1>Esto es algo</h1>');
});

app.get('/reindeers', (req, res) => {
    res.json(reindeers);
})

app.get('/reindeers/:id', (req, res) => {
    let id = req.params.id;
    res.json(reindeers.find(reindeer => reindeer.id == id));
})

app.delete('/reindeers/:id', (req, res) => {
    let id = req.params.id;
    reindeers = reindeers.filter(reindeer => reindeer.id != id);
    res.status(204).json({msg: 'Elemento eliminado'});
})

app.post('/reindeers', (req, res) => {
    console.log(req.body)
    const newReindeer = req.body;
    newReindeer.id = 4;
    reindeers.push(newReindeer);
    res.status(201).json(newReindeer);
})

app.listen(PORT, () => {
    console.log(`La API está escuchando en http://localhost:${PORT}`);
});