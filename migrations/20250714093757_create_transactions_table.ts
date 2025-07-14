import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('account_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE');
    table.enum('type', ['deposit', 'transfer']).notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.string('recipient_account').nullable();
    table.string('recipient_bank').nullable();
    table
      .enum('status', ['pending', 'completed', 'failed'])
      .notNullable()
      .defaultTo('pending');
    table.string('reference').unique().notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
