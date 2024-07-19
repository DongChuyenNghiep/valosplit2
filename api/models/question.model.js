import mongoose from 'mongoose';
const choiceSchema = new mongoose.Schema(
  {
    logoid: {
      type: String,
      required: true,
    },
    teamname:{
      type:String,
    },
    riotidplayer:{
      type:String,
    }
  },
  { _id: false } // This option is to prevent creating an _id field for each choice
);
const userSchema = new mongoose.Schema(
  {
    question:{
        type:String,
        required: true,
        unique:true
    },
    choice:[choiceSchema]
  },
  { timestamps: true }
);

const QuestionPickem = mongoose.model('QuestionPickem', userSchema,'QuestionPickem');

export default QuestionPickem;
