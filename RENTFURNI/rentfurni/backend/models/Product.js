const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, required: true },
    image : { type:String , require:true}
});

module.exports = mongoose.model('Product', ProductSchema);