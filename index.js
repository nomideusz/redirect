// Simple Express app for handling redirections without loops
const express = require('express');
const app = express();

// Set the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Redirect non-www to www, but prevent redirect loops
app.get('*', (req, res) => {
  const host = req.headers.host;
  
  // Only redirect if we're not already on www subdomain
  if (host.startsWith('www.')) {
    // Get the path and query parameters from the request
    const path = req.path;
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    
    // Extract the base domain (without subdomain)
    const baseDomain = host.includes('.') ? host.substring(host.indexOf('.') + 1) : host;
    
    // Construct the destination URL
    const destinationUrl = `https://${baseDomain}${path}${queryString}`;
    
    // Redirect with 301 (permanent redirect) status
    return res.redirect(301, destinationUrl);
  }
  
  // If we're already on www, just serve the content
  res.send('This is Zaur.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Redirect server running on port ${PORT}`);
});