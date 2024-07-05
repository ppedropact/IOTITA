import express from 'express';
const router = express.Router();
import Deteccao from '../models/deteccao.js';
import Semaforo from '../models/semaforo.js';

// GET all deteccoes
router.get('/', async (req, res) => {
    try {
        const deteccoes = await Deteccao.find();
        res.json(deteccoes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST route: Create a new deteccao
router.post('/', async (req, res) => {
    try {
        const { semaforo_id, number } = req.body;

        // Create new Deteccao instance
        const newDeteccao = new Deteccao({
            semaforo_id,
            detection_number_start: number,
            timeStamp_start: new Date() // Example: set timeStamp_start to current date/time
        });

        // Save the new deteccao to MongoDB
        const savedDeteccao = await newDeteccao.save();

        // Update associated Semaforo with new Deteccao
        await Semaforo.findByIdAndUpdate(
            semaforo_id,
            { $push: { detections: savedDeteccao._id } }
        );

        res.status(201).json(savedDeteccao); // Respond with the created deteccao
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PATCH route: Update a deteccao status to 'ok' and set timeStamp_end
router.patch('/:deteccaoId', async (req, res) => {
    try {
        const { deteccaoId } = req.params;

        const deteccaoOld = await Deteccao.findById(deteccaoId);

        const deltaTime = new Date() - deteccaoOld.timeStamp_start;
        // Find the deteccao by ID and update
        const updatedDeteccao = await Deteccao.findByIdAndUpdate(
            deteccaoId,
            {
                status: 'ok',
                timeStamp_end: new Date(),
                detection_number_end: req.body.detection_number_end,
                open_time: deltaTime
            },
            { new: true }
        );

        res.json(updatedDeteccao); // Respond with the updated deteccao
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
