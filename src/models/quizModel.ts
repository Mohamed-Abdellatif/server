import mongoose, { Document, Schema } from "mongoose";

export interface IQuiz extends Document {
  type: string;
  course: string;
  details: string;
  due: string;
  action: string;
}

const quizSchema = new Schema<IQuiz>({
  type: { type: String, required: true },
  course: { type: String, required: true },
  details: { type: String, required: true },
  due: { type: String, required: true },
  action: { type: String, required: true },
});

const QuizModel = mongoose.model<IQuiz>("Quiz", quizSchema);

export default QuizModel;
