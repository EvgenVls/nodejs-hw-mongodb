import fs from 'node:fs/promises';
import path from 'node:path';

import { env } from './env.js';

import { UPLOAD_DIR } from '../constants/index.js';

const saveFileToUploadDir = async (file) => {
  await fs.rename(file.path, path.join(UPLOAD_DIR, file.filename));

  return `/${env(UPLOAD_DIR)}/${file.filename}`;
};

export default saveFileToUploadDir;
