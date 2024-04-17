import User from '../models/UserSchema.js'
import Booking from '../models/BookingSchema.js'
import Tutor from '../models/TutorSchema.js'

export const updateUser = async(req,res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true});
        res.status(200).json({success:true, message:"Successfully updated", data:updatedUser});
    } catch (error) {
        res.status(500).json({success:false, message:"Fail to update"});
    }
};

export const deleteUser = async(req,res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Successfully deleted"});
    } catch (error) {
        res.status(500).json({success:false, message:"Fail to delete"});
    }
};

export const getSingleUser = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select('-password');
        res.status(200).json({success:true, message:"User found", data:user});
    } catch (error) {
        res.status(500).json({success:false, message:"No user found"});
    }
};

export const getAllUser = async(req,res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({success:true, message:"Users found", data:users});
    } catch (error) {
        res.status(500).json({success:false, message:"Not found"});
    }
};

export const getUserProfile = async(req,res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success:false, message: "User not found" });
        }
        const { password, ...rest } = user._doc;
        res.status(200).json({ success:true, message:"Profile info is getting", data:{...rest}, });
    } catch (err) {
        res.status(500).json({ success:false, message:"Something went wrong, cannot get user" });
    }
}

export const getMyAppointment = async(req,res) => {
    try {
        //Retrieve appointments from booking
        const bookings = await Booking.find({user:req.userId});

        //Extract tutor ids form appointment booking
        const tutorIds = bookings.map(el => el.tutor.id)

        //Retrieve tutor using tutor ids
        const tutors = await Tutor.find({_id: {$in:tutorIds}}).select('-password');
        res.status(200).json({succes:true, message:"Appointment are getting", data:tutors});

    } catch (error) {
        res.status(500).json({ success:false, message:"Something went wrong, cannot get bookings" });
    }
}