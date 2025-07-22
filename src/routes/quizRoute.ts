import express from "express";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../Types/ExtendedRequest";
import { getQuizForUser, getAllQuizzes, deleteQuiz, editQuiz, addQuiz } from "../services/quizService";
import QuizModel from "../models/quizModel";

const router = express.Router();



router.get("/:quizId", validateJWT, async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await getQuizForUser({ quizId });
    res.status(200).send(quiz);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Get all quizzes
router.get("/", validateJWT, async (req, res) => {
  try {
    const quizzes = await getAllQuizzes();
    res.status(200).send(quizzes);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Add a new quiz
router.post("/", validateJWT, async (req, res) => {
  try {
    const { type, course, details, due, action } = req.body;
    const quiz = await addQuiz({ type, course, details, due, action });
    res.status(201).send(quiz);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Delete a quiz by ID
router.delete("/:quizId", validateJWT, async (req, res) => {
  try {
    const { quizId } = req.params;
    const deleted = await deleteQuiz(quizId);
    if (!deleted) {
      res.status(404).send("Quiz not found");
      return;
    }
    res.status(200).send({ message: "Quiz deleted" });
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Edit a quiz by ID
router.put("/:quizId", validateJWT, async (req, res) => {
  try {
    const { quizId } = req.params;
    const update = req.body;
    const updated = await editQuiz({ quizId, update });
    if (!updated) {
      res.status(404).send("Quiz not found");
      return;
    }
    res.status(200).send(updated);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

export default router;
