import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orders', t => {
		t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
		t.timestamps(true, true);
		t.uuid('cart_id').references('cart.id').notNullable().onDelete('RESTRICT').onUpdate('RESTRICT');
        t.enum('status', ['UNPAID', 'PAID', 'REFUND']).defaultTo('UNPAID');
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('orders');
}