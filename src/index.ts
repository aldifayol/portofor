import fs from 'fs';
import path from 'path';
import process from 'process';
import { cp, rename, readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import prompts from 'prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createProject(name: string) {
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
   *  COPY TEMPLATE
   */
  try {
    const templateDir = path.resolve(__dirname, '../templates/default');
    await cp(templateDir, targetDir, { recursive: true });

    //  Safely handle the gitignore rename
    const templateGitignore = path.join(targetDir, 'gitignore.template');
    const finalGitignore = path.join(targetDir, '.gitignore');

    if (fs.existsSync(templateGitignore)) {
      await rename(templateGitignore, finalGitignore);
    }

    //  Inject the Project Name into package.json
    const pkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkgContent = await readFile(pkgPath, 'utf8');
      const updatedPkg = pkgContent.replace(/__PROJECT_NAME__/g, name);
      await writeFile(pkgPath, updatedPkg, 'utf8');
    }
  } catch (error: any) {
    console.error('\n❌  Error setting up project:', error.message);
    process.exit(1);
  }

  /**
   *  Go
   */
  console.log(`✅  Project created in ${targetDir}`);
  console.log(`\n✅  Next steps:\n    ➡️   cd ${name}\n    ⏬  npm install\n    🟢  npm run dev\n`);
}

/***
 *
 * ENTRY POINT
 *
 * */

async function main() {
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

    await createProject(response.name);
  } else {
    await createProject(process.argv[2]);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
