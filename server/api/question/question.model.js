import mongoose from 'mongoose';
import { registerEvents } from './question.events';

var QuestionSchema = new mongoose.Schema({
    title: String,
    content: String,
    answers: [
        {
            content: String
        }
    ]
});

registerEvents(QuestionSchema);
export default mongoose.model('Question', QuestionSchema);
