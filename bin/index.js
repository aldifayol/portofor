#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import process from 'process';
import { cp, rename, readFile, writeFile } from 'fs/promises';
import prompts from 'prompts';

// // Minimal progress bar
// function progress(current, total, title) {
//   const percent = Math.round((current / total) * 100);
//   const filled = Math.round((current / total) * 20);
//   const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
//   process.stdout.write(`\r${title}: [${bar}] ${percent}%`);
//   if (current >= total) console.log();
// }

// // Copy with progress
// function copyDir(src, dest, callback) {
//   if (!fs.existsSync(src)) return;
//   const stats = fs.statSync(src);

//   if (stats.isDirectory()) {
//     if (!fs.existsSync(dest)) fs.mkdirSync(dest);
//     fs.readdirSync(src).forEach((item) => {
//       const srcPath = path.join(src, item);
//       let destPath = path.join(dest, item);

//       // Handle gitignore.template -> .gitignore conversion
//       if (item === 'gitignore.template') {
//         destPath = path.join(dest, '.gitignore');
//       }

//       copyDir(srcPath, destPath, callback);
//     });
//   } else {
//     fs.copyFileSync(src, dest);
//     callback && callback();
//   }
// }

// // Count files
// function countFiles(dir) {
//   if (!fs.existsSync(dir)) return 0;
//   let count = 0;
//   fs.readdirSync(dir).forEach((item) => {
//     const fullPath = path.join(dir, item);
//     count += fs.statSync(fullPath).isDirectory() ? countFiles(fullPath) : 1;
//   });
//   return count;
// }

async function createProject(name) {
  /**
   * Resolve target directory and ensure it doesn't exist
   */
  const targetDir = path.resolve(process.cwd(), name);

  if (fs.existsSync(targetDir)) {
    console.error(`❌  Directory "${targetDir}" already exists.`);
    process.exit(1);
  }

  console.log(`\n📁  Creating ${name}...\n`);

  /**
   *    COPY TEMPLATE
   */
  try {
    await cp(new URL('../templates/default', import.meta.url), targetDir, { recursive: true });

    // 2. Safely handle the gitignore rename
    const templateGitignore = path.join(targetDir, 'gitignore.template');
    const finalGitignore = path.join(targetDir, '.gitignore');

    if (fs.existsSync(templateGitignore)) {
      await rename(templateGitignore, finalGitignore);
    }

    // 3. Inject the Project Name into package.json
    const pkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkgContent = await readFile(pkgPath, 'utf8');
      const slugName = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      const updatedPkg = pkgContent.replace('__PROJECT_NAME__', name);
      await writeFile(pkgPath, updatedPkg, 'utf8');
    }
  } catch (error) {
    console.error('\n❌  Error setting up project:', error.message);
    process.exit(1);
  }

  /**
   * 5. Go
   */
  console.log(`✅  Project created in ${targetDir}`);
  console.log(`\n✅  Next steps:\n    ➡️   cd ${name}\n    ⏬  npm install\n    🟢  npm run dev\n`);
}

/***
 *
 * ENTRY POINT
 *
 * */

if (!process.argv[2]) {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: '🚀  Project name:',
    initial: 'my-portofor',
  });

  // Guard against Ctrl+C / empty input
  if (!response.name) {
    console.log('\n❌  Operation cancelled.');
    process.exit(0);
  }

  createProject(response.name);
} else {
  createProject(process.argv[2]);
}
