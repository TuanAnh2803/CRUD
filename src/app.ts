import express from 'express';
import path from 'path';
import cors from 'cors';
import connectDB from './utils/database';
import postRoutes from './routes/post.routes';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Phục vụ file tĩnh

// Routes
app.use('/api/posts', postRoutes);

// Route gốc
app.get('/', (req, res) => {
  res.send(`
    <h1>Post CRUD API</h1>
    <p>Welcome to Post Management System</p>
    <ul>
      <li><a href="/api/posts">GET /api/posts</a> - Get all posts</li>
      <li><a href="/admin">Admin Panel</a> - Management interface</li>
    </ul>
    <p>Database status: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}</p>
  `);
});

// Route admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html')); // Corrected path
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});