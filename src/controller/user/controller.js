import { error, success } from "../../config/response";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import knex from "../../db/knex";
import key from "../../config/key";
import { account_number } from "../../middleware/account_generator";

export const create_user = async (req, res) => {
  const { first_name, last_name, email, phone } = req.body
  try {
    const isUser = await knex.select().from("users").where("email", req.body.email);
    if (isUser && isUser.length > 0) return res.status(400).json(error("User already exists", res.statusCode));

    const hash = bcrypt.hashSync(req.body.password, 12);
    
    await knex("users").insert({ 
      first_name, last_name, email, phone, password: hash, account_number: account_number()
    });

    const new_user = await knex.select().from("users");

    return res.json(success("Success", new_user, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const user_list = async (req, res) => {
  try {
    const list = await knex.select().from("users");
    return res.json(success("Success", list, res.statusCode))
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const user_details = async (req, res) => {
  try {
    const user = await knex.select().from("users").where("id", req.query.id);
    return res.json(success("Success", user[0], res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const login = async (req, res) => {
  try {
    const user = await knex.select().from("users").where("email", req.body.email);
    if (!user[0]) return res.status(404).json(error("User not found", res.statusCode));
    const { first_name, email, id } = user && user[0];
    const token = jwt.sign({ id, email, }, key.SECRET_KEY, { expiresIn: "1days" });
    res.cookie("token", `Bearer ${token}`, { expires: new Date(new Date() + 64800000)});
    return res.header("authorization", `Bearer ${token}`).json(success("Login success", { token, user: { email, first_name }}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const delete_user = async (req, res) => {
  try {
    const user = await knex('users').where("id", req.query.id).del();
    return res.json(success("Success", user, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token").json(success("You have successfully logged out!!", {}, 200));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}
