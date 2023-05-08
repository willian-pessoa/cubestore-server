import express from "express"
import { getUser, getDashboardStats, postLoginUser, postRegisterUser } from "../controllers/general.js"

const router = express.Router()

router.get("/user/:id", getUser)
router.get("/dashboard", getDashboardStats)
router.post("/login", postLoginUser)
router.post("/register", postRegisterUser)

export default router