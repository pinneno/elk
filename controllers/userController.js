const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
    res.render('login', {title: 'LOG IN'});
}

exports.registerForm = (req, res) => {
    res.render('register', {title: 'REGISTER'});
}

exports.validateRegistration = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name').notEmpty();
    req.checkBody('email', 'That email is not valid').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be blank').notEmpty();
    req.checkBody('confirm-password', 'Confirmed password cannot be blank').notEmpty();
    req.checkBody('confirm-password', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if(errors){
        req.flash('error', errors.map(err => err.msg));
        res.render('register', {
            title: 'REGISTER',
            body: req.body,
            flashes: req.flash()
        })
    }
    next(); // * There were no errors
}