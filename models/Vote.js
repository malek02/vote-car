const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema =new Schema({


    points:{
        type: String,
        required:true
    },
    os:{
        type: String,
        required:true
    },
});

const Vote=mongoose.model('Vote',VoteSchema);
module.exports=Vote;