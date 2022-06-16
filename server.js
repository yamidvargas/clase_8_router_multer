const express = require('express');
const app = express();
const routes = require('./routes/index');
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static(`${__dirname}/public`))

app.use('/', routes)


app.use((error, req, res) => {
    res.status(error.httpStatusCode).send(error)
})

app.listen(port, (err) => {
    if (err) {
        console.log(`Se produjo un error al iniciar el servidor: ${err}`)
    } else {
        console.log(`Servidor escuchando puerto: ${port}`)
    }
})