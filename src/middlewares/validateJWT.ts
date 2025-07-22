import { NextFunction,  Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../Types/ExtendedRequest";



const validateJWT =  (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    res.status(403).send("Authorization header was not sent");
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send("Bearer token not found");
    return;
  }

  jwt.verify(token, "sEzl2VDuBhe3H7P5a5T3LoQB0bozhAeS",async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid token");
      return;
    }
    if (!payload) {
      res.status(403).send("Invalid token payload");
      return;
    }

    const userPayload = payload as {
      firstName: string;
      lastName: string;
      email: string;
    };

    const user = await userModel.findOne({ email: userPayload.email });
    req.user=user;
    next();
  });
};

export default validateJWT;
