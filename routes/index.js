const { Router } = require('express')
const router = Router()
    //const isNumber = require('is-number');
const Contenedor = require('../Contenedor.js')

const productos = new Contenedor()

//GET '/api/productos' -> devuelve todos los productos.
router.get('/api/productos', (req, res) => {
    res.json(productos.getAll())
    console.log(productos.getAll())
})

//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!isNumber(id)) { return res.json({ error: "El parámetro no es un número" }) }
    const elemento = productos.getById(id)
    if (!elemento.length) { return res.status(404).json({ error: "Producto no encontrado" }) }
    res.json(elemento)
})

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post('/api/productos', (req, res) => {

    const { name, price, thumbnail } = req.body
    const product = productos.newProduct(name, price, thumbnail)
    res.sendStatus(201)

})

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put('/:id', (req, res) => {
    const { name, price, thumbnail } = req.body
    const id = Number(req.params.id)
    const elemento = productos.getById(id)

    if (!elemento.length) { return res.status(404).json({ error: "Producto no encontrado" }) }
    productos.update(id, name, price, thumbnail)
    const elementChanged = productos.getById(id)
    res.json(elementChanged)

})

//DELETE '/api/productos/:id' -> elimina un producto según su id.*/

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    productos.deleteById(id)
    res.json(productos.getAll())
})


module.exports = router