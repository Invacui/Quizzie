const mongoose = require('mongoose');

const QUIZZES_SCHEMA = mongoose.Schema({
  quizzesTitle: {
    type: String,
    required: true,
  },
  quizzesType: {
    type: String,
    enum: ['poll', 'qna'],
    required: true,
  },
  uniqueUrl: {
    type: String,
    default: function () {
      return this._id.toString(); // Use the default _id as uniqueUrl
    },
    unique: true,
    required:true,
  },
  quesInfo: [
    {
      views: {
        type: Number,
        required: false,
      },
      creation_date: {
        type: String,
        required: true,
      },
    },
  ],
  questions: [
    {
      questionTitle: {
        type: String,
        required: true, // Adjust as needed
      },
      questionType: {
        type: String,
        enum: ['textOptions', 'urlOptions', 'TextandUrl'],
        required: true,
      },
      timerDuration: {
        type: String,
        required: false,
      },
      options: {
        textOptions: [
          {
            type: String,
            required: false,
          },
        ],
        urlOptions: [
          {
            type: String,
            required: false,
          },
        ],
      },
      correctOption: {
        type: String,
        required: false,
      },
    },
  ],
});

const quizzes = mongoose.model('Quizzes', QUIZZES_SCHEMA);

module.exports = quizzes;
