

import QuizModel from "../models/quizModel";



interface GetQuizForUser {
  quizId: string;
}

export const getQuizForUser = async ({ quizId }: GetQuizForUser) => {
  try {
    const quiz = await QuizModel.findById(quizId).lean(); // or use { _id: quizId } if preferred
    return quiz; // could be null if not found
  } catch (error) {
    console.error("Failed to get quiz:", error);
    throw new Error("Invalid quiz ID");
  }
};

export const deleteQuiz = async (quizId: string) => {
  try {
    const result = await QuizModel.findByIdAndDelete(quizId);
    return result; // null if not found
  } catch (error) {
    console.error("Failed to delete quiz:", error);
    throw new Error("Invalid quiz ID");
  }
};

interface EditQuizParams {
  quizId: string;
  update: Partial<{
    type: string;
    course: string;
    details: string;
    due: string;
    action: string;
  }>;
}

export const editQuiz = async ({ quizId, update }: EditQuizParams) => {
  try {
    const updated = await QuizModel.findByIdAndUpdate(
      quizId,
      { $set: update },
      { new: true, runValidators: true }
    ).lean();
    return updated; // null if not found
  } catch (error) {
    console.error("Failed to edit quiz:", error);
    throw new Error("Invalid quiz ID or update data");
  }
};

export const getAllQuizzes = async () => {
  try {
    const quizzes = await QuizModel.find({}).lean();
    return quizzes;
  } catch (error) {
    console.error("Failed to get all quizzes:", error);
    throw new Error("Failed to fetch quizzes");
  }
};

interface AddQuizParams {
  type: string;
  course: string;
  details: string;
  due: string;
  action: string;
}

export const addQuiz = async ({ type, course, details, due, action }: AddQuizParams) => {
  try {
    const quiz = await QuizModel.create({ type, course, details, due, action });
    return quiz;
  } catch (error) {
    console.error("Failed to add quiz:", error);
    throw new Error("Failed to add quiz");
  }
};
