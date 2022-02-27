import { body, validationResult } from "express-validator";
import { validation } from "../config/response";

export const validate_user_input = [
  body("first_name").isString().withMessage("First name input value is invalid"),
  body("first_name").isLength({ min: 3, max: 30 }).withMessage("First name must be at least 3 characters long"),
  body("last_name").isString().withMessage("Last name input value is invalid"),
  body("last_name").isLength({ min: 3, max: 30 }).withMessage("Larst name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isAlphanumeric().withMessage("Please enter password"),
  body("password").isLength({ min: 5, max: 30 }).withMessage("Password must be at least 5 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

export const validate_fund_deposit = [
  body("amount").isDecimal().withMessage("Amount is required"),
  body("receiver_acct_no").isLength({ min: 10, max: 10 }).withMessage("Invalid account number"),
  body("sender_name").isLength({ min: 3, max: 50 }).withMessage("Sender's name must be at least 3 characters long"),
  body("receiver_name").isLength({ min: 3, max: 50 }).withMessage("Receiver's name must be at least 3 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

export const validate_fund_withdraw = [
  body("amount").isDecimal().withMessage("Amount is required"),
  body("debit_acct_no").isLength({ min: 10, max: 10 }).withMessage("Invalid account number"),
  body("receiver_name").isLength({ min: 3, max: 50 }).withMessage("Receiver's name must be at least 3 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

export const validate_fund_transfer = [
  body("amount").isDecimal().withMessage("Amount is required"),
  body("debit_acct_no").isLength({ min: 10, max: 10 }).withMessage("Invalid account number"),
  body("receiver_name").isLength({ min: 3, max: 50 }).withMessage("Receiver's name must be at least 3 characters long"),
  body("sender_name").isLength({ min: 3, max: 50 }).withMessage("Sender's name must be at least 3 characters long"),
  body("receiver_acct_no").isLength({ min: 10, max: 10 }).withMessage("Invalid account number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]