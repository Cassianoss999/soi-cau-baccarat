// AI SOI CẦU THÔNG MINH - Ngô Văn Tiến
function predictNextHands(input, numPredictions = 3) {
    const patterns = generateFakePatterns(); // Giả lập mẫu cầu
    const cleaned = input.toUpperCase().replace(/[^PB]/g, '');
    const results = [];

    for (let i = 0; i < numPredictions; i++) {
        let scores = { P: 0, B: 0 };

        patterns.forEach(pattern => {
            for (let j = 0; j < pattern.length - cleaned.length; j++) {
                const slice = pattern.slice(j, j + cleaned.length);
                if (slice === cleaned) {
                    const nextChar = pattern[j + cleaned.length];
                    if (nextChar === 'P') scores.P++;
                    if (nextChar === 'B') scores.B++;
                }
            }
        });

        const total = scores.P + scores.B;
        let probP = Math.round((scores.P / total || 0) * 100);
        let probB = Math.round((scores.B / total || 0) * 100);

        let next = probP >= probB ? 'P' : 'B';
        results.push({
            next: next,
            probP: probP,
            probB: probB
        });

        input += next; // nối thêm để dự đoán tiếp tay kế
    }

    return results;
}

function generateFakePatterns() {
    const base = [
        "PBPBPBPBPB", "PPPPBB", "PBBPBBPP", "BBPPBB", "PPBPBP",
        "BBBBPPP", "BPPBPP", "PBBPPB", "PBPBPPBB", "PBPBPBPPB"
    ];

    // Nhân lên thành 100 mẫu giả
    let all = [];
    for (let i = 0; i < 10; i++) {
        all = all.concat(base.map(p => p + base[Math.floor(Math.random() * base.length)]));
    }
    return all;
}

// Nút Dự đoán
document.getElementById("predictBtn").addEventListener("click", () => {
    const input = document.getElementById("inputPattern").value;
    const output = document.getElementById("predictionOutput");
    const predictions = predictNextHands(input, 3);

    let html = `<h3>Dự đoán 3 tay tiếp theo:</h3><ul>`;
    predictions.forEach((res, idx) => {
        html += `<li>Tay ${idx + 1}: <b>${res.next}</b> (P: ${res.probP}% | B: ${res.probB}%)</li>`;
    });
    html += "</ul>";
    output.innerHTML = html;
});
