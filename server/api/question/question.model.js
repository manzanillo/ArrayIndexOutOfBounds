import mongoose from 'mongoose';
import { registerEvents } from './question.events';

var QuestionSchema = new mongoose.Schema({
    title: String,
    content: String,
    answers: [
        {
            content: String,
            user: String,
            createdAt: {
                type: Date,
                required: true,
                default: Date.now
            }
        }
    ],
    tags: [
        {
            text: String
        }
    ],
    course: String,
    user: String,
    votes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

registerEvents(QuestionSchema);
export default mongoose.model('Question', QuestionSchema);
