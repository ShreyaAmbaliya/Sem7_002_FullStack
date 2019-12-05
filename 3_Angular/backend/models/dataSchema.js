var mongoose=require('mongoose');
var employeeSchema=mongoose.Schema({
    name:{type:String},
    salary:{type:String},
    joindate:{type:String}
});
module.exports=mongoose.model('employee',employeeSchema);