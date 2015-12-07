var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TrackingSchema   = new Schema({
    prescription_id : String,
	date : Date,
	time_id : String
});

module.exports = mongoose.model('Tracking', TrackingSchema);