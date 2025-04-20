// Simple Express app for handling redirections
const express = require('express');
const app = express();

// Set the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Redirect all traffic to www.zaur.app
app.get('*', (req, res) => {
  // Get the path and query parameters from the request
  const path = req.path;
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  
  // Construct the destination URL
  const destinationUrl = `https://www.zaur.app${path}${queryString}`;
  
  // Redirect with 301 (permanent redirect) status
  res.redirect(301, destinationUrl);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Redirect server running on port ${PORT}`);
});