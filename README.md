# Açık Hukuk

**Türk hukuku için açık kaynak AI skill'lerinin toplandığı site.** Her skill
kendi GitHub reposunda yaşar; bu repo yalnızca siteyi üretir. Site, skill
repolarındaki `SKILL.md` ve `README.md` dosyalarından otomatik oluşturulur ve
GitHub Pages'te yayımlanır.

> ⚠️ Sitedeki araçlar genel bilgi ve taslak üretimi amaçlıdır; hukuki
> danışmanlık yerine geçmez.

## Nasıl çalışır?

```
site.json  ──►  scripts/sync.mjs  ──►  content/skills/<ad>/  ──►  scripts/build.mjs  ──►  dist/
(skill listesi)  (GitHub'dan çeker)     (SKILL.md, README.md)      (HTML üretir)           (yayın)
```

- Bağımlılık yok: yalnızca Node.js 18+ gerekir, `npm install` yok.
- Harici font, analitik, çerez veya takip kodu yok.
- GitHub Actions her push'ta ve her gün bir kez siteyi yeniden derler; skill
  repolarındaki değişiklikler böylece siteye kendiliğinden yansır.

## Yerelde çalıştırma

```bash
node scripts/sync.mjs     # skill içeriğini GitHub'dan güncelle (internet gerekir)
node scripts/build.mjs    # dist/ klasörünü üret
npx serve dist            # ya da: python3 -m http.server -d dist
```

`content/skills/` klasörü depoda da tutulur; internet yokken derleme bu
kopyalarla çalışır.

## Yeni skill eklemek

1. Skill'in kendi reposu olmalı ve kökünde `SKILL.md` bulunmalı (frontmatter:
   `name`, `description`, `license`, `metadata.version`,
   `metadata.mevzuat_son_kontrol`, `metadata.tags`).
2. `site.json` içindeki `skills` listesine bir kayıt ekle: `repo`, `areas`,
   `summary`, `basis`, `audience`, `runsIn`, `reviewer`.
3. Bir hukukçu skill'i incelediyse `reviewer` alanına adını yaz; site
   "İncelendi" etiketini gösterir.

## Yayına alma (bir kez)

GitHub'da repo ayarları › Pages › Source: **GitHub Actions**. Sonraki her
push siteyi yayımlar. Site `https://skraptt.github.io/acik-hukuk/` adresinde
açılır. Kendi alan adını kullanırsan `site.json` içindeki `basePath` değerini
`/` yap.

## Lisans

Site kodu Apache-2.0. Her skill kendi reposundaki lisansla yayımlanır.
