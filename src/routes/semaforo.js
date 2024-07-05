// routes/semaforo.js
import express from 'express';
const router = express.Router();
import Semaforo from '../models/semaforo.js';

// Example route: GET all semaforos
router.get('/', async (req, res) => {
    try {
        const semaforos = await Semaforo.find();
        res.json(semaforos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST route: Create a new semaforo
router.post('/', async (req, res) => {
    try {
        const { x_cord, y_cord } = req.body;
        
        // Create new Semaforo instance
        const newSemaforo = new Semaforo({
            x_cord,
            y_cord,
            open_time: 6000 // Example: set open_time to current date/time
        });

        // Save the new semaforo to MongoDB
        const savedSemaforo = await newSemaforo.save();

        res.status(201).json(savedSemaforo); // Respond with the created semaforo
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
