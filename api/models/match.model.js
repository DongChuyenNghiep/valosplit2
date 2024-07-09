import mongoose, { isValidObjectId } from 'mongoose';

const agentSchema = new mongoose.Schema(
    {
        Agent: {
            type: String,
            required: true
        },
        IGN: {
            type: String,
            required: true
        },
        ACS: {
            type: String,
            required: true
        },
        K: {
            type: String,
            required: true
        },
        D: {
            type: String,
            required: true
        },
        A: {
            type: String,
            required: true
        },
        KD: {
            type: String,
            required: true
        },
        ADR: {
            type: String,
            required: true
        },
        HS: {
            type: String,
            required: true
        },
        KAST: {
            type: String,
            required: true
        },
        FK: {
            type: String,
            required: true
        },
        MK: {
            type: String,
            required: true
        }
    },
    { _id: false } // Prevents creation of an `_id` field in subdocuments
);

const matchSchema = new mongoose.Schema(
    {
        idmatch:{
            required : true,
            type: String,
            unique: true
        },
        logoteamleft:{
            required : true,
            type: String
        },
        teamNameleft: {
            type: String,
            required: true
        },
        scoreteamleft:{
            type:Number,
            required:true
        },
        teamNameright: {
            type: String,
            required: true
        },
        logoteamright:{
            type:String,
            required: true
        },
        scoreteamright:{
            type:Number,
            required:true
        },
        infoTeamleft: [agentSchema],
        infoTeamright: [agentSchema]
    },
    { timestamps: true }
);

const Match = mongoose.model('Match', matchSchema, 'MatchInfo');

export default Match;
