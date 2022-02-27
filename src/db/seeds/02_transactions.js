/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transactions').insert([
    { from: "3649406595", to: "3649406596",  amount: 10000.00, sender_name: "John Doe", receiver_name: "Musa Danjuma", created_by: 1, narrative: "Payment for car purchase" },
    { from: "3649406594", to: "3649406593",  amount: 2000.20, sender_name: "Okoli Ankeli", receiver_name: "Mary Olusegun", created_by: 3, narrative: "Payment for farm labour" },
    { from: "3649406593", to: "3649406594",  amount: 4000.90, sender_name: "Mary Olusegun", receiver_name: "Okoli Ankeli", created_by: 4, narrative: "Payment for furnitures" }
  ]);
};
