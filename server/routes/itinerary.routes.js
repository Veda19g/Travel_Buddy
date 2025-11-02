const express= require('express');
const {createItinerary}= require('../controllers/itinerary.controller');

const itineraryRoutes= express.Router();

itineraryRoutes.post('/create', createItinerary);

module.exports=itineraryRoutes;