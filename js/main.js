import {
  exterior,
  exterior2,
  exterior3,
  interior,
  room2,
  room3,
  door,
  exit,
  door2,
  exitRoom2,
  door3,
  exitRoom3,
  viewMessage1,
  viewMessage2,
  viewMessage3,
  messageBoard1,
  messageBoard2,
  messageBoard3,
  backFromBoard1,
  backFromBoard2,
  backFromBoard3,
  transitionScene,
} from "./scenes.js";

import { initMessageBoard } from "./messageBoard.js";

// transition settings

const TRANSITION = {
  duration: 800,
  ease: "ease-in-out",
};

// intro
const SITE_PASSWORD = "traderjoes";
const introScreen = document.getElementById("intro-screen");
const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("site-password");
const passwordButton = document.getElementById("password-submit");
const passwordError = document.getElementById("password-error");
const fadeOverlay = document.getElementById("fadeOverlay");

// start state
document.querySelectorAll(".scene, #instructions-btn, #about-btn")
  .forEach(el => (el.style.display = "none"));
passwordScreen.style.display = "none";
introScreen.classList.add("active");

// intro password
introScreen.addEventListener("click", () => {
  fadeOverlay.classList.add("fade-to-black");

  document.querySelectorAll(".scene, #instructions-btn, #about-btn")
    .forEach(el => (el.style.display = "none"));

  setTimeout(() => {
    introScreen.classList.remove("active");
    introScreen.style.display = "none";

    passwordScreen.style.display = "flex";
    requestAnimationFrame(() => (passwordScreen.style.opacity = 1));

    fadeOverlay.classList.remove("fade-to-black");
    fadeOverlay.classList.add("fade-from-black");
  }, TRANSITION.duration);

  setTimeout(() => fadeOverlay.classList.remove("fade-from-black"), TRANSITION.duration * 2);
});

// after password passes
function unlockSite() {
  fadeOverlay.classList.add("fade-to-black");

  setTimeout(() => (passwordScreen.style.opacity = 0), TRANSITION.duration / 2);

  setTimeout(() => {
    passwordScreen.style.display = "none";
    const exterior = document.getElementById("exterior");
    exterior.style.display = "block";
    exterior.classList.add("active");

    fadeOverlay.classList.remove("fade-to-black");
    fadeOverlay.classList.add("fade-from-black");
  }, TRANSITION.duration * 2);

  setTimeout(() => fadeOverlay.classList.remove("fade-from-black"), TRANSITION.duration * 3);
}

// checking password
passwordButton.addEventListener("click", () => {
  if (passwordInput.value === SITE_PASSWORD) {
    unlockSite();
  } else {
    passwordError.textContent = "Incorrect key. Try again.";
    passwordInput.value = "";
  }
});

passwordInput.addEventListener("keypress", e => {
  if (e.key === "Enter") passwordButton.click();
});

// navigating scene
const nextExterior = document.getElementById("nextExterior");
const prevExterior = document.getElementById("prevExterior");
const nextExterior2 = document.getElementById("nextExterior2");
const prevExterior3 = document.getElementById("prevExterior3");

if (nextExterior) nextExterior.addEventListener("click", () => transitionScene(exterior, exterior2));
if (prevExterior) prevExterior.addEventListener("click", () => transitionScene(exterior2, exterior));
if (nextExterior2) nextExterior2.addEventListener("click", () => transitionScene(exterior2, exterior3));
if (prevExterior3) prevExterior3.addEventListener("click", () => transitionScene(exterior3, exterior2));

// room 1
door.addEventListener("click", () => transitionScene(exterior, interior));
exit.addEventListener("click", () => transitionScene(interior, exterior));
viewMessage1.addEventListener("click", () => transitionScene(interior, messageBoard1));
backFromBoard1.addEventListener("click", () => transitionScene(messageBoard1, interior));

// room 2
door2.addEventListener("click", () => transitionScene(exterior2, room2));
exitRoom2.addEventListener("click", () => transitionScene(room2, exterior2));
viewMessage2.addEventListener("click", () => transitionScene(room2, messageBoard2));
backFromBoard2.addEventListener("click", () => transitionScene(messageBoard2, room2));

// room 3
door3.addEventListener("click", () => transitionScene(exterior3, room3));
exitRoom3.addEventListener("click", () => transitionScene(room3, exterior3));
viewMessage3.addEventListener("click", () => transitionScene(room3, messageBoard3));
backFromBoard3.addEventListener("click", () => transitionScene(messageBoard3, room3));

// message board
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

initMessageBoard({
  addBtnId: "addMessageBtn3",
  boardId: "message-board-3",
  sendBtnId: "sendBtn3",
  closeBtnId: "closeBtn3",
  nameInputId: "nameInput3",
  messageInputId: "messageInput3",
  containerId: "messages-container-3",
});

// fade-out clear
function fadeClearMessages(containerId, storageKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const messages = container.querySelectorAll(".message");
  messages.forEach(msg => {
    msg.style.transition = `opacity ${TRANSITION.duration / 2}ms ${TRANSITION.ease}`;
    msg.style.opacity = "0";
  });

  setTimeout(() => {
    container.innerHTML = "";
    localStorage.removeItem(storageKey);
  }, TRANSITION.duration / 2);
}

document.getElementById("clearBoard1")?.addEventListener("click", () =>
  fadeClearMessages("messages-container-1", "messages-container-1")
);
document.getElementById("clearBoard2")?.addEventListener("click", () =>
  fadeClearMessages("messages-container-2", "messages-container-2")
);
document.getElementById("clearBoard3")?.addEventListener("click", () =>
  fadeClearMessages("messages-container-3", "messages-container-3")
);

// bottom button overlays
const instructionBtn = document.getElementById("instructionBtn");
const instructionOverlay = document.getElementById("instructionOverlay");
const closeInstruction = document.getElementById("closeInstruction");

if (instructionBtn && instructionOverlay && closeInstruction) {
  instructionBtn.addEventListener("click", () => instructionOverlay.classList.add("active"));
  closeInstruction.addEventListener("click", () => instructionOverlay.classList.remove("active"));
  instructionOverlay.addEventListener("click", e => {
    if (e.target === instructionOverlay) instructionOverlay.classList.remove("active");
  });
}

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
