import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('store', t => {
		t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
		t.timestamps(true, true);
		t.string('name');
		t.uuid('created_by').references('users.id').notNullable().onDelete('RESTRICT').onUpdate('RESTRICT');
        t.boolean('active').defaultTo(true);
        t.enum('currency', ['USD', 'EURO']).defaultTo('USD');
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('store');
}
