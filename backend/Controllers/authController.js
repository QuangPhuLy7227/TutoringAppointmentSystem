import User from '../models/UserSchema.js'
import Tutor from '../models/TutorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = user=> {
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn:'15d'
    })
}

export const register = async(req,res) => {
    const {email, password, name, role, grade, photo} = req.body;
    try {
        let user = null;
        if(role === 'student') {
            user = await User.findOne({ email });
        } else if(role === 'tutor') {
            user = await Tutor.findOne({ email });
        }

        //check if user already exist
        if(user) {
            return res.status(400).json({message: 'User already exist'});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        if(role==="student") {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                role,
                grade,
            })
        }
        if(role==="tutor") {
            user = new Tutor({
                name,
                email,
                password: hashPassword,
                photo,
                role,
            })
        }

        await user.save();
        res.status(200).json({success: true, message: 'User successfully created'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error, Please try again.'});
    }
};

export const login = async(req,res) => {
    const { email } = req.body
    try {
        let user = null;

        const patient = await User.findOne({email});
        const tutor = await Tutor.findOne({email});

        if(patient) {
            user = patient;
        }
        if(tutor) {
            user = tutor;
        }

        //Check if user exist or not
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }

        //compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status:false, message:"Invalid credentials" });
        }

        // get token
        const token = generateToken(user);

        const {password, role, grade, appointments, ...rest} = user._doc;
        res.status(200).json({ status: true, message:"Successfully login", role, grade, token, data:{...rest} });
        
    } catch (error) {
        res.status(500).json({ status:false, message:"Failed to login"});
    }
};