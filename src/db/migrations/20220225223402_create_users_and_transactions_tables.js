/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("account_number").notNullable();
    table.decimal("balance").defaultTo(0)
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("phone").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
  .createTable("transactions", (table) => {
    table.increments();
    table.string("from");
    table.string("to");
    table.decimal("amount").notNullable();
    table.enum("transaction_type", [ "credit", "debit" ]);
    table.string("narrative").defaultTo("");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("receiver_name").notNullable();
    table.string("sender_name");
    table.integer("created_by").unsigned().references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("transactions").dropTable("users");
};
