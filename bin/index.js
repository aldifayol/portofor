#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { cp } from 'fs/promises';
import prompts from 'prompts';

/**
 * 1. Ask user for project name
 */
const response = await prompts({
  type: 'text',
  name: 'name',
  message: 'Project name:',
  initial: 'my-blog',
});

/**
 * 2. Resolve target directory
 */
const targetDir = path.resolve(process.cwd(), response.name);

/**
 * 3. Ensure directory does NOT already exist
 */
if (fs.existsSync(targetDir)) {
  console.error(`❌ Directory "${response.name}" already exists.`);
  process.exit(1);
}

/**
 * 4. COPY TEMPLATE HERE  ⬅⬅⬅
 *    (THIS IS STEP #6 FROM EARLIER)
 */
await cp(new URL('../templates/basic', import.meta.url), targetDir, { recursive: true });

/**
 * 5. Done
 */
console.log(`✅ Project created in ${targetDir}`);
console.log(`\nNext steps:\n  cd ${response.name}\n  npm install\n  npm run dev\n\n^ ^\n _ `);
