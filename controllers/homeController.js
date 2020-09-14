const mongoose = require('mongoose');
const Inventory = mongoose.model('Inventory');

exports.homePage = (req, res) => {
    res.render('index', {title: 'Home'});

}

exports.addInventory = (req, res) => {
    res.render('addInventory', {title: 'Add Inventory'});
}

exports.createInventory = async (req, res) => {
    console.log(req.body);
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.redirect('/');
}