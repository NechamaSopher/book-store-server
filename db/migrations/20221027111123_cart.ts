import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cart', t => {
		t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
		t.timestamps(true, true);
		t.uuid('user_id').references('users.id').notNullable().onDelete('RESTRICT').onUpdate('RESTRICT');
        t.boolean('active').defaultTo(true);
        t.jsonb('items');
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('cart');
}