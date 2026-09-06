const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Hostinger LiteSpeed Custom Server
// This replaces the standalone server.js to ensure compatibility with
// Hostinger's multi-worker (lsnode) environment.

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
}).catch((err) => {
  console.error('Error preparing Next.js app:', err);
  process.exit(1);
});
