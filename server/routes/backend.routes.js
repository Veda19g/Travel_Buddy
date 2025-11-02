const {Router}= require('express');
const itineraryRoutes= require('./itinerary.routes');

const backendRoutes= Router();

backendRoutes.use('/iti', itineraryRoutes);

module.exports=backendRoutes;