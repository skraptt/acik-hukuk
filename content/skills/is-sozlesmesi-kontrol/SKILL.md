---
name: is-sozlesmesi-kontrol
description: Türkiye'de 4857 sayılı İş Kanunu'na tabi iş sözleşmelerini inceler; deneme süresi, belirli süreli sözleşme, çalışma süresi ve fazla mesai, ücret, yıllık izin, rekabet yasağı, cezai şart ve fesih hükümlerini kanuna ve yerleşik Yargıtay uygulamasına göre işaretler. İşçi ya da işveren bakış açısıyla rapor üretir. Use to review a Turkish employment contract (iş sözleşmesi, hizmet sözleşmesi, rekabet yasağı, fazla mesai, deneme süresi).
license: Apache-2.0
metadata:
  version: "0.1.0"
  domain: turk-is-hukuku
  mevzuat_son_kontrol: "2026-10-28"
  tags: "is-sozlesmesi, is-kanunu, 4857, rekabet-yasagi, fazla-mesai, deneme-suresi, cezai-sart, kidem"
---

# İş Sözleşmesi Kontrol

Bu skill, kullanıcının paylaştığı bir iş sözleşmesini 4857 sayılı İş Kanunu ve
TBK'nın hizmet sözleşmesi hükümleri açısından inceler.

> **Hukuki görüş değildir.** Rapor bir ön incelemedir. İş hukukunda birçok
> sonuç Yargıtay uygulamasına ve somut olaya bağlıdır; kesin hüküm verme.
> Kullanıcıya hükmün ne dediğini, hangi kuralla çelişebileceğini ve neyin bir
> avukata sorulması gerektiğini yaz.

Kullanıcıyla onun dilinde konuş.

## İş akışı

### Aşama 1: Kapsam (sor, tahmin etme)

`references/mevzuat-ozeti.md` dosyasındaki "Kapsam" bölümünü oku. Sonra sor:

1. Kullanıcı işçi mi, işveren mi?
2. Sözleşme imzalandı mı, imza öncesi mi?
3. İşyeri ve iş: 4857 sayılı Kanun kapsamında mı? (Deniz ve hava taşıma,
   basın, tarım işletmelerinin bir kısmı, ev hizmetleri gibi istisnalar
   başka kanunlara tabidir.) Kamu görevlisi değil, işçi mi?
4. Belirli süreli mi, belirsiz süreli mi? Tam zamanlı mı, kısmi süreli mi,
   uzaktan çalışma mı?
5. Toplu iş sözleşmesi var mı? (Varsa bazı süreler değişebilir.)

### Aşama 2: Madde madde inceleme

`references/kontrol-listesi.md` dosyasındaki başlıklarla her maddeyi eşleştir
ve şu kararlardan birini ver: **Sorun yok**, **Dikkat**, **Eksik**,
**Avukata sor**.

Kanuna aykırı bir hükmün yerine kanun hükmünün uygulandığını ve sözleşmenin
geri kalanının çoğu zaman geçerli kaldığını açıkla.

### Aşama 3: Rapor

1. **Özet:** En önemli 3 risk.
2. **Kapsam ve varsayımlar.**
3. **Madde madde tablo:** Madde no | Hüküm (kısa) | Değerlendirme | Dayanak |
   Öneri.
4. **Eksik konular.**
5. **Pazarlık önerileri:** Kullanıcının tarafına göre, somut alternatif
   ifadelerle.
6. **Uyarı notu:** Hukuki görüş olmadığı; işçi alacakları ve işe iade
   davalarında dava açmadan önce arabulucuya başvurmanın dava şartı olduğu
   (7036 m.3).

## Davranış kuralları

- Kıdem tazminatı tavanı, asgari ücret ve benzeri dönemsel tutarları ezbere
  yazma; resmî kaynaktan kontrol edilmesini söyle.
- İşçiyi işverene, işvereni işçiye karşı kışkırtma; iki tarafın da yasal
  haklarını doğru anlat.
- Sözleşmede yazmayanı yazıyormuş gibi gösterme; her değerlendirmede madde
  numarası ver.
- Yabancı uyruklu çalışan, yurt dışında ifa, yönetici sözleşmesi gibi özel
  durumlarda avukata danışılmasını öner.
- Sözleşmeye eklenmiş KVKK açık rıza metinleri için: iş sözleşmesinin ifası
  için gereken veriler açık rızaya dayanmaz; açık rızanın sözleşme şartı
  yapılması sorunludur. Kod incelemesi gerekiyorsa `tr-fair-design` skill'ini
  öner.
