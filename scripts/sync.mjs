// site.json'daki her skill reposundan SKILL.md ve README.md dosyalarını
// content/skills/<ad>/ klasörüne indirir. GitHub Actions'ta derlemeden önce
// çalışır; böylece site her zaman repolardaki güncel içeriği gösterir.
// Yalnızca Node'un yerleşik fetch'ini kullanır.

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(await readFile(join(root, 'site.json'), 'utf8'));
const FILES = ['SKILL.md', 'README.md'];

let failed = 0;
for (const skill of site.skills) {
  const name = skill.repo.split('/')[1];
  const dir = join(root, 'content', 'skills', name);
  await mkdir(dir, { recursive: true });
  for (const file of FILES) {
    const url = `https://raw.githubusercontent.com/${skill.repo}/${skill.branch || 'main'}/${file}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await writeFile(join(dir, file), await res.text(), 'utf8');
      console.log(`✓ ${skill.repo}/${file}`);
    } catch (err) {
      failed++;
      console.warn(`! ${skill.repo}/${file}: ${err.message} (depodaki kopya kullanılacak)`);
    }
  }
}
if (failed) console.warn(`${failed} dosya indirilemedi.`);
