if (process.env.VERCEL === '1') {
  console.log('Skipping husky install on Vercel');
  process.exit(0);
} else {
  const { execSync } = require('child_process');
  execSync('husky install', { stdio: 'inherit' });
}
