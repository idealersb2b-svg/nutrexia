const path = require('path');
const fs = require('fs');

// Set port and hostname for Hostinger environment
process.env.PORT = process.env.PORT || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Register all potential node_modules paths into CJS module resolver
const searchPaths = [
  path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'node_modules'),
  path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'apps', 'web', 'node_modules'),
  path.join(__dirname, 'apps', 'web', 'node_modules'),
  path.join(__dirname, 'node_modules')
];

for (const p of searchPaths) {
  if (fs.existsSync(p)) {
    module.paths.unshift(p);
  }
}

const appStandalone = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'apps', 'web', 'server.js');
const rootStandalone = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'server.js');

let target = null;
if (fs.existsSync(appStandalone)) {
  target = appStandalone;
} else if (fs.existsSync(rootStandalone)) {
  target = rootStandalone;
}

if (target) {
  const targetDir = path.dirname(target);
  console.log(`🚀 Hostinger Launcher: Launching standalone server from ${target}`);
  process.chdir(targetDir);
  require(target);
} else {
  console.error('❌ Hostinger Launcher: Could not locate standalone server file.');
}
