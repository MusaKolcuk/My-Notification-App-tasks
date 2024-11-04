import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js';
import productRoute from './routes/productRoute.js';
import notificationRoutes from './routes/notificationRoute.js';
import './relationships.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the Postgres database');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
