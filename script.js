// Tahmin güncelleme fonksiyonu
function updatePrediction() {
    const param1 = parseFloat(document.getElementById('param1').value);
    const param2 = parseFloat(document.getElementById('param2').value);
    const param3 = parseFloat(document.getElementById('param3').value);
    const param4 = parseFloat(document.getElementById('param4').value);
    
    // Değerleri güncelle
    document.getElementById('val1').textContent = param1 + ' mm';
    document.getElementById('val2').textContent = param2 + ' mm';
    document.getElementById('val3').textContent = param3 + ' °C';
    document.getElementById('val4').textContent = param4 + ' °C';
    
    // Gelişmiş tahmin modeli
    const baseYield = 180;
    const param2Effect = (param2 - 105) * 1.5;
    const param3Effect = (20 - param3) * 4.2;
    const param1Effect = (param1 - 82) * 1.1;
    const param4Effect = (27 - param4) * 2.3;
    
    let prediction = baseYield + param2Effect + param3Effect + param1Effect + param4Effect;
    prediction = Math.max(200, Math.min(400, prediction));
    prediction = Math.round(prediction);
    
    // Güven skoru hesapla
    const optimal2 = Math.abs(param2 - 105) < 25;
    const optimal3 = param3 >= 18 && param3 <= 22;
    let confidence = 80;
    
    if (optimal2) confidence += 6;
    if (optimal3) confidence += 5;
    if (param1 > 70 && param1 < 95) confidence += 4;
    if (param4 > 25 && param4 < 29) confidence += 4;
    
    confidence = Math.min(95, confidence);
    
    // Animasyonlu güncelleme
    const predictionEl = document.getElementById('mainPrediction');
    predictionEl.style.transform = 'scale(1.1)';
    predictionEl.textContent = prediction;
    
    setTimeout(() => {
        predictionEl.style.transform = 'scale(1)';
    }, 200);
    
    // Güven çemberini güncelle
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (confidence / 100) * circumference;
    document.querySelector('.confidence-fill').style.strokeDashoffset = offset;
    document.querySelector('.confidence-text').textContent = confidence + '%';
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('mainPrediction')) {
        updatePrediction();
        
        // Grafik simülasyonu
        const canvas = document.getElementById('trendChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.offsetWidth;
            canvas.height = 300;
            
            // Basit çizgi grafik çiz
            const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
            const actual = [275, 290, 268, 285, 295, 0];
            const predicted = [278, 288, 270, 287, 293, 312];
            
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            const width = canvas.width;
            const height = canvas.height;
            const padding = 40;
            const stepX = (width - 2 * padding) / (years.length - 1);
            
            // Gerçek değerler
            for (let i = 0; i < actual.length - 1; i++) {
                const x = padding + i * stepX;
                const y = height - padding - ((actual[i] - 200) / 200) * (height - 2 * padding);
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            
            // Tahmin değerleri
            ctx.strokeStyle = '#10b981';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            
            for (let i = 0; i < predicted.length; i++) {
                const x = padding + i * stepX;
                const y = height - padding - ((predicted[i] - 200) / 200) * (height - 2 * padding);
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            
            // Yıl etiketleri
            ctx.fillStyle = '#64748b';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            
            years.forEach((year, i) => {
                const x = padding + i * stepX;
                ctx.fillText(year, x, height - 10);
            });
        }
    }
    
    // Animasyonlar
    const cards = document.querySelectorAll('.stat-card, .panel');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// CSV Export fonksiyonu
function exportToCSV() {
    const data = [
        ['Yıl', 'Mart Yağış (mm)', 'Nisan Yağış (mm)', 'Mayıs Sıcaklık (°C)', 'Haziran Sıcaklık (°C)', 'Verim (kg/dekar)'],
        ['2025', '82', '105', '20.5', '27.2', 'Tahmin: 312'],
        ['2024', '78', '112', '19.8', '28.1', '295'],
        ['2023', '85', '98', '21.2', '26.8', '285'],
        ['2022', '72', '89', '22.5', '29.3', '268'],
        ['2021', '88', '118', '19.2', '26.5', '290'],
        ['2020', '75', '95', '20.8', '27.9', '275']
    ];
    
    let csvContent = data.map(row => row.join(',')).join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'batman_bugday_verisi_2020-2025.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// JSON veri indirme
function downloadSampleData() {
    const sampleData = {
        "proje": "AgriClimate AI - Batman İli Buğday Verimi Analizi",
        "donem": "2005-2025",
        "model": "Random Forest Regressor",
        "performans": {
            "r2_score": 0.913,
            "rmse": 16.2,
            "mae": 12.8
        },
        "veriler": [
            {
                "yil": 2025,
                "mart_yagis_mm": 82,
                "nisan_yagis_mm": 105,
                "mayis_sicaklik_c": 20.5,
                "haziran_sicaklik_c": 27.2,
                "verim_kg_dekar": "Tahmin: 312"
            },
            {
                "yil": 2024,
                "mart_yagis_mm": 78,
                "nisan_yagis_mm": 112,
                "mayis_sicaklik_c": 19.8,
                "haziran_sicaklik_c": 28.1,
                "verim_kg_dekar": 295
            },
            {
                "yil": 2023,
                "mart_yagis_mm": 85,
                "nisan_yagis_mm": 98,
                "mayis_sicaklik_c": 21.2,
                "haziran_sicaklik_c": 26.8,
                "verim_kg_dekar": 285
            }
        ],
        "faktor_onem": {
            "nisan_yagis": 0.94,
            "mayis_sicaklik": 0.87,
            "mart_yagis": 0.81,
            "haziran_sicaklik": 0.68
        }
    };
    
    const jsonStr = JSON.stringify(sampleData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'batman_bugday_verisi_ornek.json');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Model yeniden eğitme simülasyonu
function retrainModel() {
    const btn = event.target;
    const originalText = btn.textContent;
    
    btn.textContent = 'Eğitiliyor...';
    btn.disabled = true;
    btn.style.opacity = '0.6';
    
    setTimeout(() => {
        btn.textContent = 'Eğitim Tamamlandı ✓';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            alert('Model Eğitimi Tamamlandı!\n\nYeni Performans Metrikleri:\n• R² Score: 0.918 (+0.005)\n• RMSE: 15.8 kg/dekar\n• MAE: 12.3 kg/dekar\n\nModel başarıyla güncellendi.');
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.background = 'var(--primary)';
        }, 1500);
    }, 2000);
}
