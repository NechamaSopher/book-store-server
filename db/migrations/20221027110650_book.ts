import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('book', t => {
		t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
		t.timestamps(true, true);
		t.string('title');
        t.string('isbn');
		t.uuid('created_by').references('users.id').notNullable().onDelete('RESTRICT').onUpdate('RESTRICT');
        t.uuid('store_id').references('store.id').notNullable().onDelete('RESTRICT').onUpdate('RESTRICT');
        t.boolean('active').defaultTo(true);
        t.integer('price').nullable();
        t.integer('available_quantity');
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('book');
}

