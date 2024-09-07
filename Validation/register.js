var validator = require('validator');
module.exports = function validateregister(data) {
        let errors = [];
        let { email, password, confirmPassword, username } = data;

        if (!validator.isLength(username, { min: 3, max: 15 })) {
            errors.push('Username must be between 3 and 15 characters.');
        }
        if (!validator.isAlphanumeric(username)) {
            errors.push('Username must contain only letters and numbers.');
        }

        // Email validation
if (!validator.isEmail(email)) {
    errors.push('Invalid email format.');
}

// Password validation
if (!validator.isLength(password, { min: 8 })) {
    errors.push('Password must be at least 8 characters long.');
}
if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
})) {
    errors.push('Password must include uppercase, lowercase, numbers, and special characters.');
}

// Confirm password validation
if (password !== confirmPassword) {
    errors.push('Passwords do not match.');
}

// return errors array
return errors;
}