const User = require("../models/user");
exports.GetAllProfiles = async (req, res) => {
    const user = await User.find({}).then(user => res.json(user));
};
exports.GetSingleProfile = async (req, res) => {
    const user = await User.findById(req.params.id).then(user => res.json(user));
};

exports.AddProfile = async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save().then(user => res.json({message : "user added succesfully",user}));
};

exports.DelProfile = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        // Return the deleted user data along with the confirmation message
        return res.status(200).json({
            message: 'User deleted successfully.',
            deletedUser: {
                id: deletedUser._id,
                email: deletedUser.email,
                username: deletedUser.username
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error: error.message });
    };
};

