const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    rows: {
        type: Number,
        required: 'Number of rows must be specified'
    },
    columns: {
        type: Number,
        required: 'Number of columns must be specified'
    },
    slug: String
})

inventorySchema.pre('save', function(next){
    if(!this.isModified('name')){
        next(); // * skip it
        return; // * stop the function from running
    }
    this.slug = slug(this.name);
    next();
})

module.exports = mongoose.model('Inventory', inventorySchema);