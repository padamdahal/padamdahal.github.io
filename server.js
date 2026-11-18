import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const BLOCKED_ROOT_FILES = new Set([
  '/package.json',
  '/package-lock.json',
  '/server.js',
  '/metadata.json',
]);

app.use((req, res, next) => {
  if (BLOCKED_ROOT_FILES.has(req.path)) {
    return res.status(404).send('Not found');
  }
  next();
});

app.use(
  express.static(__dirname, {
    index: 'index.html',
    extensions: ['html'],
    dotfiles: 'ignore',
  })
);

app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Static site server listening on http://${HOST}:${PORT}`);
});
