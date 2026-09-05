const path = require('path');
const fs = require('fs');

const port = process.env.PORT || '3000';
process.env.PORT = port;
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Register standalone node_modules into Node.js module resolution search paths
const standaloneNodeModules = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'node_modules');
if (fs.existsSync(standaloneNodeModules)) {
  module.paths.unshift(standaloneNodeModules);
}

const standaloneAppPath = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'apps', 'web', 'server.js');
const standaloneRootPath = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneAppPath)) {
  console.log(`🚀 Hostinger Launcher: Starting standalone server from ${standaloneAppPath}`);
  process.chdir(path.dirname(standaloneAppPath));
  require(standaloneAppPath);
} else if (fs.existsSync(standaloneRootPath)) {
  console.log(`🚀 Hostinger Launcher: Starting standalone server from ${standaloneRootPath}`);
  process.chdir(path.dirname(standaloneRootPath));
  require(standaloneRootPath);
} else {
  console.log(`🚀 Hostinger Launcher: Fallback to custom Next.js server`);
  const { createServer } = require('http');
  const { parse } = require('url');
  const next = require('next');
  const dir = path.join(__dirname, 'apps', 'web');
  const app = next({ dev: false, dir });
  const handle = app.getRequestHandler();
  app.prepare().then(() => {
    createServer((req, res) => {
      handle(req, res, parse(req.url, true));
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Nutrexia Storefront live on port ${port}`);
    });
  });
}
