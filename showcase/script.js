function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const projectData = {
  "odin-recipes": {
    title: "Odin Recipes",
    description: "For this assignment, one has to build a simple recipe page. The page should display a list of recipes. When a user clicks on a recipe, the details of that recipe should be displayed.",
    image: "./images/odin-recipes.gif",
    liveUrl: "https://pastelprism.github.io/the-odin-project/odin-recipes/index-assignment",
    repoUrl: "https://github.com/PastelPrism/the-odin-project/tree/main/odin-recipes"
  },
  "landing-page": {
    title: "Landing Page",
    description: "A landing page for a fictional product or service, showcasing responsive design.",
    image: "./images/landing-page.gif",
    liveUrl: "https://pastelprism.github.io/the-odin-project/landing-page/extra-assignment/",
    repoUrl: "https://github.com/PastelPrism/the-odin-project/tree/main/landing-page"
  },
  "rock-paper-scissors": {
    title: "Rock‑Paper‑Scissors",
    description: "Here I got the assignment to build a retro font for the classic 'Rock, Paper, Scissors' game.",
    image: "./images/rock-paper-scissors.gif",
    liveUrl: "https://pastelprism.github.io/the-odin-project/rock-paper-scissors/extra/",
    repoUrl: "https://github.com/PastelPrism/the-odin-project/tree/main/rock-paper-scissors/extra"
  },
  "etch-a-sketch": {
    title: "Etch-a-Sketch",
    description: "A simple game with feel-good messages in the end",
    image: "./images/etch-a-sketch.gif",
    liveUrl: "https://pastelprism.github.io/the-odin-project/etch-a-sketch/extra/",
    repoUrl: "https://github.com/PastelPrism/the-odin-project/tree/main/etch-a-sketch/extra"
  },
  "calculator": {
    title: "Calculator",
    description: "For this assignment I had to create calculator with a cute front, featuring a pony.",
    image: "./images/calculator.gif",
    liveUrl: "https://pastelprism.github.io/the-odin-project/calculator/extra/",
    repoUrl: "https://github.com/PastelPrism/the-odin-project/tree/main/calculator/extra"
  }
};

function openModal(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;
  
  const modal = document.getElementById("project-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalLiveLink = document.getElementById("modal-live-link");
  const modalRepoLink = document.getElementById("modal-repo-link");
  
  modalImg.src = data.image;
  modalImg.alt = data.title;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description;
  modalLiveLink.href = data.liveUrl;
  modalRepoLink.href = data.repoUrl;
  
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("project-modal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

function highlightRandomCard() {
  const cards = Array.from(document.querySelectorAll(".card"));
  if (!cards.length) return;
  const chosen = pickRandom(cards);

  cards.forEach(c => c.classList.remove("glow"));
  chosen.classList.add("glow");

  const track = chosen.closest(".carousel-track");
  if (track) {
    const wrapper = track.parentElement;
    const cardLeft = chosen.offsetLeft;
    const cardWidth = chosen.offsetWidth;
    const wrapperWidth = wrapper.offsetWidth;
    const scrollTo = cardLeft - (wrapperWidth / 2) + (cardWidth / 2);
    wrapper.scrollTo({ left: scrollTo, behavior: "smooth" });
  }

}

const glowStyle = document.createElement("style");
glowStyle.textContent = `
  .card.glow {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.8), 0 16px 40px rgba(0,0,0,0.22);
    transform: translateY(-8px) scale(1.06);
  }
`;
document.head.appendChild(glowStyle);

function setupCarousel(carouselId) {
  const track = document.getElementById(carouselId);
  if (!track) return;
  
  const wrapper = track.parentElement;
  const prevBtn = document.querySelector(`.carousel-btn.prev[data-carousel="${carouselId}"]`);
  const nextBtn = document.querySelector(`.carousel-btn.next[data-carousel="${carouselId}"]`);
  
  if (!prevBtn || !nextBtn) return;
  
  const getScrollAmount = () => {
    const firstCard = track.querySelector(".card");
    return firstCard ? firstCard.getBoundingClientRect().width : wrapper.offsetWidth;
  };

  const scrollByAmount = (direction = 1) => {
    const amount = getScrollAmount();
    wrapper.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  prevBtn.addEventListener("click", () => scrollByAmount(-1));
  nextBtn.addEventListener("click", () => scrollByAmount(1));

  const autoScroll = () => {
    const amount = getScrollAmount();
    if (wrapper.scrollLeft + wrapper.offsetWidth >= track.scrollWidth - 10) {
      wrapper.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      wrapper.scrollBy({ left: amount, behavior: "smooth" });
    }
  };
  
  let autoScrollInterval = setInterval(autoScroll, 4000);

  wrapper.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
  wrapper.addEventListener("mouseleave", () => {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(autoScroll, 4000);
  });
}

function init() {
  const randomBtn = document.querySelector(".random-btn");
  if (randomBtn) {
    randomBtn.addEventListener("click", highlightRandomCard);
  }

  setupCarousel("originals");
  const cards = document.querySelectorAll(".card[data-project]");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const projectKey = card.getAttribute("data-project");
      openModal(projectKey);
    });
  });
  
  const modal = document.getElementById("project-modal");
  const modalClose = document.querySelector(".modal-close");
  const modalOverlay = document.querySelector(".modal-overlay");
  
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
