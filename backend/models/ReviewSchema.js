import mongoose from "mongoose";
import Tutor from "./TutorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    tutor: {
      type: mongoose.Types.ObjectId,
      ref: "Tutor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre("/find/", function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (tutorId) {
  //this opints the current review
  const stats = await this.aggregate([
    {
      $match: { tutor: tutorId }
    },
    {
      $group: {
        _id: "$tutor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      }
    },
  ]);

  await Tutor.findByIdAndUpdate(tutorId, {
    totalRating: stats[0].numOfRating,
    avgRating: { $avg: "$rating" },
  })
}

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.tutor);
})

export default mongoose.model("Review", reviewSchema);
