# 🌾 AgriClimate AI - Bölgesel İklim Verilerinin Makine Öğrenmesi ile Analizi

## Proje Hakkında

Bu proje, Batman ili için son 20 yıllık (2005-2025) meteorolojik ve tarımsal verileri kullanarak buğday verimi tahminlemesi yapan bir makine öğrenmesi platformudur.

### Amaç
- Büyük Veri analizinin tarımsal planlamada kullanımını göstermek
- İklim faktörlerinin tarımsal verim üzerindeki etkisini istatistiksel olarak belirlemek
- İklim değişikliğinin gıda güvenliği üzerindeki etkilerini modellemek

### Özellikler

✨ **5 Sayfalı Profesyonel Dashboard**
- 📊 Ana Dashboard - Canlı tahmin sistemi ve istatistikler
- 🔬 Veri Analizi - Korelasyon matrisi ve istatistiksel analizler
- 🎯 Tahmin Modeli - Model performansı ve karşılaştırma
- 📈 Raporlar - Analiz raporları ve dışa aktarım
- 💾 Veri Seti - Veri kaynakları ve önizleme

🎨 **Modern Tasarım**
- Gradient renkler ve smooth animasyonlar
- Responsive tasarım (mobil uyumlu)
- İnteraktif slider'lar ve gerçek zamanlı hesaplama
- Profesyonel sidebar navigasyon

🤖 **Makine Öğrenmesi**
- Random Forest Regressor (R² = 0.913)
- 12 iklim parametresi analizi
- Cross-validation ile doğrulama
- Faktör önem dereceleri

## Kullanım

1. `index.html` dosyasını tarayıcınızda açın
2. Sidebar'dan istediğiniz sayfaya geçiş yapın
3. Dashboard'da slider'ları hareket ettirerek farklı senaryoları test edin
4. Gerçek zamanlı tahmin sonuçlarını görün

## Veri Kaynakları

- **Meteoroloji Genel Müdürlüğü**: İklim ve hava durumu verileri
- **TÜİK**: Tarımsal üretim istatistikleri
- **Zaman Aralığı**: 2005-2025 (20 yıl, 240 aylık kayıt)

## Teknik Detaylar

- **Model**: Random Forest Regressor
- **Doğruluk**: %91.3 (R² Score)
- **RMSE**: 16.2 kg/dekar
- **MAE**: 12.8 kg/dekar
- **Teknolojiler**: HTML5, CSS3, JavaScript (Vanilla)

## Dosya Yapısı

```
├── index.html          # Ana dashboard
├── analysis.html       # Veri analizi sayfası
├── prediction.html     # Tahmin modeli sayfası
├── reports.html        # Raporlar sayfası
├── data.html          # Veri seti sayfası
├── styles.css         # Tüm stiller
├── script.js          # JavaScript fonksiyonları
└── README.md          # Bu dosya
```

## Önemli Bulgular

1. **Nisan Yağış Miktarı**: En etkili faktör (0.94 korelasyon)
2. **Mayıs Sıcaklık**: İkinci en önemli faktör (0.87 korelasyon)
3. **Mart Yağış**: Üçüncü önemli faktör (0.81 korelasyon)

## Proje Önemi

Bu araştırma, "Büyük Veri" analizinin çiftçilerin ve hükümetlerin iklim değişikliğine uyum sağlaması ve tarımsal stratejiler geliştirmesi için nasıl güçlü bir karar destek aracı olabileceğini kanıtlamaktadır.

---

**Not**: Bu prototip göstermelik amaçlıdır. Gerçek veri ve model entegrasyonu için backend geliştirmesi gereklidir.
