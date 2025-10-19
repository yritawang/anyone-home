// messageBoard.js
// Robust, per-board initializer with persistence and console diagnostics

export function initMessageBoard({
  addBtnId,
  boardId,
  sendBtnId,
  closeBtnId,
  nameInputId,
  messageInputId,
  containerId,
}) {
  // look up DOM nodes
  const addMessageBtn = document.getElementById(addBtnId);
  const messageBoard = document.getElementById(boardId);
  const sendBtn = document.getElementById(sendBtnId);
  const closeBtn = document.getElementById(closeBtnId);
  const nameInput = document.getElementById(nameInputId);
  const messageInput = document.getElementById(messageInputId);
  const container = document.getElementById(containerId);

  // diagnostic: log which IDs were requested
  console.group(`initMessageBoard: ${boardId}`);
  console.log({ addBtnId, boardId, sendBtnId, closeBtnId, nameInputId, messageInputId, containerId });
  console.log("Found elements:", {
    addMessageBtn: !!addMessageBtn,
    messageBoard: !!messageBoard,
    sendBtn: !!sendBtn,
    closeBtn: !!closeBtn,
    nameInput: !!nameInput,
    messageInput: !!messageInput,
    container: !!container,
  });

  // stop if any critical element missing
  if (!addMessageBtn || !messageBoard || !sendBtn || !closeBtn || !nameInput || !messageInput || !container) {
    console.warn(`initMessageBoard skipped for ${boardId} — missing element(s). Check IDs in HTML vs JS.`);
    console.groupEnd();
    return;
  }

  const storageKey = `messages_${boardId}`;

  // load saved messages (if any)
  const savedMessages = JSON.parse(localStorage.getItem(storageKey) || "[]");
  savedMessages.forEach(({ name, msg, left, top }) => {
    const note = document.createElement("div");
    note.classList.add("message");
    // keep the same HTML pattern you used
    note.innerHTML = `<p>${msg}</p><hr><strong>${name}</strong>`;
    note.style.left = left;
    note.style.top = top;
    container.appendChild(note);
  });

  // open overlay
  addMessageBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    messageBoard.classList.add("active");
    // focus with slight delay to ensure overlay is visible
    setTimeout(() => nameInput.focus(), 60);
  });

  // close overlay and clear
  closeBtn.addEventListener("click", () => {
    messageBoard.classList.remove("active");
    setTimeout(() => {
      nameInput.value = "";
      messageInput.value = "";
    }, 400);
  });

  // send button
  sendBtn.addEventListener("click", () => {
    const name = nameInput.value.trim() || "Anonymous";
    const msg = messageInput.value.trim();
    if (!msg) return;

    const left = `${Math.random() * 80 + 10}%`;
    const top = `${Math.random() * 70 + 10}%`;

    const note = document.createElement("div");
    note.classList.add("message");
    note.innerHTML = `<p>${msg}</p><hr><strong>${name}</strong>`;
    note.style.left = left;
    note.style.top = top;
    container.appendChild(note);

    // save
    savedMessages.push({ name, msg, left, top });
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedMessages));
    } catch (err) {
      console.warn("Could not save messages to localStorage:", err);
    }

    // reset & close
    messageBoard.classList.remove("active");
    setTimeout(() => {
      nameInput.value = "";
      messageInput.value = "";
    }, 400);
  });

  // ensure overlay starts closed
  messageBoard.classList.remove("active");
  nameInput.value = "";
  messageInput.value = "";

  console.log(`initMessageBoard completed for ${boardId}`);
  console.groupEnd();
}
