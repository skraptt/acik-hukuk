---
name: kira-sozlesmesi-inceleme
description: Türkiye'deki konut ve çatılı işyeri kira sözleşmelerini madde madde inceler; TBK'ya aykırı olabilecek hükümleri (kira artışı, depozito, ceza koşulu, muacceliyet kaydı, tahliye taahhüdü, döviz kirası) işaretler ve kiracı ya da kiraya veren açısından riskleri raporlar. Use to review a Turkish residential or commercial lease (kira sözleşmesi, kontrat) before signing or during a dispute.
license: Apache-2.0
metadata:
  version: "0.1.0"
  domain: turk-kira-hukuku
  mevzuat_son_kontrol: "2026-10-28"
  tags: "kira, kira-sozlesmesi, konut, isyeri, tbk, kira-artisi, depozito, tahliye-taahhudu"
---

# Kira Sözleşmesi İnceleme

Bu skill, kullanıcının paylaştığı bir kira sözleşmesini Türk Borçlar Kanunu'nun
konut ve çatılı işyeri kiralarına ilişkin hükümleri açısından inceler ve
anlaşılır bir rapor üretir.

> **Hukuki görüş değildir.** Rapor bir ön incelemedir. Kullanıcıya hiçbir zaman
> sözleşmenin "geçerli", "geçersiz" ya da "güvenli" olduğunu kesin bir dille
> söyleme. Hükmün ne dediğini, bunun hangi kuralla çelişebileceğini ve neyin
> bir avukata sorulması gerektiğini yaz.

Kullanıcıyla onun dilinde konuş.

## İş akışı

### Aşama 1: Bağlam (sor, tahmin etme)

1. Kullanıcı kiracı mı, kiraya veren mi, yoksa tarafsız bir inceleme mi
   istiyor?
2. Kiralanan konut mu, çatılı işyeri mi, başka bir şey mi (arsa, otopark)?
   Konut ve çatılı işyeri değilse TBK m.339 vd. özel hükümler uygulanmaz;
   bunu açıkça belirt.
3. Sözleşme imzalandı mı, yoksa imza öncesi mi? Yürürlükteyse başlangıç tarihi
   nedir? (Kira artışı ve süreler buna göre değerlendirilir.)
4. Kullanıcının özellikle merak ettiği bir hüküm ya da yaşadığı bir sorun var
   mı?

### Aşama 2: Sözleşmeyi oku ve eşleştir

`references/kontrol-listesi.md` dosyasını oku ve sözleşmenin her maddesini
listedeki başlıklarla eşleştir. `references/mevzuat-ozeti.md` dosyasındaki
dayanakları kullan.

Her hüküm için şu kararlardan birini ver:

- **Sorun yok:** Kanuna uygun görünüyor.
- **Dikkat:** Kanuna aykırı olabilir ya da bir taraf için belirgin risk taşıyor.
- **Eksik:** Olması gereken bir konu sözleşmede düzenlenmemiş.
- **Avukata sor:** Yoruma açık ya da Yargıtay uygulamasına bağlı.

Kanuna aykırı bir hükmün tüm sözleşmeyi değil, çoğu zaman yalnızca o hükmü
etkilediğini açıkla.

### Aşama 3: Rapor

Şu yapıyı kullan:

1. **Özet:** 3–4 cümle; en önemli 3 risk.
2. **Bağlam:** Aşama 1'in cevapları ve yaptığın varsayımlar.
3. **Madde madde tablo:** Madde no | Hüküm (kısa) | Değerlendirme | Dayanak |
   Öneri.
4. **Eksik konular.**
5. **Pazarlık veya düzeltme önerileri:** Kullanıcının tarafına göre, somut
   alternatif ifadelerle.
6. **Uyarı notu:** Hukuki görüş olmadığı; uyuşmazlıkta dava şartı
   arabuluculuk.

## Davranış kuralları

- Sözleşmede yazmayan bir şeyi yazıyormuş gibi gösterme; her değerlendirmede
  madde numarasını ver.
- Güncel kira artış oranını ezbere yazma. Oranın her ay TÜİK verisine göre
  değiştiğini, kullanıcının güncel oranı resmî kaynaktan kontrol etmesi
  gerektiğini söyle.
- Kullanıcı kiracıysa onu kiraya verene karşı kışkırtma; kiraya verense
  kiracının haklarını küçümseme. İki tarafın da yasal haklarını doğru anlat.
- Sözleşme yabancı dilde ya da yabancı unsurluysa (ör. kiraya veren yurt
  dışında) bunu belirt ve avukata danışılmasını öner.
- Kullanıcı kişisel veriler içeren bir belge paylaştıysa rapora T.C. kimlik
  numarası, IBAN gibi verileri geri yazma.
