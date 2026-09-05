const path = require('path');
const fs = require('fs');

// Ensure Node.js searches apps/web/node_modules for Next.js dependencies
const webNodeModules = path.join(__dirname, 'apps', 'web', 'node_modules');
if (fs.existsSync(webNodeModules)) {
  module.paths.unshift(webNodeModules);
}
const standaloneNodeModules = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'node_modules');
if (fs.existsSync(standaloneNodeModules)) {
  module.paths.unshift(standaloneNodeModules);
}

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const port = parseInt(process.env.PORT || '3000', 10);
const dir = path.join(__dirname, 'apps', 'web');

console.log(`🚀 Starting Nutrexia Storefront from ${dir} on port ${port}...`);

const app = next({ dev, dir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Nutrexia Storefront live on port ${port}`);
  });
}).catch((err) => {
  console.error('❌ Failed to start Next.js application:', err);
  process.exit(1);
});
