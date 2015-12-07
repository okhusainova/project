var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PrescriptionSchema   = new Schema({
    patient_surname: String,
    medication_slug: String,
    route: String,
    image: String,
    start_date : Date,
	end_date : Date,
	comments : String,
	days_interval : String, //каждый день через день и тд
	times : {
		"1" : String, //10.00
		"2" : String, //11.00
	}
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);