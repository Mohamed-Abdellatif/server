import { Request, Response } from "express";
import { register as registerService, login as loginService } from "../services/userService";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const { statusCode, data } = await registerService({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(statusCode).send(data);
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await loginService({ email, password });
    res.status(statusCode).send(data);
  } catch {
    res.status(500).send("Something went wrong");
  }
}; 