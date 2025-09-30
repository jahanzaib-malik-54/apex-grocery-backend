import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import authRouter from './src/routes/authRoute.js';
import productRouter from './src/routes/productRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import favoritesProductRouter from './src/routes/favoritesItemRoutes.js';
import cartRouter from './src/routes/cartItemRoute.js';
import consumerRouter from './src/routes/consumerRoutes.js';
import adminRouter from './src/routes/adminRoutes.js';
import categoryRouter from './src/routes/categoryRoute.js';
import { swaggerOptions } from './src/swager/swagerConfig.js';
import initializeSuperAdminUser from './src/utils/superAdminInitialize.js'
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());  // Replaced bodyParser.json()

// MongoDB Connection
mongoose
    .connect(process.env.DBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        return initializeSuperAdminUser(); 
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/favoritesProduct',favoritesProductRouter)
app.use('/cart',cartRouter)
app.use('/consumer',consumerRouter)
app.use('/admin',adminRouter)
app.use('/category',categoryRouter)
// app.use('/order',orderRouter)

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});



app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Swagger Documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ❗ 404 Handler 
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message:'404 not found',
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error: ", err); 

    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        param: err.param || null,
        value: err.value || null,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
