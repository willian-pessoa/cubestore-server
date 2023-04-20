import express from "express"
import { getProducts, getCostumers, getTransactions } from "../controllers/client.js"

const router = express.Router()

router.get("/products", getProducts)
router.get("/customers", getCostumers)
router.get("/transactions", getTransactions)

export default router