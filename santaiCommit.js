const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sleep = require('sleep-promise'); // Menggunakan sleep-promise

const REPO_PATH = process.cwd();
const FILE_NAME = 'santai.txt';
const FILE_PATH = path.join(REPO_PATH, FILE_NAME);
const TOTAL_COMMITS = 500;
const MIN_DELAY = 2000; // Jeda minimal (dalam ms) = 2 detik
const MAX_DELAY = 5000; // Jeda maksimal (dalam ms) = 5 detik

// Daftar pesan commit random
const messages = [
  "Update README",
  "Fix typo",
  "Refactor code",
  "Improve performance",
  "Add new feature",
  "Remove unused files",
  "Update dependencies",
  "Minor bug fixes",
  "Enhance UI",
  "Improve documentation",
  "Optimize code",
  "Update config files",
  "Small improvements",
  "Cleanup",
  "Refactor functions",
  "Tweak styles",
  "Enhance UX",
  "Improve accessibility",
  "Fix formatting",
  "Adjust layout",
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomDelay() {
  return Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
}

(async () => {
  for (let i = 1; i <= TOTAL_COMMITS; i++) {
    fs.appendFileSync(FILE_PATH, `Baris ke-${i}\n`);
    
    const message = getRandomMessage();
    execSync(`git add ${FILE_NAME}`);
    execSync(`git commit -m "${message}"`);
    
    console.log(`✅ Commit ${i} berhasil dengan pesan: "${message}"`);
    
    const delay = getRandomDelay();
    console.log(`⏳ Menunggu selama ${delay / 1000} detik sebelum commit berikutnya...`);
    await sleep(delay);
  }
  
  try {
    console.log('🚀 Mencoba push ke GitHub...');
    execSync('git push origin main'); // Sesuaikan dengan nama branch kamu (main / master)
    console.log('✅ Push berhasil ke GitHub! Cek di repo kamu untuk memastikan.');
  } catch (error) {
    console.error('❌ Push gagal! Periksa apakah remote repo kamu sudah benar atau ada masalah koneksi.');
  }
})();
