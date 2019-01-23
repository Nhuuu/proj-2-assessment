require('dotenv').config();
var db = require('./models');
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(parser.urlencoded({ extended: false }));
app.use('/', express.static('public'));


// Home page
app.get('/', (req, res) => {
	res.render('home');
});

// List all favorite animals
app.get('/favorites', (req, res) => {
	db.animal.findAll()
	.then((animals) => {
		res.render('favorites', {animals: animals});
	})
	.catch((err) => {
		console.log(err);
	});
});

// Add a new favorite animal
app.post('/favorites', (req, res) => {
	db.animal.findOrCreate({
		where: {
			species_name: req.body.species_name,
			scientific_name: req.body.scientific_name,
			image_url: req.body.image_url,
			description: req.body.description,
			extinct: req.body.extinct
		}
	})
	.spread((animal, created) => {
		console.log(animal, 'was created');
		res.redirect('/favorites');
	})
	.catch((err) => {
		console.log(err);
	})
})

// Form page for new animal
app.get('/favorites/new', (req, res) => {
	res.render('new')
})


app.listen(process.env.PORT || 3000);