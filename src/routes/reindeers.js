let { Router } = require('express');
let router = Router();

let reindeers = require('../../data/reindeers.json');

router.get('/', (req, res) => {
    res.json(reindeers);
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let reindeer = reindeers.find(reindeer => reindeer.id == id);
    if (reindeer) {
        res.json(reindeer);
    } else {
        res.status(404).json({error: `No se encuentra el reno con id ${id}`});
    }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    reindeers = reindeers.filter(reindeer => reindeer.id != id);
    res.status(204).json({msg: 'Elemento eliminado'});
})

router.post('/', (req, res) => {
    console.log('body:', req.body)
    const newReindeer = req.body;
    console.log('longitud:', newReindeer.name.length);
    if (newReindeer.name.length > 0) {
        let maximo = Math.max(...reindeers.map(r => r.id), 0);
        newReindeer.id = maximo+1;
        reindeers.push(newReindeer);
        res.status(201).json(newReindeer);
    } else {
        res.status(400).json({error: 'Server dice que el nombre está vacío'});
    }
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let reindeer = reindeers.find(r => r.id == id);
    console.log(reindeer);
    reindeer.name = req.body.name;
    res.status(200).json(reindeer);
});

module.exports = router;