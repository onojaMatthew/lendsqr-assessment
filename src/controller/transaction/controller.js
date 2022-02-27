import knex from "../../db/knex";
import { error, success } from "../../config/response";

export const deposit_fund = async (req, res) => {
  const { amount, receiver_acct_no, sender_name, receiver_name, narrative  } = req.body;
  try {
    if (amount < 0) return res.status(400).json(error("Deposit amount is too low", res.statusCode))
    const to = await knex.select().from("users").where("account_number", receiver_acct_no);
    const receiver_balance = to[0] && to[0].balance + amount;
    
    if (!to[0]) return res.status(404).json(error("Destination account does not exist", res.statusCode));

    await knex("users").where("account_number", receiver_acct_no).update({ balance: receiver_balance });

    await knex("transactions").insert({ 
      to: receiver_acct_no, transaction_type: "credit", amount, sender_name, receiver_name, created_by: to[0].id, narrative 
    });

    const result = await knex.select().from("users").where("account_number", receiver_acct_no);
    return res.json(success("Success", result[0], res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const transfer_fund = async (req, res) => {
  const { amount, receiver_acct_no, debit_acct_no, sender_name, receiver_name, narrative } = req.body;
  try {
    const from = await knex.select().from("users").where("account_number", debit_acct_no);
    const to = await knex.select().from("users").where("account_number", receiver_acct_no);
    if (from[0] && from[0].balance < amount) return res.status(400).json(error("You have insufficient balance", res.statusCode));
    const receiver_balance = to[0] && to[0].balance + amount;
    const sender_balance = from[0] && from[0].balance - amount;

    await knex("users").where("account_number", receiver_acct_no).update({ balance: receiver_balance });
    await knex("users").where("account_number", debit_acct_no).update({ balance: sender_balance });

    await knex("transactions").insert({ 
      from: debit_acct_no, transaction_type: "debit", to: receiver_acct_no, amount, sender_name, receiver_name, created_by: to[0].id, narrative 
    });
    const result = await knex.select().from("users").where("account_number", debit_acct_no);
    return res.json(success("Success", result[0], res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
export const withdraw_fund = async (req, res) => {
  const { amount, debit_acct_no, receiver_name, narrative  } = req.body;
  try {
    const to = await knex.select().from("users").where("account_number", debit_acct_no);

    if (!to && !to[0]) return res.status(404).json(error("Account does not exist", res.statusCode));

    if (to && to[0] && to[0].balance <= amount) return res.status(400).json(error("Insufficient fund", res.statusCode));

    const receiver_balance = to[0] && to[0].balance - amount;
    
    await knex("users").where("account_number", debit_acct_no).update({ balance: receiver_balance });

    await knex("transactions").insert({ 
      from: debit_acct_no, amount, transaction_type: "debit", receiver_name, created_by: to[0].id, narrative 
    });

    const result = await knex.select().from("users").where("account_number", debit_acct_no);

    return res.json(success("Success", result[0], res.statusCode));

  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}