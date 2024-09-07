const validator = require('validator');
module.exports = function validateLogin(data){
    let errors = [];
    let { email, password,username } = data;
    //require email and password
    if (!email || !password || !username) {
        errors.push('some fields are required.' );
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        errors.push('Invalid email format.');
    }
    return errors;
}
