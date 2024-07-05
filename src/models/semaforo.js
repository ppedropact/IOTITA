import mongoose from 'mongoose';

const semaforoSchema = new mongoose.Schema({
    identity: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    detections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deteccao' }],
    open_time: { type: Number, required: true, default: 6000 }
});
semaforoSchema.index({ location: '2dsphere' });
const Semaforo = mongoose.model('Semaforo', semaforoSchema);

export default Semaforo;
