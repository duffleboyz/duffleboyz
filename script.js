/* DUFFLEBOYZ demo site. This front-end password is not real security. */
const ACCESS_PASSWORD = "DUFFLEBOYZ";

const accessForm = document.getElementById("accessForm");
if (accessForm) {
  accessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const entered = document.getElementById("password").value.trim();
    const error = document.getElementById("error");
    if (entered.toUpperCase() === ACCESS_PASSWORD) {
      sessionStorage.setItem("duffleboyzAccess", "granted");
      location.href = "home.html";
    } else {
      error.textContent = "Wrong password. Check the demo password below.";
    }
  });
}

const isSitePage = /\/(home|archive|gallery|info)\.html$/.test(location.pathname);
if (isSitePage && sessionStorage.getItem("duffleboyzAccess") !== "granted") {
  location.replace("index.html");
}

document.querySelectorAll("#lockBtn").forEach(button => button.addEventListener("click", () => {
  sessionStorage.removeItem("duffleboyzAccess");
  location.href = "index.html";
}));

function publicImageUrl(path) {
  return new URL(path, location.href).href;
}
async function copyText(value, button) {
  try {
    await navigator.clipboard.writeText(value);
    if (button) {
      const old = button.textContent;
      button.textContent = "COPIED ✓";
      setTimeout(() => button.textContent = old, 1600);
    }
  } catch (err) {
    window.prompt("Copy this image link:", value);
  }
}
document.querySelectorAll(".copy-image").forEach(button => button.addEventListener("click", () => {
  copyText(publicImageUrl(button.dataset.image), button);
}));

const modal = document.getElementById("imageModal");
if (modal) {
  const modalImage = document.getElementById("modalImage");
  const modalCopy = document.getElementById("modalCopy");
  document.querySelectorAll(".image-open").forEach(button => button.addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = button.dataset.title;
    modalImage.src = button.dataset.image;
    modalImage.alt = button.dataset.title;
    modalCopy.dataset.image = button.dataset.image;
    document.getElementById("copyStatus").textContent = "";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }));
  document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });
  modalCopy.addEventListener("click", async () => {
    const value = publicImageUrl(modalCopy.dataset.image);
    try {
      await navigator.clipboard.writeText(value);
      document.getElementById("copyStatus").textContent = "Image link copied.";
    } catch (err) {
      window.prompt("Copy this image link:", value);
    }
  });
}
