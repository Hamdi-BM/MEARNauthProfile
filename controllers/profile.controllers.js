const Profile = require("../models/profile");

exports.GetAllProfiles = async (req, res) => {
    const profiles = await Profile.find({}).then(profile => res.json(profile));
};
exports.GetSingleProfile = async (req, res) => {
    const profile = await Profile.findById(req.params.id).then(profile => res.json(profile));
};

exports.AddProfile = async (req, res) => {
    const newProfile = new Profile(req.body);
    try{
        await newProfile.save().then(profile => res.json({message : "profile added succesfully",profile}));
    }catch(err){
        if(err.code === 11000){
            return res.status(400).json({message : "Error adding profile : duplicate key"});
        }else{
            return res.status(400).json({message : "Error adding profile : ", error : err.message});
        };
        
    };
    
};

exports.DelProfile = async (req, res) => {
    try {
        const deletedprofile = await Profile.findByIdAndDelete(req.params.id);
        
        if (!deletedprofile) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        // Return the deleted user data along with the confirmation message
        return res.status(200).json({
            message: 'profile deleted successfully.',
            deletedUser: {
                id: deletedprofile._id,
                email: deletedprofile.email,
                username: deletedprofile.username
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error: error.message });
    };
};

