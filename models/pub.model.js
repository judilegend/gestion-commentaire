const mongoose = require('mongoose');

const pubSchema = mongoose.Schema({
    fields:{
        type: 'string',
        required: true
    },
    files:{
        type: 'string',
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('pub',pubSchema)