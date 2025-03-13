const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
});

const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  questions: { type: [questionSchema], required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;