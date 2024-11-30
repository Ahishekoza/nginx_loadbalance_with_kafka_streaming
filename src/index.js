import express from 'express';
import { connectDB } from './config/db.js';
import { inventoryRoute } from './routes/inventory.route.js';
import { orderRoute } from './routes/order.route.js';
import { consumeOrderEventAndModifyInventory } from './services/inventoryConsumer.js';
// import dotenv from 'dotenv'
import cors from 'cors'
const app = express();
// dotenv.config()


app.enable('trust proxy');

app.use(express.json())
app.use(cors())

app.get('/api/health-check',(req, res) => {
    res.status(200).json({message:"Success"})
})


app.use('/api/v1',inventoryRoute,orderRoute)

consumeOrderEventAndModifyInventory()

connectDB().then(()=>{
    app.listen(3000,()=>{
        console.log("Server listening on port 3000");
    })

})
