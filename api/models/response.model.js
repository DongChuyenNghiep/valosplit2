import mongoose from "mongoose"; 
const ResponseSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: { type: String, required: true }
});

const Response = mongoose.model('Response', ResponseSchema,"useresponse");
export default Response