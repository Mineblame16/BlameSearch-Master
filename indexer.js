const fs = require('fs');

// Load dataset
const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

// Pre-indexing function for 3-letter substrings
function createIndex(products) {
  const index = [];

  products.forEach((product) => {
    // Combine only `name` and `category` into a single string
    const text = `${product.name} ${product.category}`;

    // Generate 3-letter substrings
    for (let i = 0; i <= text.length - 3; i++) {
      const substring = text.slice(i, i + 3);

      // Skip spaces or invalid substrings
      if (/\s/.test(substring)) continue;

      // Find or create an entry for the substring
      let entry = index.find((item) => item[substring]);
      if (!entry) {
        entry = { [substring]: [] };
        index.push(entry);
      }

      // Add the product ID if not already included
      if (!entry[substring].includes(product.id)) {
        entry[substring].push(product.id);
      }
    }
  });

  return index;
}

// Generate the index
const index = createIndex(products);

// Save the index to a file
fs.writeFileSync('index.json', JSON.stringify(index, null, 2));
console.log('Indexing completed!');
