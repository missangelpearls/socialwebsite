
exports.up = function(knex, Promise) {
    return knex.schema.createTable('profiles', function( table ) {
        table.increments();
        table.string('user_guid').notNullable().unique().references('guid').inTable('users');
        table.string('username', 60).notNullable().unique();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('country').notNullable();
        table.string('languages').notNullable();
        // table.string('hostortraveller').notNullable(); // i added
        // table.string('interests').notNullable();
        table.timestamps(true,true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('profiles'); 
};

