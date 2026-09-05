const path = require('path');
const fs = require('fs');

// Ensure server binds to Hostinger provided PORT or 3000
process.env.PORT = process.env.PORT || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Primary path for Next.js monorepo standalone server
const standalonePath = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'apps', 'web', 'server.js');
const fallbackPath = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'server.js');

if (fs.existsSync(standalonePath)) {
  console.log(`🚀 Launching Next.js standalone server from ${standalonePath}`);
  require(standalonePath);
} else if (fs.existsSync(fallbackPath)) {
  console.log(`🚀 Launching Next.js standalone server from ${fallbackPath}`);
  require(fallbackPath);
} else {
  console.error('❌ Could not locate Next.js standalone server file.');
}
