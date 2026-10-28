// SKILL.md başındaki YAML frontmatter için küçük bir okuyucu.
// Desteklenenler: "anahtar: değer", tırnaklı değerler ve bir seviye iç içe
// eşleme (ör. metadata:). Daha karmaşık YAML gerekmiyor.

function unquote(v) {
  v = v.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  return v;
}

export function parseFrontmatter(text) {
  const src = text.replace(/^﻿/, '');
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: src };
  const data = {};
  let parent = null;
  for (const raw of m[1].split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const indented = /^\s+/.test(raw);
    const idx = raw.indexOf(':');
    if (idx === -1) continue;
    const key = raw.slice(0, idx).trim();
    const value = raw.slice(idx + 1);
    if (indented && parent) {
      data[parent][key] = unquote(value);
    } else if (value.trim() === '') {
      parent = key;
      data[key] = {};
    } else {
      parent = null;
      data[key] = unquote(value);
    }
  }
  return { data, body: src.slice(m[0].length) };
}
