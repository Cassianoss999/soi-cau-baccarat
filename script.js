// ✨ AI SOI CẦU THÔNG MINH CHUẨN NEON - NGÔ VĂN TIẾN ✨
// Cập nhật 2025 - tối ưu cho mobile & desktop, chuẩn xác và dễ mở rộng

function generateFakePatterns() {
    // 10 mẫu cầu phổ biến, có thể mở rộng về sau
    const basePatterns = [
        "PBPBPBPBPB", "PPPPBB", "PBBPBBPP", "BBPPBB", "PPBPBP",
        "BBBBPPP", "BPPBPP", "PBBPPB", "PBPBPPBB", "PBPBPBPPB"
    ];
    
    // Tạo thêm 100 mẫu từ tổ hợp ngẫu nhiên
    let patterns = [];
    for (let i = 0; i < 10; i++) {
        basePatterns.forEach(p => {
            const mix = p + basePatterns[Math.floor(Math.random() * basePatterns.length)];
            patterns.push(mix);
        });
    }
    return patterns;
}

function predictNextHands(input, numPredictions = 3) {
    const patterns = generateFakePatterns();
    const cleaned = input.toUpperCase().replace(/[^PB]/g, '');
    const results = [];

    for (let i = 0; i < numPredictions; i++) {
        let score = { P: 0, B: 0 };

        patterns.forEach(pattern => {
            for (let j = 0; j <= pattern.length - cleaned.length; j++) {
                const match = pattern.slice(j, j + cleaned.length);
                if (match === cleaned) {
                    const nextChar = pattern[j + cleaned.length];
                    if (nextChar === 'P') score.P++;
                    else if (nextChar === 'B') score.B++;
                }
            }
        });

        const total = score.P + score.B;
        let probP = total ? Math.round((score.P / total) * 100) : 50;
        let probB = total ? Math.round((score.B / total) * 100) : 50;

        const next = probP >= probB ? 'P' : 'B';
        results.push({ next, probP, probB });

        input += next; // Nối tay vừa dự đoán vào chuỗi để dự đoán tiếp
    }

    return results;
}

document.getElementById("predictBtn").addEventListener("click", () => {
    const input = document.getElementById("inputPattern").value;
    const output = document.getElementById("predictionOutput");

    if (input.length < 5) {
        output.innerHTML = `<span style="color: orange;">⛔ Vui lòng nhập ít nhất 5 tay cầu để dự đoán!</span>`;
        return;
    }

    const predictions = predictNextHands(input, 3);
    let html = `<h3>✨ Dự đoán 3 tay tiếp theo:</h3><ul style="font-size: 18px;">`;

    predictions.forEach((res, idx) => {
        const color = res.next === 'P' ? '#00f0ff' : '#ff3c3c';
        html += `<li style="margin-bottom: 6px;">
            Tay ${idx + 1}: <b style="color: ${color}; font-size: 22px">${res.next}</b>
            (P: ${res.probP}% | B: ${res.probB}%)
        </li>`;
    });

    html += `</ul><p style="color:#aaa;font-size:14px;">© 2025 Ngô Văn Tiến – Web soi cầu AI chuẩn neon</p>`;
    output.innerHTML = html;
});
