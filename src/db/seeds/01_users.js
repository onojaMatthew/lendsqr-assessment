/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { account_number: "3649406595", balance: 40000.45, first_name: "John", last_name: "Doe", email: "john@domain.com", phone: "08012345678", password: "john123" },
    { account_number: "3649406596", balance: 10000.90, first_name: "Musa", last_name: "Danjuma", email: "musa@domain.com", phone: "08012345677", password: "musa123" },
    { account_number: "3649406594", balance: 15000.48, first_name: "Okoli", last_name: "Ankeli", email: "okoli@domain.com", phone: "08012345676", password: "okoli123" },
    { account_number: "3649406593", balance: 50000.00, first_name: "Mary", last_name: "Olusegun", email: "mary@domain.com", phone: "08012345675", password: "mary123" },
  ]);
};
