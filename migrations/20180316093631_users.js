
exports.up = function(knex, Promise) {
   return knex.schema.createTable('users', function( table ) {
        table.increments();
        table.string('guid').notNullable().unique();
        table.string('email', 250).notNullable().unique();
        table.string('name', 50).notNullable();
        table.string('password');
        table.string('google_auth_token');
        table.string('facebook_auth_token');
        table.string('facebook_id');
        table.integer('social_login_type');
        table.integer('profile_created').defaultTo(0);
        table.integer('account_type').defaultTo(0);
        table.timestamps(true,true);
    });
};

exports.down = function(knex, Promise) {
		return knex.schema.dropTableIfExists('users'); 
};
