// ========== AI Soi Cầu Baccarat Thông Minh by Ngô Văn Tiến ==========

// Giả lập 100 bộ cầu mẫu (pattern phổ biến)
const patternSamples = [
  ['P','B','B','P','B'],
  ['B','B','P','P','P'],
  ['P','P','B','B','P'],
  ['B','P','P','B','B'],
  ['P','B','P','P','B'],
  ['P','P','P','B','B'],
  ['B','B','B','P','P'],
  ['P','B','B','P','P'],
  ['B','P','B','B','P'],
  ['P','P','B','P','B']
  // Có thể bổ sung thêm nếu cần
];

// Tính độ tương đồng giữa 2 mảng
function similarity(arr1, arr2) {
  let score = 0;
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    if (arr1[i] === arr2[i]) score++;
  }
  return score / Math.min(arr1.length, arr2.length);
}

// Dự đoán tay tiếp theo dựa vào mẫu
function predictNext(inputPattern) {
  if (inputPattern.length < 5) {
    return { result: 'Cần ít nhất 5 tay để dự đoán.', probability: '' };
  }

  const recent = inputPattern.slice(-5); // lấy 5 tay gần nhất
  const vote = { P: 0, B: 0 };

  for (const pattern of patternSamples) {
    const score = similarity(recent, pattern);
    const nextIndex = pattern.length;

    if (score > 0.6 && nextIndex < pattern.length + 1) {
      // Nếu giống > 60% thì lấy tay tiếp theo
      const next = pattern[5] || (Math.random() > 0.5 ? 'P' : 'B');
      vote[next]++;
    }
  }

  // Nếu không đủ mẫu, random nhẹ
  if (vote.P === 0 && vote.B === 0) {
    const random = Math.random() > 0.5 ? 'P' : 'B';
    return { result: random, probability: '50% - random' };
  }

  const total = vote.P + vote.B;
  const percentP = ((vote.P / total) * 100).toFixed(1);
  const percentB = ((vote.B / total) * 100).toFixed(1);
  const result = vote.P > vote.B ? 'P' : 'B';

  return {
    result: result,
    probability: `P: ${percentP}% – B: ${percentB}%`
  };
}

// ========== DOM TƯƠNG TÁC ==========

document.getElementById("predictBtn").addEventListener("click", () => {
  const input = document.getElementById("inputPattern").value.trim().toUpperCase();
  const pattern = input.split("").filter(c => c === "P" || c === "B");

  const prediction = predictNext(pattern);

  document.getElementById("predictionResult").innerHTML = `
    <div style="font-size: 24px; color: yellow; font-weight: bold;">
      Dự đoán: ${prediction.result}
    </div>
    <div style="color: white;">${prediction.probability}</div>
  `;
});
