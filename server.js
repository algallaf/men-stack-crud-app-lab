require('dotenv').config();
console.log("MONGO_URI from .env:", process.env.MONGO_URI);
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const Car = require('./models/Car');

const app = express();
const PORT = process.env.PORT || 3000;

//MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
//middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/cars', async (req, res) => {
  const cars = await Car.find({});
  res.render('index.ejs', { cars });
});

app.get('/cars/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/cars', async (req, res) => {
  await Car.create(req.body);
  res.redirect('/cars');
});

app.get('/cars/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('show.ejs', { car });
});

app.get('/cars/:id/edit', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('edit.ejs', { car });
});

app.put('/cars/:id', async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/cars/${req.params.id}`);
});

app.delete('/cars/:id', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect('/cars');
});



app.listen(PORT);
