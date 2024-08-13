
import express from 'express';
import { barChartController, pieChartController, productTranscationController, stataticsController } from '../Controllers/product.controller.js';

const router = express.Router()

router.get("/transactions", productTranscationController)

router.get("/statics", stataticsController)

router.get("/bar-chart", barChartController)
router.get("/pie-chart", pieChartController)

export default router