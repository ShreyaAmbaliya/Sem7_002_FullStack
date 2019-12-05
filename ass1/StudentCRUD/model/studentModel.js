const mongoose = require('../config/db');
StudentSchema = mongoose.Schema({
	name : String,
	contactno : String,
	emailid : String,
	gender : String,
	city : String
});
const StudentModel = mongoose.model('StudentModel',StudentSchema,'student');
module.exports = StudentModel;