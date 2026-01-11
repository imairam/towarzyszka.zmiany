const toggleButton = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const icon = toggleButton.querySelector("i");

toggleButton.addEventListener("click", () => {
    menu.classList.toggle("show");

    if (menu.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
        toggleButton.setAttribute("aria-label", "Close");
        icon.style.color = "rgba(216, 27, 96, 1)";
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        toggleButton.setAttribute("aria-label", "Menu");
        icon.style.color = "";
    }
});

const menuLinks = menu.querySelectorAll("a");

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("show");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        toggleButton.setAttribute("aria-label", "Menu");
        icon.style.color = "";
    });
});


document.addEventListener("click", (event) => {
    if (
        !menu.contains(event.target) &&
        !toggleButton.contains(event.target)
    ) {
        if (menu.classList.contains("show")) {
        menu.classList.remove("show");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        toggleButton.setAttribute("aria-label", "Menu");
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  const dotsContainer = document.getElementById('dots');

  let currentIndex = 0;

  items.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.querySelectorAll('span'));

  function updateCarousel() {
    const total = items.length;

    items.forEach((item, idx) => {
      const diff = idx - currentIndex;

      item.style.opacity = "0";
      item.style.zIndex = "0";
      item.style.transform = "scale(0.8) translateX(0px)";

      if (diff === 0) {
        item.style.opacity = "1";
        item.style.zIndex = "3";
        item.style.transform = "scale(1.2) translateX(0px)";
      } else if (diff === -1 || diff === total - 1) {
        item.style.opacity = "1";
        item.style.zIndex = "2";
        item.style.transform = "scale(1) translateX(-260px)";
      } else if (diff === 1 || diff === -(total - 1)) {
        item.style.opacity = "1";
        item.style.zIndex = "2";
        item.style.transform = "scale(1) translateX(260px)";
      }
    });

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index, 10);
      updateCarousel();
    });
  });

  updateCarousel();
});

function toggleBox(btn) {
  const box = btn.parentElement;
  const preview = box.querySelector(".content-preview");
  const full = box.querySelector(".content-full");

  if (btn.dataset.expanded === "true") {
    full.style.maxHeight = "0px";
    preview.style.maxHeight = "120px";
    btn.innerText = "See more";
    btn.dataset.expanded = "false";
  } else {
    preview.style.maxHeight = "0px";
    full.style.maxHeight = full.scrollHeight + "px";
    btn.innerText = "See less";
    btn.dataset.expanded = "true";
  }
}
