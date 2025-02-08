// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// // יש להכניס כאן את ה-API Key שלך
// const API_KEY = rnd_G2gjJ4gvf1xzNKgLHHLcTdGI8ORd

// app.get('/services', async (req, res) => {
//   try {
//     const response = await axios.get('https://api.render.com/v1/services', {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
// import renderApi from '@api/render-api';

// renderApi.auth('rnd_G2gjJ4gvf1xzNKgLHHLcTdGI8ORd');
// renderApi.listServices({includePreviews: 'true', limit: '20'})
//   .then(({ data }) => console.log(data))
//   .catch(err => console.error(err));
import express from 'express';
import renderApi from '@api/render-api';

const app = express();
const PORT = process.env.PORT || 3000;

// אימות מול Render API
renderApi.auth('rnd_G2gjJ4gvf1xzNKgLHHLcTdGI8ORd');

app.get('/', async (req, res) => {
  try {
    const { data } = await renderApi.listServices({ includePreviews: 'true', limit: '20' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data from Render API');
  }
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});