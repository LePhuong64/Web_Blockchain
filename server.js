const express = require('express');
const cors = require('cors');
const connectDB = require('./src/utils/db');
const authController = require('./controllers/authController');
const examController = require('./controllers/examController');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.get('/api/exams/:id', examController.getExamById); // Thêm dòng này

app.use(async (req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], 'your_jwt_secret'); 
      const user = await User.findById(decoded.id); // Truy vấn user từ DB
      if (user) {
        req.user = user;
        next(); // Cho phép request tiếp tục
      } else {
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
});


app.post('/api/exams', (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}, examController.createExam);

app.get('/api/exams', (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}, examController.getExams);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));