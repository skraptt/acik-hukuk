# Kira Sözleşmesi İnceleme

**Türkiye'deki konut ve çatılı işyeri kira sözleşmelerini inceleyen açık kaynak
bir AI skill'i.** Sözleşmeyi madde madde okur; kira artışı, depozito, ceza
koşulu, muacceliyet kaydı, tahliye taahhüdü ve döviz kirası gibi sık sorun
çıkaran hükümleri TBK'ya göre işaretler. Kiracı, kiraya veren ya da tarafsız
bakış açısıyla rapor üretir.

> ⚠️ **Hukuki görüş değildir.** Rapor bir ön incelemedir; önemli kararlardan
> önce bir avukata danışın.

## Neleri kontrol eder (v0.1)

15 başlık: taraflar, süre, kira bedeli ve döviz, kira artışı, güvence bedeli,
ek ödeme ve ceza koşulu, yan giderler, bakım ve onarım, alt kira, tahliye
taahhüdü, fesih nedenleri, teslim ve iade, aile konutu, uyuşmazlık çözümü,
kişisel veriler.

Ayrıntılar: [`references/kontrol-listesi.md`](references/kontrol-listesi.md) ·
Dayanaklar: [`references/mevzuat-ozeti.md`](references/mevzuat-ozeti.md)

## Kurulum

```bash
git clone https://github.com/skraptt/kira-sozlesmesi-inceleme ~/.claude/skills/kira-sozlesmesi-inceleme
```

Skill yükleyebilen diğer AI asistanlarında klasörü yeni bir skill olarak
ekleyin. Sonra sözleşmeyi yükleyip: *"Bu kira sözleşmesini kiracı olarak
incele."*

## Katkı

Yeni bir kontrol başlığı önerirken: sözleşmede nasıl göründüğü, hukuki
dayanak ve varsa Yargıtay kararı (daire, esas ve karar numarası) ekleyin.

## Lisans

Apache-2.0
