const fs = require('fs');
const readline = require('readline');

// Create an interface for reading user input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load pre-indexed data and products
const index = JSON.parse(fs.readFileSync('index.json', 'utf-8'));
const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

// Search function
function search(query) {
  const substring = query.slice(0, 4); // Only consider the first 4 letters
  const entry = index.find((item) => item[substring]);

  if (!entry) {
    return []; // No results
  }

  const matchedIds = entry[substring];
  
  // Get the products that match the IDs
  const matchedProducts = matchedIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product); // Remove any undefined products

  // Return the top 10 matches (or fewer if there are less than 10)
  return matchedProducts.slice(0, 10);
}

// Prompt user for a search query
rl.question('Enter your search query: ', (query) => {
  const results = search(query); // Example query
  console.log('Top 10 Search Results:', results);

  // Close the readline interface after displaying results
  rl.close();
});
