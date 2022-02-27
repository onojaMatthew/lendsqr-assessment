import express from "express";
import { verifyToken } from "../../middleware/auth";
import { validate_fund_deposit, validate_fund_transfer, validate_fund_withdraw } from "../../validation";
import { deposit_fund, transfer_fund, withdraw_fund } from "./controller";

const router = express.Router();

router.post("/transfer", verifyToken, validate_fund_transfer, transfer_fund);
router.post("/deposit", verifyToken, validate_fund_deposit, deposit_fund);
router.post("/withdraw", verifyToken, validate_fund_withdraw, withdraw_fund);

export default router;