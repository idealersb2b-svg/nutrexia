const path = require('path');
const fs = require('fs');

// Ensure server binds to Hostinger provided PORT or 3000
process.env.PORT = process.env.PORT || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Standalone target directories
const appStandaloneDir = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'apps', 'web');
const rootStandaloneDir = path.join(__dirname, 'apps', 'web', '.next', 'standalone');

if (fs.existsSync(path.join(appStandaloneDir, 'server.js'))) {
  console.log(`🚀 Changing working directory to ${appStandaloneDir}`);
  process.chdir(appStandaloneDir);
  require(path.join(appStandaloneDir, 'server.js'));
} else if (fs.existsSync(path.join(rootStandaloneDir, 'server.js'))) {
  console.log(`🚀 Changing working directory to ${rootStandaloneDir}`);
  process.chdir(rootStandaloneDir);
  require(path.join(rootStandaloneDir, 'server.js'));
} else {
  console.error('❌ Standalone server.js not found in expected paths.');
}
