import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    question:{
        type:String,
        required: true,
        unique:true
    },
    choice:[{
        type:String,
        required: true,
    }]
  },
  { timestamps: true }
);

const QuestionPickem = mongoose.model('QuestionPickem', userSchema,'QuestionPickem');

export default QuestionPickem;
