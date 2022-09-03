import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import keys from "../keys";




const auth = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  let jwtToken = req.header("Authorization");
  if (!jwtToken) return res.status(400).send("Authorization denied: No token");

  jwtToken = jwtToken.split(" ")[1];
  if (!jwtToken) return res.status(400).send("Authorization denied: No token");

  try {
    let payload = await jwt.verify(jwtToken, keys.secretsWords.SECRET_KEY_JWT);
    req.body.payload = payload;
    next();
  } catch (e) {
    return res.status(400).send("Authorization denied: Invalid token");
  }
};

export default auth;