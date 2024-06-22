/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Wallet', function(table) {
        table.uuid('id').primary().defaultTo(knex.raw('UUID()'));
        table.string('username').notNullable();
        table.string('email').notNullable().unique();
        table.decimal('balance', 14, 2).defaultTo(0.00).notNullable();
        table.string('bankName');
        table.number('accountNumber').notNullable().unique();
        table.string('accountName');
        table.string('accountType');
        table.string('bankBranch');
        table.string('swiftCode');
        table.boolean('isActive').defaultTo(true);
        table.boolean('isDeleted').defaultTo(false);
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
