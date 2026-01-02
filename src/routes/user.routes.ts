import { Router } from "express";
import { AddUserData } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/addUserData", AddUserData);

export default router;
