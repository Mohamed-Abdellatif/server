import express from "express";
import validateJWT from "../middlewares/validateJWT";
import {
  getQuizById,
  getAllQuizzes,
  addQuiz,
  deleteQuiz,
  editQuiz
} from "../controllers/quizController";

const router = express.Router();

router.get("/:quizId", validateJWT, getQuizById);
router.get("/", validateJWT, getAllQuizzes);
router.post("/", validateJWT, addQuiz);
router.delete("/:quizId", validateJWT, deleteQuiz);
router.put("/:quizId", validateJWT, editQuiz);

export default router;
