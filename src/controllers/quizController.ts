import { Request, Response } from "express";
import {
  getQuizForUser,
  getAllQuizzes as getAllQuizzesService,
  deleteQuiz as deleteQuizService,
  editQuiz as editQuizService,
  addQuiz as addQuizService,
} from "../services/quizService";

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const quiz = await getQuizForUser({ quizId });
    res.status(200).send(quiz);
  } catch {
    res.status(500).send("Something went wrong");
  }
};

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await getAllQuizzesService();
    res.status(200).send(quizzes);
  } catch {
    res.status(500).send("Something went wrong");
  }
};

export const addQuiz = async (req: Request, res: Response) => {
  try {
    const { type, course, details, due, action } = req.body;
    const quiz = await addQuizService({ type, course, details, due, action });
    res.status(201).send(quiz);
  } catch {
    res.status(500).send("Something went wrong");
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const deleted = await deleteQuizService(quizId);
    if (!deleted) {
      res.status(404).send("Quiz not found");
      return;
    }
    res.status(200).send({ message: "Quiz deleted" });
  } catch {
    res.status(500).send("Something went wrong");
  }
};

export const editQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const update = req.body;
    const updated = await editQuizService({ quizId, update });
    if (!updated) {
      res.status(404).send("Quiz not found");
      return;
    }
    res.status(200).send(updated);
  } catch {
    res.status(500).send("Something went wrong");
  }
}; 