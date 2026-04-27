import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
connectDB();
app.use(express.json());
app.use('/api', userRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});