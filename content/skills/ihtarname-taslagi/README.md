# İhtarname Taslağı

**Türk hukukuna göre ihtarname taslağı hazırlayan açık kaynak bir AI skill'i.**
Kira borcu, alacak tahsili, ayıp ihbarı, sözleşmeden dönme ve kira
sözleşmesinin sona erdirilmesi gibi durumlarda gerekli bilgileri adım adım
sorar ve noterde ya da KEP ile gönderilmeye hazır bir taslak üretir.

> ⚠️ **Hukuki görüş değildir.** Çıktı bir taslaktır; göndermeden önce kontrol
> edin, gerekirse bir avukata danışın.

## Kapsadığı türler (v0.1)

| Tür | Dayanak |
|---|---|
| Kira bedelinin ödenmemesi (temerrüt ve fesih ihtarı) | TBK m.315 |
| İki haklı ihtar | TBK m.352/2 |
| Genel temerrüt ihtarı | TBK m.117, 120 |
| Sözleşmeden dönme için süre verme | TBK m.123–125 |
| Ayıp ihbarı | TBK m.223; TTK m.23 |
| Kira sözleşmesinin yenilenmemesi / feshi | TBK m.347–349 |

Ayrıntılar: [`references/ihtarname-turleri.md`](references/ihtarname-turleri.md)

## Kurulum

```bash
git clone https://github.com/skraptt/ihtarname-taslagi ~/.claude/skills/ihtarname-taslagi
```

Skill yükleyebilen diğer AI asistanlarında klasörü (ya da zip hâlini) yeni bir
skill olarak ekleyin. Sonra: *"Kiracım üç aydır kira ödemiyor, ihtarname
hazırlar mısın?"*

## Katkı

Yeni bir ihtarname türü önerirken şunları ekleyin: ne zaman kullanıldığı,
hukuki dayanak (kanun ve madde), metinde mutlaka bulunması gerekenler ve
süreler.

## Lisans

Apache-2.0
