var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MedicationSchema   = new Schema({
    name: String,
    slug: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Medication', MedicationSchema);