
exports.seed = function(knex, Promise) {
  console.log("We're seeding markers");
  return knex('markers')
    .then(function () {
       return Promise.all([
        knex('markers')
        .insert({list_id: 1, user_id: 1, title: 'Bubby Roses', description: 'Coffeeeee', lat: 48.4227, lng: -123.3546}),
        knex('markers')
        .insert({list_id: 2, user_id: 2, title: 'Mount Doug', description: 'Hiking/Lookout', lat: 48.4924, lng: -123.3455}),
        knex('markers')
        .insert({list_id: 3, user_id: 3, title: 'Cadboro-Gyro Park', description: 'Beach!', lat: 48.4597, lng: -123.2946})
      ]);
    });
};
