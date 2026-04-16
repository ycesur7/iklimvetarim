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
