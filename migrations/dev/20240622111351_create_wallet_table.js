/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Wallet', function(table) {
        table.uuid('id').primary().defaultTo(knex.raw('UUID()'));
        table.string('username').notNullable();
        table.string('email').notNullable().unique();
        table.string('bankName');
        table.decimal('balance', 14, 2).defaultTo(0.00).notNullable();
        table.decimal('totalReceived', 14, 2).defaultTo(0.00).notNullable();
        table.decimal('totalSent', 14, 2).defaultTo(0.00).notNullable();
        table.number('accountNumber').notNullable().unique();
        table.string('accountName');
        table.string('accountType');
        table.number('totalTransaction').defaultTo(0).notNullable();
        table.number('totalCreditTransaction').defaultTo(0).notNullable();
        table.number('totalDebitTransaction').defaultTo(0).notNullable();
        table.decimal('balance', 14, 2).defaultTo(0.00).notNullable();
        table.boolean('isActive').defaultTo(true);
        table.boolean('isDeleted').defaultTo(false);
        table.uuid('user_id').notNullable();
        table.timestamps(true, true);

        table.foreign('user_id').references('id').inTable('Users').onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Wallets');
};
