import Review from "../models/ReviewSchema.js";
import Tutor from "../models/TutorSchema.js";

//get all reviews
export const getAllReviews = async(req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, message: "Successful", data: reviews });
    } catch(err) {
        res.status(404).json({ success: false, message: "Not found" });
    }
}

//create review
export const createReview = async(req, res) => {
    if(!req.body.tutor) req.body.tutor = req.params.tutorId;
    if(!req.body.user) req.body.user = req.userId;

    const newReview = new Review(req.body);

    try {
        const savedReview = await newReview.save();
        await Tutor.findByIdAndUpdate(req.body.tutor, {
            $push: { reviews: savedReview._id }
        });
        res.status(200).json({ success: true, message: "Review submitted", data: savedReview });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}