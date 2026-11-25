import app from './app.mjs'

const port = Number(process.env.PORT || 3000)
app.listen(port, '0.0.0.0', () => console.log('Hardstuck League escuchando en el puerto ' + port))
