const path = require('path');
const fs = require('fs');

// Bind to Hostinger provided PORT or 3000
const port = process.env.PORT || '3000';
process.env.PORT = port;
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Recursively search for Next.js standalone server.js
function findStandaloneServer(dir, depth = 0) {
  if (depth > 5 || !fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  
  if (files.includes('server.js') && dir !== __dirname) {
    return path.join(dir, 'server.js');
  }

  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      if (fs.statSync(fullPath).isDirectory() && file !== 'node_modules') {
        const found = findStandaloneServer(fullPath, depth + 1);
        if (found) return found;
      }
    } catch (e) {}
  }
  return null;
}

const targetServer = findStandaloneServer(__dirname);

if (targetServer) {
  const targetDir = path.dirname(targetServer);
  console.log(`🚀 Hostinger Launcher: Found standalone server at ${targetServer}`);
  process.chdir(targetDir);
  require(targetServer);
} else {
  console.error(`❌ Hostinger Launcher: Could not locate Next.js standalone server.js`);
  console.error(`Root directory listing:`, fs.readdirSync(__dirname));
}
