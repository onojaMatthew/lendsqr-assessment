import path from "path";
import fs from "fs";
import jwt from 'jsonwebtoken';
import { error, success } from '../config/response';
import key from "../config/key";

require("dotenv").config({ path: path.resolve(__dirname, "/../../.env")});


/**
 * This function verifies
 * that user token is valid
 * */
export const verifyToken = (req, res, next) => {
  let token = req.header("authorization");
  if (!token) return res.status(403).json(error("Access denied. No token provided", res.statusCode));
  token = token.split(' ')[1];
  try {
    const decode = jwt.verify(token, key.SECRET_KEY);
    req.user = decode;
    next();
  }
  catch(err) {
    return res.status(401).json(error("Invalid token", res.statusCode));
  }
};