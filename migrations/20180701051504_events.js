
exports.up = function(knex, Promise) {
    return knex.schema.createTable('events', function( table ) {
        table.increments();
        table.string('user_guid').notNullable().references('guid').inTable('users');
        table.string('event_name').notNullable();
        table.string('img').notNullable();
        table.text('description').notNullable(); 
        table.dateTime('date').notNullable(); 
        table.string('location').notNullable();
        table.timestamps(true,true); 
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('events'); 
};
