const mongoose = require('mongoose');

const schema = mongoose.Schema;
// npm install --save mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new schema({
    name: {type: String , required: true},
    // Unique creates an internal index in the database to make it easier and faster to query our emails.
    email:{type: String , required: true , unique: true },
    password: {type: String , required: true , minlength:6 },
    image:{type: String , required : true},
    // list of places(ID's) for a particular user
    places:[{type: mongoose.Types.ObjectId , required: true,ref:'Place'}]
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);