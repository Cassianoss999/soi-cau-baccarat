function duDoan() {
  const input = document.getElementById("input").value.trim().toUpperCase();
  const result = document.getElementById("result");

  if (input.length !== 5 || /[^PB]/.test(input)) {
    result.textContent = "⚠️ Vui lòng nhập đúng 5 ký tự (P hoặc B)!";
    return;
  }

  const countP = (input.match(/P/g) || []).length;
  const countB = 5 - countP;

  let duDoanKetQua = "";
  for (let i = 0; i < 3; i++) {
    duDoanKetQua += countP > countB ? "P" : "B";
  }

  result.innerHTML = `<p>📈 Dự đoán 3 tay tiếp theo: <strong>${duDoanKetQua}</strong></p>`;
}
