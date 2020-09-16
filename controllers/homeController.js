const mongoose = require('mongoose');
const Inventory = mongoose.model('Inventory');


exports.homePage = (req, res) => {
    res.render('index', {title: 'Home'});

}

exports.addInventory = (req, res) => {
    res.render('addInventory', {title: 'Add Inventory'});
}

exports.createInventory = async (req, res) => {
    const userCode = req.body['inventory-code'];
    // * user enters the following code:
        // ? const inventory = {
        // ?     rows: 10,
        // ?     columns: 10
        // ? };
        // ? return inventory;
    let userCreate = new Function(userCode);
    console.log(typeof userCreate);
    let userInventory = userCreate();
    console.log(userInventory);
    console.log(userInventory.rows);
    console.log(userInventory.columns);
    
    
    const inventory = new Inventory({
        rows: userInventory.rows,
        columns: userInventory.columns
    });
    await inventory.save();
    req.flash('success', `Successfully created Inventory`)
    res.redirect('/inventory');
}