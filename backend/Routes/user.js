import express from "express";
import { updateUser, deleteUser, getSingleUser, getAllUser, getUserProfile, getMyAppointment } from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["student"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["student"]), updateUser);
router.delete("/:id", authenticate, restrict(["student"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["student"]), getUserProfile);
router.get("/appointments/my-appointments", authenticate, restrict(["student"]), getMyAppointment);

export default router;