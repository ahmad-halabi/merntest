import mongoose from 'mongoose'

const billSchema = mongoose.Schema({
    name:{
        type: String,
        required: true, 
    },
    item:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required:true,
    }
},
{
    timestamps: true,
}
);

export const Bill = mongoose.model('Bill',billSchema);