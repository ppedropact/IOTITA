import mongoose from 'mongoose';

const deteccaoSchema = new mongoose.Schema({
    semaforo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Semaforo', required: true },
    detection_number_start: { type: Number, required: true },
    detection_number_end: { type: Number },
    status: { type: String, default: 'waiting' },
    timeStamp_start: { type: Date, default: Date.now },
    timeStamp_end: { type: Date },
    open_time: { type: Number , default: 0}
});

// Middleware to calculate open_time before saving
deteccaoSchema.pre('save', function(next) {
    console.log("saving")
    if (this.timeStamp_end) {
        const deltaTime = this.timeStamp_end - this.timeStamp_start;
        console.log(deltaTime)
        this.open_time = deltaTime;
    }
    next();
});

const Deteccao = mongoose.model('Deteccao', deteccaoSchema);

export default Deteccao;
