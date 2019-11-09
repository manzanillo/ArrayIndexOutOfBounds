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
                default: Date.now
            }
        }
    ],
    tags: [
        {
            text: String
        }
    ],
    user: String,
    votes: {
        type: Number,
        default: 0
    }
});

registerEvents(QuestionSchema);
export default mongoose.model('Question', QuestionSchema);
