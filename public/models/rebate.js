const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rebateSchema = new Schema({

   /* user:{
        type: Schema.types.ObjectID, ref: 'user'
    },*/
    clinicName:{
        type: String,
        required: true
    },
    clinicAddress:{
        type: String
    },
    invoiceDate:{
        type: Date,
        required: true
    },
   /* patient:{
        type: Schema.types.ObjectID, ref: 'patient'
    },
    items:[{type: Schema.types.ObjectID, ref: 'products'}]*/
 
})

const Rebate = mongoose.model('Rebate', rebateSchema);
module.exports = Rebate;