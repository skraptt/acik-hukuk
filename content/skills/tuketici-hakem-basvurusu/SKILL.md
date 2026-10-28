---
name: tuketici-hakem-basvurusu
description: Türkiye'de ayıplı mal, ayıplı hizmet, cayma hakkı, abonelik ve benzeri tüketici uyuşmazlıklarında tüketicinin haklarını açıklar, başvurunun tüketici hakem heyetine mi tüketici mahkemesine mi yapılacağını parasal sınıra göre belirler ve e-Devlet üzerinden yapılacak tüketici hakem heyeti başvurusu için açıklama metni hazırlar. Use for a Turkish consumer complaint (tüketici hakem heyeti, ayıplı mal, iade, cayma hakkı, TÜBİS, e-Devlet başvurusu).
license: Apache-2.0
metadata:
  version: "0.1.0"
  domain: turk-tuketici-hukuku
  mevzuat_son_kontrol: "2026-10-28"
  tags: "tuketici, hakem-heyeti, ayipli-mal, ayipli-hizmet, cayma-hakki, iade, e-devlet, 6502"
---

# Tüketici Hakem Heyeti Başvurusu

Bu skill, bir tüketicinin satıcı ya da hizmet sağlayıcıyla yaşadığı sorunu
anlamasına, haklarını öğrenmesine ve tüketici hakem heyetine başvurusunu
hazırlamasına yardım eder.

> **Hukuki görüş değildir.** Çıktı bir başvuru taslağı ve genel bilgidir.
> Kullanıcıya başvurunun "kabul edileceğini" ya da "parasının geri
> verileceğini" söyleme.

Kullanıcıyla onun dilinde konuş. Başvuru metni her zaman Türkçe olur.

## İş akışı

### Aşama 1: Olayı anla

Sor:

1. Ne satın alındı ya da hangi hizmet alındı? Kimden, ne zaman, nereden
   (mağaza, internet, telefon)?
2. Ödenen tutar nedir? Fatura, sipariş onayı veya fiş var mı?
3. Sorun ne? Ne zaman fark edildi?
4. Satıcıya veya firmaya başvuruldu mu? Cevap ne oldu? Yazışmalar var mı?
5. Kullanıcı ne istiyor? (iade, değişim, onarım, indirim, abonelik iptali)
6. Alım ticari ya da mesleki amaçla mı yapıldı? (Öyleyse kullanıcı tüketici
   sayılmayabilir; bunu açıkça belirt.)

### Aşama 2: Hakları ve yolu belirle

`references/haklar-ozeti.md` dosyasını oku:

- Uyuşmazlığın türünü belirle (ayıplı mal, ayıplı hizmet, cayma hakkı,
  abonelik, garanti, diğer).
- Kullanıcının seçimlik haklarını ve sürelerini açıkla.
- Süre dolmuş ya da dolmak üzereyse açıkça uyar.

`references/basvuru-rehberi.md` dosyasından:

- Uyuşmazlık değerini parasal sınırla karşılaştır ve yolun hakem heyeti mi,
  tüketici mahkemesi mi olduğunu söyle. Sınırın her yıl değiştiğini ve
  başvuru tarihindeki sınırın geçerli olduğunu belirt.
- Mahkeme yoluysa, dava açmadan önce arabulucuya başvurmanın dava şartı
  olduğunu belirt ve kullanıcıyı avukata yönlendir.

### Aşama 3: Başvuru açıklama metni

Hakem heyeti yoluysa, e-Devlet'teki başvuru formunun açıklama alanına
yapıştırılacak bir metin hazırla. Rehberdeki yapıyı kullan:

- Kısa, olgusal, kronolojik.
- Tarihler, tutarlar ve belge numaraları.
- Tek ve açık bir talep.
- Kullanıcının elinde olan belgelerin listesi (eklenecekler).

Bilinmeyen bilgileri yer tutucu bırak; uydurma.

### Aşama 4: Sonraki adımlar

Başvurunun nereden yapılacağını, kararın bağlayıcılığını ve karara itiraz
süresini kısaca anlat.

## Davranış kuralları

- Firma hakkında hakaret ya da kanıtlanmamış suçlama içeren ifadeler yazma.
- Kullanıcının belge ve tarihlerini kendisinin kontrol etmesi gerektiğini
  hatırlat.
- Parasal sınırı yalnızca `basvuru-rehberi.md` dosyasındaki yıla göre ver;
  yıl değiştiyse güncel sınırın Ticaret Bakanlığı'ndan kontrol edilmesi
  gerektiğini söyle.
- Uyuşmazlık yurt dışındaki bir satıcıyla, kripto varlıkla ya da bankacılık
  işlemiyle ilgiliyse özel kurallar olabileceğini belirt ve avukata ya da
  ilgili kuruma yönlendir.
