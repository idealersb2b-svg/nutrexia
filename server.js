const path = require('path');
const fs = require('fs');

// Bind to Hostinger provided PORT or 3000
const port = process.env.PORT || '3000';
process.env.PORT = port;
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Potential standalone server locations in Next.js monorepo builds
const possiblePaths = [
  path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'apps', 'web', 'server.js'),
  path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'server.js'),
  path.join(__dirname, '.next', 'standalone', 'apps', 'web', 'server.js'),
  path.join(__dirname, '.next', 'standalone', 'server.js')
];

let targetServer = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    targetServer = p;
    break;
  }
}

if (targetServer) {
  const targetDir = path.dirname(targetServer);
  console.log(`🚀 Hostinger Launcher: Starting standalone server from ${targetServer}`);
  process.chdir(targetDir);
  require(targetServer);
} else {
  console.error(`❌ Hostinger Launcher: Could not locate standalone server. Checked:`, possiblePaths);
  try {
    console.error(`Root directory contents:`, fs.readdirSync(__dirname));
  } catch (e) {}
}
