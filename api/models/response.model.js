import mongoose from "mongoose";

const UserResponseSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: { type: String, required: true }
}, { _id: false });

const ResponseSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userresponse: [UserResponseSchema]
});

const Response = mongoose.model('Response', ResponseSchema, "useresponse");
export default Response;
