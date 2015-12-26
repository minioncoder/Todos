var mongoose = require('mongoose');

 
var taskSchema = new mongoose.Schema({
    text: {type: String},
    Completed: Boolean
});
module.exports = mongoose.model('Task', taskSchema);

taskSchema.pre('save', function(next){
    next();
});
