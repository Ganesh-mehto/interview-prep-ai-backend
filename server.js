require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const {generateConceptExplanation,generateInterviewQuestions}=require('./controllers/aiController')
const protect =require('./middlewares/authMiddleware')

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://interview-prep-ai-frontend-zeta.vercel.app",
  // Add other deployed frontend URLs if needed
];

app.use(cors({
     origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // Remove trailing slash from origin
    const cleanOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: Origin not allowed"), false);
    }
  },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

connectDB()
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);

app.use('/api/ai/generate-questions', protect, generateInterviewQuestions);
app.use('/api/ai/generate-explanation', protect, generateConceptExplanation);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'),{}));



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});