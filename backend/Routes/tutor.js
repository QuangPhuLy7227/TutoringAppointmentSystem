import express from "express";
import { updateTutor, deleteTutor, getSingleTutor, getAllTutor, getTutorProfile } from "../Controllers/tutorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from './review.js'

const router = express.Router();

//nested route
router.use("/:tutorId/reviews", reviewRouter);

router.get("/:id", getSingleTutor);
router.get("/", getAllTutor);
router.put("/:id", authenticate, restrict(["tutor"]), updateTutor);
router.delete("/:id", authenticate, restrict(["tutor"]), deleteTutor);
router.get("/profile/me", authenticate, restrict(["tutor"]), getTutorProfile);

export default router;