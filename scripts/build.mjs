// Açık Hukuk statik site üreticisi. Bağımlılık gerektirmez: node scripts/build.mjs
// Girdi: site.json ve content/skills/<ad>/{SKILL.md,README.md}
// Çıktı: dist/

import { mkdir, readFile, writeFile, rm, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from './lib/frontmatter.mjs';
import { renderMarkdown, escapeHtml as e } from './lib/markdown.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const site = JSON.parse(await readFile(join(root, 'site.json'), 'utf8'));
const year = new Date().getFullYear();

// ---------- Veriyi yükle ----------

const skills = [];
for (const entry of site.skills) {
  const name = entry.repo.split('/')[1];
  const dir = join(root, 'content', 'skills', name);
  const skillPath = join(dir, 'SKILL.md');
  if (!existsSync(skillPath)) {
    console.warn(`! ${name}: SKILL.md yok, atlanıyor`);
    continue;
  }
  const { data } = parseFrontmatter(await readFile(skillPath, 'utf8'));
  const readmePath = join(dir, 'README.md');
  const readme = existsSync(readmePath) ? await readFile(readmePath, 'utf8') : '';
  const meta = data.metadata || {};
  const tags = (meta.tags || '').split(',').map((t) => t.trim()).filter(Boolean);
  const repoUrl = `https://github.com/${entry.repo}`;
  const branch = entry.branch || 'main';
  skills.push({
    ...entry,
    name: data.name || name,
    license: data.license || '—',
    version: meta.version || '—',
    checked: meta.mevzuat_son_kontrol || null,
    tags,
    repoUrl,
    zipUrl: `${repoUrl}/archive/refs/heads/${branch}.zip`,
    owner: entry.repo.split('/')[0],
    readmeHtml: renderMarkdown(readme, {
      skipFirstH1: true,
      headingShift: 0,
      resolveLink: (u) => `${repoUrl}/blob/${branch}/${u.replace(/^\.\//, '')}`,
    }),
  });
}

const areaBySlug = Object.fromEntries(site.areas.map((a) => [a.slug, a]));
const skillsIn = (slug) => skills.filter((s) => s.areas.includes(slug));

// ---------- Ortak parçalar ----------

const fmtDate = (iso) => {
  if (!iso) return 'Belirtilmemiş';
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
};

const logo = `<svg class="logo-mark" width="32" height="32" viewBox="0 0 34 34" aria-hidden="true"><rect x="1" y="1" width="32" height="32" rx="8" fill="currentColor"></rect><path d="M10 12h14M17 9v16M12 25h10M11 12l-3 7h6zM23 12l-3 7h6z" stroke="var(--paper)" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

const githubIcon = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path></svg>`;

const check = `<svg class="check" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9"></circle><path d="M6 10.5l2.5 2.5L14 7.5"></path></svg>`;

function layout({ rel, title, description, body, lang = 'tr' }) {
  const fullTitle = title ? `${title} · ${site.title}` : `${site.title}: ${site.tagline}`;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(fullTitle)}</title>
<meta name="description" content="${e(description || site.description)}">
<link rel="icon" href="${rel}assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${rel}assets/style.css">
<script src="${rel}assets/site.js" defer></script>
</head>
<body>
<a class="skip" href="#icerik">İçeriğe geç</a>
<div class="banner"><span class="pill">BETA</span><span>Türk hukuku için açık kaynak AI skill kütüphanesi.</span><a href="${rel}#katki">Katkı ver</a></div>
<header class="site-header wrap">
  <a class="brand" href="${rel}">${logo}<span>açık<span class="accent">hukuk</span></span></a>
  <nav aria-label="Ana menü" class="nav">
    <a href="${rel}#skiller">Skill'ler</a>
    <a href="${rel}#alanlar">Hukuk alanları</a>
    <a href="${rel}#nasil">Nasıl çalışır</a>
    <a href="${rel}hakkinda/">Hakkında</a>
    <a class="btn btn-outline" href="${e(site.github)}" rel="noopener">${githubIcon}GitHub</a>
  </nav>
</header>
<main id="icerik">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-top">
      <span class="brand small"><span>açık<span class="accent">hukuk</span></span></span>
      <nav aria-label="Alt menü" class="footer-nav">
        <a href="${rel}hakkinda/">Hakkında</a>
        <a href="${rel}kunye/">Künye / Impressum</a>
        <a href="${rel}gizlilik/">Gizlilik</a>
        <a href="${rel}datenschutz/" lang="de">Datenschutz</a>
        <a href="${rel}kullanim-sartlari/">Kullanım şartları</a>
        <a href="${e(site.github)}" rel="noopener">GitHub</a>
      </nav>
    </div>
    <p class="disclaimer"><strong>Önemli:</strong> Açık Hukuk'taki araçlar genel bilgi ve taslak üretimi amaçlıdır; hukuki danışmanlık veya avukatlık hizmeti yerine geçmez. Somut uyuşmazlıklarda bir avukata başvurun.</p>
    <p class="fine">© ${year} Açık Hukuk katkıcıları · Skill'ler kendi lisanslarıyla yayımlanır.</p>
  </div>
</footer>
</body>
</html>
`;
}

function reviewBadge(s) {
  return s.reviewer
    ? `<span class="status ok">İncelendi</span>`
    : `<span class="status">İncelenmedi</span>`;
}

function card(s, rel) {
  const areas = s.areas.map((a) => areaBySlug[a]?.name).filter(Boolean);
  const search = [s.name, s.summary, s.basis, ...areas, ...s.tags].join(' ').toLocaleLowerCase('tr');
  return `<li class="card" data-search="${e(search)}">
  <a href="${rel}skill/${e(s.name)}/" class="card-link">
    <div class="card-top"><span class="chip">${e(areas[0] || '')}</span><span class="mono muted small">${e(s.license)}</span></div>
    <span class="card-title mono">${e(s.name)}</span>
    <span class="card-desc">${e(s.summary)}</span>
    <span class="card-meta"><span>Dayanak: ${e(s.basis)}</span><span>v${e(s.version)} · ${reviewBadge(s)}</span></span>
  </a>
</li>`;
}

// ---------- Ana sayfa ----------

function home() {
  const rel = './';
  const featured = skills[0];
  const excerpt = featured
    ? `<div class="code-card">
  <div class="code-head"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="mono">${e(featured.name)}/SKILL.md</span></div>
  <pre class="mono"><span class="c-dim">---</span>
<span class="c-key">name:</span> ${e(featured.name)}
<span class="c-key">license:</span> ${e(featured.license)}
<span class="c-key">metadata:</span>
  <span class="c-key">version:</span> "${e(featured.version)}"
${featured.checked ? `  <span class="c-key">mevzuat_son_kontrol:</span> "${e(featured.checked)}"\n` : ''}<span class="c-dim">---</span>
<span class="c-head">## İş akışı</span>
Aşama 1: Uygulanabilirlik…</pre>
</div>`
    : '';

  const areaCards = site.areas
    .map((a) => {
      const n = skillsIn(a.slug).length;
      return `<li><a class="area" href="${rel}alan/${e(a.slug)}/"><span class="mono accent small">${e(a.code)}</span><span class="area-name">${e(a.name)}</span><span class="muted">${e(a.blurb)}</span><span class="small muted">${n ? `${n} skill` : 'Henüz skill yok'}</span></a></li>`;
    })
    .join('\n');

  const body = `
<section class="hero wrap">
  <div class="hero-text">
    <p class="mono accent eyebrow">// avukatlar tarafından, herkes için</p>
    <h1>Türk hukuku için<br><span class="accent">açık kaynak</span> AI araçları.</h1>
    <p class="lead">İhtarnameden kira sözleşmesine, iş sözleşmesinden KVKK incelemesine: hukukçuların yazdığı ve herkesin ücretsiz kullanabildiği AI skill'leri. Claude, ChatGPT ya da Gemini'de kullan.</p>
    <ul class="checks">
      <li>${check}Her skill'de inceleme durumu ve son mevzuat kontrolü görünür</li>
      <li>${check}Tamamen Türkçe, Türk hukuk sistemine göre</li>
      <li>${check}Ücretsiz ve açık kaynak lisanslı</li>
      <li>${check}Kaynak kodu GitHub'da, herkes katkı verebilir</li>
    </ul>
    <form class="search" role="search" action="${rel}#skiller" method="get">
      <label for="q" class="sr-only">Skill ara</label>
      <input id="q" name="q" type="search" placeholder="Örn. ihtarname, kira artışı, KVKK…" autocomplete="off">
      <button type="submit" class="btn btn-dark">Ara</button>
    </form>
    <p class="small muted">Popüler: <a href="?q=ihtarname#skiller">ihtarname</a> · <a href="?q=kira#skiller">kira</a> · <a href="?q=ayıplı#skiller">ayıplı mal</a> · <a href="?q=iş sözleşmesi#skiller">iş sözleşmesi</a></p>
  </div>
  <div class="hero-side">
    ${excerpt}
    <p class="works small"><span class="muted">Şunlarla çalışır:</span><span class="tag">Claude</span><span class="tag">ChatGPT</span><span class="tag">Gemini</span></p>
  </div>
</section>

<section id="alanlar" class="band">
  <div class="wrap section">
    <h2>Hukuk alanına göre keşfet</h2>
    <ul class="grid areas">${areaCards}</ul>
  </div>
</section>

<section id="skiller" class="wrap section">
  <div class="section-head">
    <h2>Skill'ler</h2>
    <p class="lead">Her kartta dayanak mevzuat, sürüm ve inceleme durumu yazar.</p>
  </div>
  <p class="small muted" id="sonuc" aria-live="polite"></p>
  <ul class="grid cards" id="skill-list">${skills.map((s) => card(s, rel)).join('\n')}</ul>
</section>

<section id="nasil" class="dark">
  <div class="wrap section">
    <h2>Üç adımda kullan</h2>
    <ol class="steps">
      <li><span class="mono">01</span><h3>Skill'i bul</h3><p>Hukuk alanına göre gez ya da ihtiyacını arama kutusuna yaz.</p></li>
      <li><span class="mono">02</span><h3>Asistanına ekle</h3><p>ZIP olarak indir ya da GitHub'dan klonla; skill yükleyebilen AI asistanına ekle.</p></li>
      <li><span class="mono">03</span><h3>Taslağı kontrol et</h3><p>Çıktı bir taslaktır. Kullanmadan önce kendi durumuna göre gözden geçir, gerekirse bir avukata danış.</p></li>
    </ol>
  </div>
</section>

<section id="katki" class="wrap section">
  <div class="cta">
    <div>
      <h2>Bildiğin bir iş akışı mı var? Skill'e dönüştür.</h2>
      <p class="lead">Avukat, stajyer ya da hukuk öğrencisi: GitHub üzerinden skill önerebilir, mevcut skill'leri inceleyebilir ve mevzuat değişikliklerini bildirebilirsin.</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-dark" href="${e(site.github)}/issues/new" rel="noopener">Skill öner</a>
      <a class="btn btn-outline" href="${e(site.github)}#yeni-skill-eklemek" rel="noopener">Katkı rehberi</a>
    </div>
  </div>
</section>`;
  return layout({ rel, title: '', body });
}

// ---------- Skill detay ----------

function detail(s) {
  const rel = '../../';
  const areas = s.areas.map((a) => areaBySlug[a]).filter(Boolean);
  const clone = `git clone ${s.repoUrl} ~/.claude/skills/${s.name}`;
  const body = `
<div class="wrap detail">
  <nav aria-label="Konum" class="crumbs small"><a href="${rel}">Ana sayfa</a><span aria-hidden="true">/</span>${
    areas[0] ? `<a href="${rel}alan/${e(areas[0].slug)}/">${e(areas[0].name)}</a><span aria-hidden="true">/</span>` : ''
  }<span>${e(s.name)}</span></nav>
  <div class="chips">${areas.map((a) => `<a class="chip" href="${rel}alan/${e(a.slug)}/">${e(a.name)}</a>`).join('')}<span class="tag mono">v${e(s.version)}</span><span class="tag mono">${e(s.license)}</span>${reviewBadge(s)}</div>
  <h1 class="mono detail-title">${e(s.name)}</h1>
  <p class="lead">${e(s.summary)}</p>
  <div class="note" role="note"><strong>Hukuki görüş değildir.</strong> Bu skill taslak ve ön inceleme üretir; sonuçlarını kendi durumuna göre kontrol et, gerekirse bir avukata danış.</div>

  <div class="columns">
    <article class="prose">${s.readmeHtml}</article>
    <aside class="side">
      <div class="panel">
        <h2>Kurulum</h2>
        <a class="btn btn-dark block" href="${e(s.zipUrl)}" rel="noopener">ZIP olarak indir</a>
        <p class="small muted">Claude Code ve Markdown skill yükleyen ortamlar için:</p>
        <pre class="cmd mono" id="cmd">${e(clone)}</pre>
        <button type="button" class="btn btn-outline block" data-copy="#cmd" hidden>Komutu kopyala</button>
        <a class="btn btn-outline block" href="${e(s.repoUrl)}" rel="noopener">${githubIcon}GitHub'da görüntüle</a>
      </div>
      <div class="panel">
        <dl class="facts">
          <dt>Yazar</dt><dd><a href="https://github.com/${e(s.owner)}" rel="noopener">${e(s.owner)}</a></dd>
          <dt>İnceleyen</dt><dd>${s.reviewer ? e(s.reviewer) : 'Henüz incelenmedi'}</dd>
          <dt>Mevzuat kontrolü</dt><dd>${e(fmtDate(s.checked))}</dd>
          <dt>Sürüm</dt><dd>${e(s.version)}</dd>
          <dt>Lisans</dt><dd>${e(s.license)}</dd>
          <dt>Kimler için</dt><dd>${e(s.audience || '—')}</dd>
          <dt>Çalıştığı yer</dt><dd>${e(s.runsIn || '—')}</dd>
        </dl>
      </div>
      ${
        s.tags.length
          ? `<div><h2 class="small muted">Etiketler</h2><p class="tags">${s.tags.map((t) => `<span class="tag mono">${e(t)}</span>`).join('')}</p></div>`
          : ''
      }
      <p class="panel dashed small">Bir hata ya da mevzuat değişikliği mi fark ettin? <a href="${e(s.repoUrl)}/issues/new" rel="noopener">GitHub'da bildir</a>.</p>
    </aside>
  </div>
</div>`;
  return layout({ rel, title: s.name, description: s.summary, body });
}

// ---------- Alan sayfası ----------

function area(a) {
  const rel = '../../';
  const list = skillsIn(a.slug);
  const body = `
<div class="wrap section">
  <nav aria-label="Konum" class="crumbs small"><a href="${rel}">Ana sayfa</a><span aria-hidden="true">/</span><span>${e(a.name)}</span></nav>
  <p class="mono accent small">${e(a.code)}</p>
  <h1>${e(a.name)}</h1>
  <p class="lead">${e(a.blurb)}</p>
  ${
    list.length
      ? `<ul class="grid cards">${list.map((s) => card(s, rel)).join('\n')}</ul>`
      : `<div class="cta"><div><h2>Bu alanda henüz skill yok.</h2><p class="lead">İlk skill'i sen yazmak ister misin?</p></div><div class="cta-actions"><a class="btn btn-dark" href="${e(site.github)}/issues/new" rel="noopener">Skill öner</a></div></div>`
  }
</div>`;
  return layout({ rel, title: a.name, description: a.blurb, body });
}

// ---------- Hakkında ve 404 ----------

function about() {
  const rel = '../';
  const body = `
<div class="wrap section narrow prose">
  <h1>Hakkında</h1>
  <p>Açık Hukuk, Türk hukukuna göre hazırlanmış açık kaynak AI skill'lerini bir araya getirir. Skill'ler, Claude, ChatGPT veya Gemini gibi AI asistanlarına eklenen ve belirli bir hukuki iş akışını adım adım yürüten talimat dosyalarıdır.</p>
  <h2>İnceleme durumu</h2>
  <p>Her skill sayfasında, skill'in bir hukukçu tarafından incelenip incelenmediği ve mevzuatın en son ne zaman kontrol edildiği yazar. "İncelenmedi" etiketli skill'ler topluluk tarafından yazılmış ilk sürümlerdir; kullanırken bunu göz önünde bulundur.</p>
  <h2>Hukuki uyarı</h2>
  <p>Buradaki araçlar genel bilgi ve taslak üretimi amaçlıdır; hukuki danışmanlık veya avukatlık hizmeti yerine geçmez. Mevzuat ve yargı kararları değişebilir. Somut bir uyuşmazlıkta bir avukata başvur.</p>
  <h2>Katkı</h2>
  <p>Her skill kendi GitHub reposunda yaşar. Hata bildirmek, mevzuat değişikliği önermek ya da yeni bir skill eklemek için <a href="${e(site.github)}" rel="noopener">GitHub sayfasını</a> ziyaret et.</p>
</div>`;
  return layout({ rel, title: 'Hakkında', body });
}

function notFound() {
  // 404 sayfası her adreste sunulduğu için göreli yol yerine sitenin kök yolu kullanılır.
  const rel = process.env.BASE_PATH || site.basePath || '/';
  const body = `<div class="wrap section narrow"><h1>Sayfa bulunamadı</h1><p class="lead">Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.</p><p><a class="btn btn-dark" href="${e(rel)}">Ana sayfaya dön</a></p></div>`;
  return layout({ rel, title: 'Sayfa bulunamadı', body });
}

// ---------- Yasal sayfalar ----------

// content/legal/*.md içindeki {{operator.email}} gibi alanları site.json'dan doldurur.
function fillTokens(md) {
  return md.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (m, path) => {
    const v = path.split('.').reduce((o, k) => (o == null ? o : o[k]), site);
    if (v == null) {
      console.warn(`! Tanımsız alan: ${m}`);
      return m;
    }
    return String(v).replace(/\n/g, '\\\n');
  });
}

const LEGAL = [
  { slug: 'kunye', file: 'kunye.md', title: 'Künye / Impressum', lang: 'tr' },
  { slug: 'gizlilik', file: 'gizlilik.md', title: 'Gizlilik ve kişisel veriler', lang: 'tr' },
  { slug: 'datenschutz', file: 'datenschutz.md', title: 'Datenschutzerklärung', lang: 'de' },
  { slug: 'kullanim-sartlari', file: 'kullanim-sartlari.md', title: 'Kullanım şartları', lang: 'tr' },
];

async function legalPage(p) {
  const rel = '../';
  const md = fillTokens(await readFile(join(root, 'content', 'legal', p.file), 'utf8'));
  const body = `<div class="wrap section narrow"><article class="prose">${renderMarkdown(md)}</article></div>`;
  return layout({ rel, title: p.title, body, lang: p.lang });
}

// ---------- Yaz ----------

async function out(path, html) {
  const full = join(dist, path);
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, html, 'utf8');
}

await rm(dist, { recursive: true, force: true });
await cp(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
await out('index.html', home());
await out('404.html', notFound());
await out('hakkinda/index.html', about());
for (const s of skills) await out(`skill/${s.name}/index.html`, detail(s));
for (const a of site.areas) await out(`alan/${a.slug}/index.html`, area(a));
for (const p of LEGAL) await out(`${p.slug}/index.html`, await legalPage(p));

const placeholders = JSON.stringify({ operator: site.operator, legal: site.legal }).match(/\[[^\]]+\]/g);
if (placeholders) console.warn(`! Yayından önce doldurulması gereken alanlar: ${placeholders.join(', ')}`);
await writeFile(join(dist, '.nojekyll'), '');
console.log(`✓ ${skills.length} skill, ${site.areas.length} alan → dist/`);
