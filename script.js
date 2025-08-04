document.addEventListener("DOMContentLoaded", function () {
  const storedName = localStorage.getItem("nguoiNhapDon");
  const nameInputField = document.querySelector('input[name="nguoi_nhap"]');
  const welcomeMessage = document.getElementById("welcomeMessage");
  const nguoiNhapContainer = document.getElementById("nguoiNhapContainer");
  const nameModal = document.getElementById("nameModal");
  const nameInput = document.getElementById("nameInput");
  const saveNameBtn = document.getElementById("saveNameBtn");

  if (storedName) {
    nameInputField.value = storedName;
    welcomeMessage.textContent = `👋 Xin chào, ${storedName}!`;
    welcomeMessage.classList.remove("hidden");
    nguoiNhapContainer.classList.add("hidden");
    nameModal.style.display = "none";
  } else {
    nameModal.style.display = "flex";
    saveNameBtn.addEventListener("click", function () {
      const userName = nameInput.value.trim();
      if (userName) {
        localStorage.setItem("nguoiNhapDon", userName);
        nameInputField.value = userName;
        welcomeMessage.textContent = `👋 Xin chào, ${userName}!`;
        welcomeMessage.classList.remove("hidden");
        nguoiNhapContainer.classList.add("hidden");
        nameModal.style.display = "none";
      } else {
        alert("Vui lòng nhập tên.");
      }
    });
  }

  const logoMap = {
    aaa: "data/AAA INSURANCE CORPORATION.jpg",
    aig: "data/AIG.png",
    baominh: "data/BAO MINH BEN THANH.jpg",
    baoviet: "data/BAOVIET.png",
    bic: "data/BIC.jpg",
    bsh: "data/BSH.jpg",
    cathay: "data/CATHAY.png",
    chubb: "data/CHUBB.jpg",
    dbv: "data/DBV.png",
    fubon: "data/FUBON.jpg",
    mic: "data/MIC.png",
    pjico: "data/PJICO.png",
    pti: "data/PTI.jpg",
    pvi: "data/PVI.png",
    qbe: "data/QBE.jpg",
    tokio: "data/TOKIO MARINE.jpg",
    uic: "data/UIC.png",
    vbi: "data/VBI.png"
  };

  const donViInput = document.getElementById("donViGuiInput");
  const logoContainer = document.getElementById("logoDonViContainer");
  const logoImg = document.getElementById("logoDonVi");

  donViInput.addEventListener("input", function () {
    const value = donViInput.value.trim().toLowerCase();
    const matchedKey = Object.keys(logoMap).find(key => value.includes(key));

    if (matchedKey) {
      logoImg.src = logoMap[matchedKey];
      logoImg.alt = `Logo ${matchedKey.toUpperCase()}`;
      logoContainer.classList.remove("hidden");
    } else {
      logoImg.src = "";
      logoContainer.classList.add("hidden");
    }
  });
});

document.getElementById("orderForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new URLSearchParams(new FormData(form));
  const messageBox = document.getElementById("message");
  messageBox.classList.add("hidden");

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxQ64C5LlIHyzQSJ3_i_pNKIhS_mJE9vdmGhNxatXUfignt647tWmCyFwffS4rKV4YI/exec", {
      method: "POST",
      body: data
    });

    const text = await response.text();
    messageBox.textContent = text;

    if (text.includes("✅")) {
      messageBox.className = "success";
      form.reset();
      const storedName = localStorage.getItem("nguoiNhapDon");
      if (storedName) {
        form.querySelector('input[name="nguoi_nhap"]').value = storedName;
      }
      document.getElementById("logoDonViContainer").classList.add("hidden");
      document.getElementById("logoDonVi").src = "";
    } else {
      messageBox.className = "error";
    }
  } catch (err) {
    console.error("Lỗi gửi dữ liệu:", err);
    messageBox.textContent = "❌ Không thể gửi. Vui lòng thử lại!";
    messageBox.className = "error";
  }

  messageBox.classList.remove("hidden");
});
