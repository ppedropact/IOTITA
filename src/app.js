import express from 'express'
import compression from 'compression'
import cors from 'cors'
import { env } from './env/index.js'
import "../src/connect.js";
import semaforoRouter from './routes/semaforo.js'
import deteccaoRouter from './routes/deteccao.js'
import mongoose from 'mongoose';

const app = express()

var corsOptions = {
    origin: env.FRONTEND_DOMAIN ?? 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(compression())
app.use(express.json())

var listener = app.listen(env.DOMAIN ?? 5000)
listener.addListener('listening',onListening)
listener.addListener('error',onError)

/* Routes */
app.use('/deteccao',deteccaoRouter)
app.use('/semaforo',semaforoRouter)

// Clean route: Delete all semaforos and deteccoes
app.delete('/api/clean', async (req, res) => {
    try {
        await mongoose.connection.dropCollection('semaforos');
        await mongoose.connection.dropCollection('deteccoes');
        res.status(200).json({ message: 'All data deleted successfully.' });
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ message: 'Failed to delete data.' });
    }
});

// Event emitters
function onError(error) {
    if (error.syscal !== 'listen')
        throw error
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
    switch (error.code) {
        case 'EACCES':
            console.log(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.log(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    const addr = listener.address()
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
    console.log(`Listening on ${bind}`)
}