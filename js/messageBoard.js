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

  console.group(`initMessageBoard: ${boardId}`);
  console.log({
    addBtnId,
    boardId,
    sendBtnId,
    closeBtnId,
    nameInputId,
    messageInputId,
    containerId,
  });
  console.log("Found elements:", {
    addMessageBtn: !!addMessageBtn,
    messageBoard: !!messageBoard,
    sendBtn: !!sendBtn,
    closeBtn: !!closeBtn,
    nameInput: !!nameInput,
    messageInput: !!messageInput,
    container: !!container,
  });

  // stop if missing something important
  if (
    !addMessageBtn ||
    !messageBoard ||
    !sendBtn ||
    !closeBtn ||
    !nameInput ||
    !messageInput ||
    !container
  ) {
    console.warn(
      `initMessageBoard skipped for ${boardId} — missing element(s). Check IDs.`
    );
    console.groupEnd();
    return;
  }

  const storageKey = `messages_${boardId}`;
  const savedMessages = JSON.parse(localStorage.getItem(storageKey) || "[]");

  // make message moveable
  function makeDraggable(el, savePosition) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    el.addEventListener("mousedown", (e) => {
      isDragging = true;
      el.style.zIndex = 1000; 
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        el.style.zIndex = 20;
        if (typeof savePosition === "function") {
          savePosition(el.style.left, el.style.top);
        }
      }
    });

    // touch support (mobile)
    el.addEventListener("touchstart", (e) => {
      isDragging = true;
      const touch = e.touches[0];
      offsetX = touch.clientX - el.offsetLeft;
      offsetY = touch.clientY - el.offsetTop;
    });

    document.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const x = touch.clientX - offsetX;
      const y = touch.clientY - offsetY;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });

    document.addEventListener("touchend", () => {
      if (isDragging) {
        isDragging = false;
        if (typeof savePosition === "function") {
          savePosition(el.style.left, el.style.top);
        }
      }
    });
  }

  // load saved messages
  savedMessages.forEach(({ name, msg, left, top }) => {
    const note = document.createElement("div");
    note.classList.add("message");
    note.innerHTML = `<p>${msg}</p><hr><strong>${name}</strong>`;
    note.style.left = left;
    note.style.top = top;
    container.appendChild(note);

    makeDraggable(note, (newLeft, newTop) => {
      const index = savedMessages.findIndex(
        (m) => m.name === name && m.msg === msg
      );
      if (index > -1) {
        savedMessages[index].left = newLeft;
        savedMessages[index].top = newTop;
        localStorage.setItem(storageKey, JSON.stringify(savedMessages));
      }
    });
  });

  // open overlay
  addMessageBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    messageBoard.classList.add("active");
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

    // randomize position
    const left = `${Math.random() * 80 + 10}%`;
    const top = `${Math.random() * 70 + 10}%`;

    const note = document.createElement("div");
    note.classList.add("message");
    note.innerHTML = `<p>${msg}</p><hr><strong>${name}</strong>`;
    note.style.left = left;
    note.style.top = top;
    container.appendChild(note);

    makeDraggable(note, (newLeft, newTop) => {
      const index = savedMessages.findIndex(
        (m) => m.name === name && m.msg === msg
      );
      if (index > -1) {
        savedMessages[index].left = newLeft;
        savedMessages[index].top = newTop;
        localStorage.setItem(storageKey, JSON.stringify(savedMessages));
      }
    });

    // save message
    savedMessages.push({ name, msg, left, top });
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedMessages));
    } catch (err) {
      console.warn("Could not save messages to localStorage:", err);
    }

    // reset & close overlay
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
