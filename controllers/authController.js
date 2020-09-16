const passport = require('passport');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login', 
    failureFlash: 'Failed Login',
    successRedirect: '/', 
    successFlash: 'Successful login'
})

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out');
    res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
    // * first check if user is authenticated
    if(req.isAuthenticated()){
        next();
        return;
    }
    req.flash('error', 'You must be logged in');
    res.redirect('/login');
}