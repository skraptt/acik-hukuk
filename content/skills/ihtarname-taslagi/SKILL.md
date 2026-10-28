---
name: ihtarname-taslagi
description: Türk hukukuna göre noter veya KEP ile gönderilecek ihtarname taslağı hazırlar. Kira borcunun ödenmemesi, alacak tahsili, ayıp ihbarı, sözleşmenin feshi ve temerrüt ihtarı gibi durumlarda kullanıcıdan gerekli bilgileri adım adım toplar ve TBK'ya atıflı bir metin üretir. Use for drafting a Turkish formal notice (ihtarname, ihbarname, noter ihtarı, temerrüt ihtarı, kira ihtarı, ayıp ihbarı).
license: Apache-2.0
metadata:
  version: "0.1.0"
  domain: turk-borclar-hukuku
  mevzuat_son_kontrol: "2026-10-28"
  tags: "ihtarname, ihbarname, noter, kep, temerrut, kira, ayip-ihbari, tbk"
---

# İhtarname Taslağı

Bu skill, kullanıcının durumuna uygun bir **ihtarname taslağı** hazırlar:
taraflar, olaylar, talep, süre ve hukuki sonuç açıkça yazılmış, noterde ya da
KEP ile gönderilmeye hazır bir metin.

> **Hukuki görüş değildir.** Çıktı bir taslaktır. Gönderilmeden önce
> kullanıcının kendisi, mümkünse bir avukat tarafından kontrol edilmelidir.
> Kullanıcıya hiçbir zaman "bu ihtarname geçerlidir" ya da "davayı kazanırsınız"
> deme.

Kullanıcıyla onun dilinde konuş. İhtarnamenin kendisi her zaman Türkçe olur.

## İş akışı

### Aşama 1: İhtarname türünü belirle

`references/ihtarname-turleri.md` dosyasını oku. Kullanıcının anlattıklarından
hangi türün uygun olduğunu çıkar ve **kullanıcıya teyit ettir**. Tür, metnin
içeriğini ve verilecek süreyi belirler; yanlış tür, ihtarın amacına hizmet
etmemesine yol açabilir.

Kullanıcı birden fazla şey istiyorsa (ör. hem kira borcunun ödenmesi hem de
tahliye), bunun tek bir ihtarnamede mi yoksa ayrı ayrı mı yapılması gerektiğini
türler dosyasındaki notlara göre açıkla.

### Aşama 2: Bilgi topla (sor, uydurma)

Eksik bilgileri **tek tek ve sade bir dille** sor. Bilmediğin hiçbir bilgiyi
uydurma; eksik kalan her alanı köşeli parantezle yer tutucu olarak bırak
(ör. `[Muhatabın T.C. kimlik no]`).

Her tür için gerekenler:

1. İhtar eden: ad soyad / unvan, T.C. kimlik no veya vergi no, adres.
2. Vekil varsa: avukatın adı ve adresi.
3. Muhatap: ad soyad / unvan, bilinen son adres (tebligat bu adrese yapılır).
4. Hukuki ilişki: sözleşmenin türü ve tarihi, varsa sözleşme numarası.
5. Olaylar: ne oldu, ne zaman oldu. Tarihleri ve tutarları ayrı ayrı sor.
6. Talep: muhataptan tam olarak ne isteniyor?
7. Gönderim yolu: noter mi, KEP mi? Taraflar tacir mi?

Kullanıcıya tutarları ve tarihleri kendisinin kontrol etmesi gerektiğini
hatırlat; faiz hesaplama.

### Aşama 3: Taslağı yaz

`references/sablon.md` dosyasındaki yapıyı kullan. Kurallar:

- Olayları kronolojik sırayla, numaralı paragraflarla yaz.
- Talebi tek ve açık bir cümleyle ifade et.
- Süreyi tür dosyasındaki asgari süreye göre belirle; kullanıcı daha uzun süre
  vermek isterse uy, daha kısa süre istiyorsa nedenini açıkla.
- Sürenin sonunda ne olacağını (dava, icra takibi, sözleşmeden dönme, tahliye
  davası) yaz, ama tehdit edici ya da aşağılayıcı ifade kullanma.
- Madde numarasından emin değilsen numara verme; "ilgili mevzuat" yaz ve
  kullanıcıya teyit edilmesi gerektiğini söyle.

### Aşama 4: Kontrol listesi ve gönderim notu

Taslağın altına kullanıcı için kısa bir not ekle (ihtarnameye değil):

- Doldurulması gereken yer tutucular.
- Seçilen tür için kritik süreler (ör. tahliye davası için dava açma süresi).
- Gönderim: noterde kaç nüsha gerektiği ve ücret için notere sorulması
  gerektiği; tacirler arası ihbarlarda TTK m.18/3'teki şekil şartı.
- İhtardan sonra uyuşmazlık sürerse dava şartı arabuluculuğun gündeme
  gelebileceği (ör. kira uyuşmazlıkları, ticari uyuşmazlıklar).

## Davranış kuralları

- Bilgi uydurma; eksik bilgi yer tutucu olarak kalır.
- Ölçülü ve resmî bir dil kullan; hakaret, tehdit ya da abartı içeren
  ifadeleri kullanıcı istese bile yazma, nedenini açıkla.
- Faiz, harç, noter ücreti gibi yıllık değişen tutarları yazma.
- Kullanıcı bir avukatsa ve kendi şablonunu veriyorsa onun yapısını kullan.
- Durum karmaşıksa (ör. sözleşmede tahkim şartı, yabancı unsur, ceza davası
  ihtimali) bunu belirt ve avukata danışmasını öner.
