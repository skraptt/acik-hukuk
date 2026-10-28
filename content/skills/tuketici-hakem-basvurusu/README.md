# Tüketici Hakem Heyeti Başvurusu

**Türkiye'de tüketici şikâyetlerini başvuruya dönüştüren açık kaynak bir AI
skill'i.** Ayıplı mal, ayıplı hizmet, cayma hakkı ve abonelik sorunlarında
tüketicinin haklarını açıklar; başvurunun hakem heyetine mi tüketici
mahkemesine mi yapılacağını parasal sınıra göre belirler ve e-Devlet
başvurusu için açıklama metni hazırlar.

> ⚠️ **Hukuki görüş değildir.** Çıktı genel bilgi ve bir başvuru taslağıdır.

## Kapsam (v0.1)

| Konu | Dayanak |
|---|---|
| Ayıplı mal | 6502 m.8–12 |
| Ayıplı hizmet | 6502 m.13–16 |
| Cayma hakkı | 6502 m.48; Mesafeli Sözleşmeler Yönetmeliği |
| Abonelik iptali | 6502 m.52 |
| Hakem heyeti ve mahkeme ayrımı | 6502 m.68, 70, 73/A |

2026 parasal sınırı: 186.000 TL (her yıl Ocak'ta güncellenir).

## Kurulum

```bash
git clone https://github.com/skraptt/tuketici-hakem-basvurusu ~/.claude/skills/tuketici-hakem-basvurusu
```

Sonra: *"Aldığım telefon iki ayda bozuldu, firma değiştirmiyor. Ne
yapabilirim?"*

## Bakım notu

Her Ocak'ta `references/basvuru-rehberi.md` dosyasındaki parasal sınırı ve
Resmî Gazete bilgisini güncelleyin.

## Lisans

Apache-2.0
