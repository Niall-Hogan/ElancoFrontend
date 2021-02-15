const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rebateSchema = new Schema({

    user:{
        type: Schema.Types.ObjectID, ref: 'user'
    },
    clinicName:{
        type: String,
        required: true
    },
    clinicAddress:{
        type: String
    },
    invoiceDate:{
        type: String,
        required: true
    },
    patient:{
        type: String
    },
    items:[{type: String}]
 
})

const Rebate = mongoose.model('Rebate', rebateSchema);
module.exports = Rebate;