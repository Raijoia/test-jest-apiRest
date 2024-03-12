import { beforeEach, afterEach } from '@jest/globals';
import app from '../../app.js';

let server;
beforeEach(() => {
  const PORT = 3000;
  server = app.listen(PORT);
});

afterEach(() => {
  server.close();
});
