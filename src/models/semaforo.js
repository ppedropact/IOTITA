import mongoose from 'mongoose';

const semaforoSchema = new mongoose.Schema({
    x_cord: { type: Number, required: true },
    y_cord: { type: Number, required: true },
    detections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deteccao' }],
    open_time: { type: Number, required: true, default: 6000 }
});

const Semaforo = mongoose.model('Semaforo', semaforoSchema);

export default Semaforo;
