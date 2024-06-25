/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Transaction', function(table) {
        table.uuid('id').primary().defaultTo(knex.raw('UUID()'));
        table.string('type').notNullable();
        table.string('reference').notNullable().unique();
        table.decimal('amount', 14, 2).defaultTo(0.00).notNullable();
        table.string('currency').notNullable
        table.string('status').notNullable
        table.string('bankName');
        table.bigInteger('accountNumber').notNullable().unique();
        table.string('accountName');
        table.string('accountType');
        table.string('bankBranch');
        table.string('swiftCode');
        table.boolean('isActive').defaultTo(true);
        table.boolean('isDeleted').defaultTo(false);
        table.uuid('user_id').notNullable();
        table.uuid('wallet_id').notNullable();
        table.timestamps(true, true);

        table.foreign('wallet_id').references('id').inTable('wallet').onDelete('CASCADE');
        table.foreign('user_id').references('id').inTable('Users').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
