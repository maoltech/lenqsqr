/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Users', function(table) {
        table.uuid('id').primary().defaultTo(knex.raw('UUID()'));
        table.string('username').notNullable();
        table.string('email').notNullable().unique();
        table.string('bio');
        table.string('phoneNumber').notNullable().unique();
        table.boolean('isEmailVerified').defaultTo(false)
        table.boolean('isPhoneVerified').defaultTo(false);
        table.boolean('isActive').defaultTo(true);
        table.boolean('isDeleted').defaultTo(false);
        table.string('firstName').notNullable();
        table.string('lastName');
        table.string('address');
        table.string('city');
        table.string('state');
        table.string('zipCode');
        table.string('country');
        table.string('avatar').notNullable();
        table.string('role').notNullable().defaultTo('users');
        table.string('password').notNullable();
        table.boolean('isAdmin').defaultTo(false);
        table.boolean('isBlocked').defaultTo(false);
        table.boolean('isDeleted').defaultTo(false);

        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Users');
};
