// ? CATCH ERRORS HANDLER **********************************************
// * With async/await, you may some way to catch errors 
// * Instead of using try/catch, in each controller,
// * we wrap the function in catchErrors(), catch any errors they throw, 
// * and pass it along to our express middleware using next()

exports.catchErrors = (fn) => {
    return function(req, res, next) {
        return fn(req, res, next).catch(next);
    };
};
// ? *********************************************************************

// ? NOT FOUND ERROR HANDLER *********************************************
// * If we hit a route that is not found, we mark it as 404
// * and pass it along to the next error handler to display

exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};
// ? *********************************************************************

// ? MONGODB VALIDATION ERROR HANDLER ************************************
// * Detect if there are MongoDB validation errors that
// * we can show via flash messages

exports.flashValidationErrors = (err, req, res, next) => {
    if (!err.errors) return next(err);
    // * Validation errors look like 
    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach(key => req.flash('error', err.errors[key].mesage));
    res.redirect('back');
};
// ? *********************************************************************

// ? DEVELOPMENT ERROR HANDLER *******************************************
// * In development, we show good error messages, 
// * so if we hit a syntax error, or any other previously unhandled error, 
// * we can show good info on what happened

exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };
    res.status(err.status || 500);
    res.format({
        // Based on the `Accept` http header
        'text/html': () => {
            res.render('error', errorDetails);
        }, // Form Submit, Reload the page
        'application/json': () => res.json(errorDetails) // Ajax call, send JSON back
    });
};
// ? *********************************************************************

// ? PRODUCTION ERROR HANDLER ********************************************
// * No stack traces are leaked to user

exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
};
// ? *********************************************************************


