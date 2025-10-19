// js/scenes.js
export const exterior = document.getElementById("exterior");
export const exterior2 = document.getElementById("exterior2");
export const interior = document.getElementById("interior");
export const room2 = document.getElementById("room2");
export const exterior3 = document.getElementById("exterior3");
export const door3 = document.getElementById("door3");
export const room3 = document.getElementById("room3");
export const exitRoom3 = document.getElementById("exitRoom3");
export const viewMessage3 = document.getElementById("viewMessage3");
export const messageBoard3 = document.getElementById("messageBoard3");
export const backFromBoard3 = document.getElementById("backFromBoard3");


export const door = document.getElementById("door");
export const exit = document.getElementById("exit");
export const door2 = document.getElementById("door2");
export const exitRoom2 = document.getElementById("exitRoom2");

export const viewMessage1 = document.getElementById("viewMessage1");
export const viewMessage2 = document.getElementById("viewMessage2");

export const messageBoard1 = document.getElementById("messageBoard1");
export const messageBoard2 = document.getElementById("messageBoard2");

export const backFromBoard1 = document.getElementById("backFromBoard1");
export const backFromBoard2 = document.getElementById("backFromBoard2");

// Fade transition function
export function transitionScene(from, to) {
  if (!from || !to || from === to) return;

  // Prevent overlapping transitions
  if (from.classList.contains("is-transitioning")) return;
  from.classList.add("is-transitioning");

  // Make sure the target scene starts hidden
  to.style.display = "block";
  to.style.opacity = "0";
  to.classList.add("active");

  // Fade out current scene
  from.classList.add("fade-out");

  setTimeout(() => {
    // Fully hide the previous scene
    from.classList.remove("active", "fade-out");
    from.style.display = "none";
    from.style.opacity = "0";

    // Fade in new scene
    to.classList.add("fade-in");
    to.style.opacity = "1";

    setTimeout(() => {
      to.classList.remove("fade-in");
      from.classList.remove("is-transitioning");
    }, 700);
  }, 600);
}
