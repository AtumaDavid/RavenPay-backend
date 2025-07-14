import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('webhook_logs', (table) => {
    table.increments('id').primary();
    table.json('payload').notNullable();
    table
      .integer('transaction_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('transactions')
      .onDelete('SET NULL');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('webhook_logs');
}
