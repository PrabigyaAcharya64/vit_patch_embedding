// Minimal static file server for previewing patch_embedding.html over http://
// (http:// lets the canvas read real cat.jpg pixels instead of the synthetic fallback).
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = '/Users/prabigyaacharya/Downloads/vit';
const PORT = 8765;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/patch_embedding.html';
  const fp = path.normalize(path.join(ROOT, rel));
  if (!fp.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(fp).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log('serving ' + ROOT + ' on http://localhost:' + PORT));
