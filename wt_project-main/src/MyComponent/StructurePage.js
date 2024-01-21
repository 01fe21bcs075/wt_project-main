// Import necessary modules
const express = require('express');
const router = express.Router();
const StructureModel = require('../models/Structure'); // Adjust the path accordingly
const axios = require('axios');

// Define a route to handle structure data retrieval
router.get('/:batch/:option', async (req, res) => {
  try {
    const { batch, option } = req.params;

    // Fetch data from MongoDB based on batch and option
    const structureData = await StructureModel.findOne({ batch, option });

    if (!structureData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    // Return the data to the client
    res.json(structureData.data);
  } catch (error) {
    // console.error('Error fetching structure data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
