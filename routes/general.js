import express from "express"
import { verifyJWT } from "../utils/jwt.js"
import { getUser, getDashboardStats, postLoginUser, postRegisterUser } from "../controllers/general.js"

const router = express.Router()

router.get("/user/:id", getUser)
router.get("/dashboard", getDashboardStats)
router.post("/login", postLoginUser)
router.post("/register", verifyJWT, postRegisterUser)

export default router