
import express from "express"
import dotenv from "dotenv"

import { connectDb } from "./src/Db/db.config.js"
import seedRoute from "./src/Routes/seed.route.js"
import productRoutes from "./src/Routes/product.route.js"
import cors from "cors"

// const corsOptions = {
//     origin: 'https://localhost:5173/',

// };


dotenv.config()

const app = express()


app.use(express.json());

app.use(cors({}))


const PORT = process.env.PORT || 8080

app.use("/api", seedRoute)
app.use("/api", productRoutes)



app.listen(PORT, () => {

    connectDb()

})