// script.js

function predict() {
  const input = document.getElementById("history").value.trim().toUpperCase();
  const resultDiv = document.getElementById("result");

  if (input.length < 5 || !/^[PB]+$/.test(input)) {
    resultDiv.innerHTML = "<p style='color:red'>Vui lòng nhập ít nhất 5 ký tự (P hoặc B).</p>";
    return;
  }

  const history = input.slice(-5);
  const prediction = generatePrediction(history);

  resultDiv.innerHTML = `<p>Dự đoán 3 tay tiếp theo: <strong>${prediction.join(' - ')}</strong></p>`;
}

function generatePrediction(history) {
  const patterns = {
    "PPP": "B",
    "BBB": "P",
    "PBP": "P",
    "BPB": "B",
    "PBB": "P",
    "BBP": "B",
    "BPP": "B",
    "PPB": "P",
  };

  const last3 = history.slice(-3);
  const prediction = [];

  for (let i = 0; i < 3; i++) {
    let next = patterns[last3] || (Math.random() < 0.6 ? last3[last3.length - 1] : (last3[last3.length - 1] === 'P' ? 'B' : 'P'));
    prediction.push(next);

    // Update last3 for next prediction
    last3 = last3.slice(1) + next;
  }

  return prediction;
}
