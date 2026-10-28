# İş Sözleşmesi Kontrol

**Türkiye'deki iş sözleşmelerini inceleyen açık kaynak bir AI skill'i.**
4857 sayılı İş Kanunu ve TBK'ya göre deneme süresi, belirli süreli sözleşme,
fazla mesai, ücret, yıllık izin, rekabet yasağı, cezai şart ve fesih
hükümlerini işaretler. İşçi ya da işveren bakış açısıyla rapor üretir.

> ⚠️ **Hukuki görüş değildir.** Rapor bir ön incelemedir; iş hukukunda birçok
> sonuç Yargıtay uygulamasına bağlıdır. Önemli kararlardan önce bir avukata
> danışın.

## Neleri kontrol eder (v0.1)

14 başlık: iş ve işyeri, sözleşme türü, deneme süresi, çalışma süresi,
fazla çalışma, ücret, yıllık izin, rekabet yasağı, cezai şart, fesih ve
bildirim süreleri, gizlilik ve fikri mülkiyet, uzaktan ve kısmi süreli
çalışma, kişisel veriler, uyuşmazlık çözümü.

Ayrıntılar: [`references/kontrol-listesi.md`](references/kontrol-listesi.md) ·
Dayanaklar: [`references/mevzuat-ozeti.md`](references/mevzuat-ozeti.md)

## Kurulum

```bash
git clone https://github.com/skraptt/is-sozlesmesi-kontrol ~/.claude/skills/is-sozlesmesi-kontrol
```

Sonra sözleşmeyi yükleyip: *"Bu iş sözleşmesini işçi olarak incele, özellikle
rekabet yasağına bak."*

## Katkı

Yeni bir kontrol başlığı önerirken dayanak maddeyi ve varsa Yargıtay kararını
(daire, esas ve karar numarası) ekleyin.

## Lisans

Apache-2.0
