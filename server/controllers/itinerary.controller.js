const { generateItinerary } = require('../services/gemini'); // ✅ Destructure

const createItinerary = async (req, res) => {
    try {
        const { destination, interests, season, days } = req.body;
        
        // Validate input
        if (!destination || !interests || !season || !days) {
            return res.status(400).json({ 
                error: 'Missing required fields: destination, interests, season, days' 
            });
        }

        const itinerary = await generateItinerary({ destination, interests, season, days });
        res.status(201).json(itinerary);
    } catch (error) {
        console.error('Itinerary generation error:', error); // Add logging
        res.status(500).json({ error: error.message || 'Failed to generate itinerary' });
    }                   
};

module.exports = { createItinerary };