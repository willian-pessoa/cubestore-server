import express from "express"
import { getProducts, getCostumers } from "../controllers/client.js"

const router = express.Router()

router.get("/products", getProducts)
router.get("/customers", getCostumers)

export default router