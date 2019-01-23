var db = require('./models');


db.animal.findOrCreate({
	where: {
		species_name: 'red panda',
		scientific_name: 'a',
		image_url: 'http://placekitten.com/200/300',
		description: 'like a panda but not',
		extinct: false
	}
})
.spread((animal, created) => {
	console.log('animal was created');
})
.catch((err) => {
	console.log(err);
})