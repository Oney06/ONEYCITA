const openButton = document.getElementById("openLetter");
const backButton = document.getElementById("backButton");
const intro = document.getElementById("intro");
const letterWrap = document.getElementById("letterWrap");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicStatus = document.getElementById("musicStatus");
const petalLayer = document.getElementById("petalLayer");

let petalTimer = null;

function updateMusicControl() {
  if (music.paused) {
    musicIcon.textContent = "♫";
    musicToggle.setAttribute("aria-label", "Reproducir música");
  } else {
    musicIcon.textContent = "Ⅱ";
    musicToggle.setAttribute("aria-label", "Pausar música");
  }
}

async function playMusic() {
  try {
    await music.play();
    musicStatus.textContent = "Reproduciendo tu melodía";
  } catch (error) {
    musicStatus.textContent = "Añade tu MP3 o pulsa el botón de música";
  }
  updateMusicControl();
}

openButton.addEventListener("click", async () => {
  intro.classList.add("is-hidden");
  letterWrap.classList.remove("is-hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  startPetals();
  await playMusic();
});

backButton.addEventListener("click", () => {
  letterWrap.classList.add("is-hidden");
  intro.classList.remove("is-hidden");
  stopPetals();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    await playMusic();
  } else {
    music.pause();
    musicStatus.textContent = "Música en pausa";
    updateMusicControl();
  }
});

music.addEventListener("play", updateMusicControl);
music.addEventListener("pause", updateMusicControl);
music.addEventListener("error", () => {
  musicStatus.textContent = "No se encontró el MP3. Revisa la carpeta audio";
  updateMusicControl();
});

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
  petal.style.animationDuration = `${6 + Math.random() * 6}s`;
  petal.style.opacity = `${0.35 + Math.random() * 0.5}`;
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;
  petalLayer.appendChild(petal);
  window.setTimeout(() => petal.remove(), 13000);
}

function startPetals() {
  if (petalTimer) return;
  for (let i = 0; i < 12; i++) {
    window.setTimeout(createPetal, i * 180);
  }
  petalTimer = window.setInterval(createPetal, 520);
}

function stopPetals() {
  if (petalTimer) {
    window.clearInterval(petalTimer);
    petalTimer = null;
  }
  petalLayer.innerHTML = "";
}
