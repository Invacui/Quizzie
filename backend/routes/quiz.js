const express = require('express');
const quizNQues = express.Router();
const Quizzes = require('../models/quizes_model');

quizNQues.post('/', async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data) && data.length > 1) {
      const { quizzesTitle, quizzesType } = data[0];
      const { instance } = data[1];

      // Extract necessary properties from instance
      const questionsData = instance.map((item) => {
        const { questionTitle, questionType, timerDuration, correctOption, options } = item.questions;

        return {
          questionTitle,
          questionType,
          timerDuration,
          correctOption,
          options
          // Other properties as needed
        };
      });

      // Create a new Quizzes document
      const newQuizzes = new Quizzes({
        quizzesTitle,
        quizzesType,
        quesInfo: { views: 0, creation_date: new Date() },
        questions: questionsData,
        // ... other properties as needed
      });

      // Save the document to the database
      const savedQuizzes = await newQuizzes.save();

      res.status(201).json(savedQuizzes);
    } else {
      res.status(400).json({ error: 'Invalid request body format' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = quizNQues;
