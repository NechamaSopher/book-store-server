
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', t => {
		t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
		t.timestamps(true, true);
		t.string('email');
		t.string('password');
		t.jsonb('refreshTokens').defaultTo([]);
	});
};
  
export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}
