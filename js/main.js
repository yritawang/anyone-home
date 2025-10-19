import {
  exterior,
  exterior2,
  interior,
  room2,
  door,
  exit,
  door2,
  exitRoom2,
  viewMessage1,
  viewMessage2,
  messageBoard1,
  messageBoard2,
  backFromBoard1,
  backFromBoard2,
  transitionScene,
} from "./scenes.js";

import { initMessageBoard } from "./messageBoard.js";

// ===========================
// 🔒 PASSWORD GATE
// ===========================

const SITE_PASSWORD = "traderjoes";
const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("site-password");
const passwordButton = document.getElementById("password-submit");
const passwordError = document.getElementById("password-error");

// Cinematic fade overlay
const overlay = document.createElement("div");
overlay.classList.add("fade-overlay");
document.body.appendChild(overlay);

// Hide all scenes initially
document.querySelectorAll(".scene").forEach(scene => {
  scene.style.display = "none";
});
document.body.style.overflow = "hidden";

// === UNLOCK FUNCTION ===
function unlockSite() {
  passwordScreen.classList.add("fade-out");
  overlay.classList.add("fade-to-black");

  setTimeout(() => {
    // Hide password UI while black screen is up
    passwordScreen.style.display = "none";

    // Show exterior only (not all scenes yet)
    document.querySelectorAll(".scene").forEach(scene => {
      scene.style.display = "none";
    });
    exterior.style.display = "";
    exterior.classList.add("active");
    exterior.style.opacity = "1";

    // Fade from black after scene is ready
    overlay.classList.remove("fade-to-black");
    overlay.classList.add("fade-from-black");

    // Clean up overlay once done
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = "hidden";
    }, 1200);
  }, 800);
}

// === PASSWORD EVENTS ===
passwordButton.addEventListener("click", () => {
  if (passwordInput.value === SITE_PASSWORD) {
    unlockSite();
  } else {
    passwordError.textContent = "Incorrect password. Try again.";
    passwordInput.value = "";
  }
});

passwordInput.addEventListener("keypress", e => {
  if (e.key === "Enter") passwordButton.click();
});

// ===========================
// 🏠 SCENE NAVIGATION
// ===========================
const nextExterior = document.getElementById("nextExterior");
const prevExterior = document.getElementById("prevExterior");

nextExterior.addEventListener("click", () => transitionScene(exterior, exterior2));
prevExterior.addEventListener("click", () => transitionScene(exterior2, exterior));

// ROOM 1
door.addEventListener("click", () => transitionScene(exterior, interior));
exit.addEventListener("click", () => transitionScene(interior, exterior));
viewMessage1.addEventListener("click", () => transitionScene(interior, messageBoard1));
backFromBoard1.addEventListener("click", () => transitionScene(messageBoard1, interior));

// ROOM 2
door2.addEventListener("click", () => transitionScene(exterior2, room2));
exitRoom2.addEventListener("click", () => transitionScene(room2, exterior2));
viewMessage2.addEventListener("click", () => transitionScene(room2, messageBoard2));
backFromBoard2.addEventListener("click", () => transitionScene(messageBoard2, room2));

// ===========================
// 💬 MESSAGE BOARDS
// ===========================
initMessageBoard({
  addBtnId: "addMessageBtn1",
  boardId: "message-board-1",
  sendBtnId: "sendBtn1",
  closeBtnId: "closeBtn1",
  nameInputId: "nameInput1",
  messageInputId: "messageInput1",
  containerId: "messages-container-1",
});



initMessageBoard({
  addBtnId: "addMessageBtn2",
  boardId: "message-board-2",
  sendBtnId: "sendBtn2",
  closeBtnId: "closeBtn2",
  nameInputId: "nameInput2",
  messageInputId: "messageInput2",
  containerId: "messages-container-2",
});

// Smooth fade-out clear function
function fadeClearMessages(containerId, storageKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Add fade-out animation to all messages
  const messages = container.querySelectorAll(".message");
  messages.forEach(msg => {
    msg.style.transition = "opacity 0.5s ease";
    msg.style.opacity = "0";
  });

  // Wait for fade animation, then clear
  setTimeout(() => {
    container.innerHTML = "";
    localStorage.removeItem(storageKey);
  }, 500);
}

// Clear buttons with fade-out effect
document.getElementById("clearBoard1")?.addEventListener("click", () => {
  fadeClearMessages("messages-container-1", "messages-container-1");
});

document.getElementById("clearBoard2")?.addEventListener("click", () => {
  fadeClearMessages("messages-container-2", "messages-container-2");
});

// ===========================
// ℹ️ ABOUT OVERLAY
// ===========================
const aboutBtn = document.getElementById("aboutBtn");
const aboutOverlay = document.getElementById("aboutOverlay");
const closeAbout = document.getElementById("closeAbout");

if (aboutBtn && aboutOverlay && closeAbout) {
  aboutBtn.addEventListener("click", () => aboutOverlay.classList.add("active"));
  closeAbout.addEventListener("click", () => aboutOverlay.classList.remove("active"));
  aboutOverlay.addEventListener("click", e => {
    if (e.target === aboutOverlay) aboutOverlay.classList.remove("active");
  });
}
