
import express from "express"
import { seedController } from "../Controllers/seed.controller.js"

const router = express.Router()


router.get("/seed", seedController)

export default router