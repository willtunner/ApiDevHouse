import { Schema, model } from 'mongoose';

const ReserveSchema = new Schema({
    date: String, 
    // Referencia o usuario com o model do usuario
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // Referencia a casa com o model casa
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});

export default model ('Reserve', ReserveSchema);