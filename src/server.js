import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "./.env")});
import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./middleware/router";
// import { prod } from "./middleware/prod";

const port = process.env.PORT || 4700;

const app = express();

// prod(app);
// db();
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.locals.role = null;
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "WELCOME LENDSQR ASSESSMENT API" });
});

router(app);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

export default app;


// return knex.schema.createTable("users", (table) => {
//   table.increments();
//   table.string("account_number").notNullable();
//   table.decimal("balance").defaultTo(0)
//   table.string("first_name").notNullable();
//   table.string("last_name").notNullable();
//   table.string("phone").notNullable();
//   table.string("email").notNullable().unique();
//   table.string("password").notNullable();
//   table.timestamp("created_at").defaultTo(knex.fn.now());
//   table.timestamp("updated_at").defaultTo(knex.fn.now());
// })
// .createTable("accountStatement", (table) => {
//   table.increments();
//   table.string("from").notNullable();
//   table.string("to").notNullable();
//   table.decimal("amount").notNullable();
//   table.enum("transaction_type", [ "credit", "debit" ]);
//   table.string("narrative").defaultTo("");
//   table.timestamp("created_at").defaultTo(knex.fn.now());
//   table.timestamp("updated_at").defaultTo(knex.fn.now());
//   table.string("receiver_name").notNullable();
//   table.string("sender_name").notNullable();
//   table.integer("created_by").unsigned().references("id").inTable("users");
// })
// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = (knex) => {
//   return knex.schema.dropTable("accountStatement").dropTable("users");
// };


// =======================user data======================
// await knex('users').del()
//   await knex('users').insert([
//     { account_number: "3649406595", balance: 4000000.00, first_name: "John", last_name: "Doe", email: "john@domain.com", phone: "08012345678", password: "john123" },
//     { account_number: "3649406596", balance: 100000.90, first_name: "Musa", last_name: "Danjuma", email: "musa@domain.com", phone: "08012345677", password: "musa123" },
//     { account_number: "3649406594", balance: 15000.48, first_name: "Okoli", last_name: "Ankeli", email: "okoli@domain.com", phone: "08012345676", password: "okoli123" },
//     { account_number: "3649406593", balance: 50000.00, first_name: "Mary", last_name: "Olusegun", email: "mary@domain.com", phone: "08012345675", password: "mary123" },
//   ]);

// await knex('transactions').del()
//   await knex('transactions').insert([
//     { from: "3649406595", to: "3649406596",  amount: 10000.00, sender_name: "John Doe", receiver_name: "Musa Danjuma", created_by: 1, narrative: "Payment for car purchase" },
//     { from: "3649406594", to: "3649406593",  amount: 2000.20, sender_name: "Okoli Ankeli", receiver_name: "Mary Olusegun", created_by: 3, narrative: "Payment for farm labour" },
//     { from: "3649406593", to: "3649406594",  amount: 4000.90, sender_name: "Mary Olusegun", receiver_name: "Okoli Ankeli", created_by: 4, narrative: "Payment for furnitures" }
//   ]);

// https://documenter.getpostman.com/view/2525985/UVkqqu14