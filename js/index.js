"use strict";

const pixels = document.querySelectorAll(".pixel");
const colors = document.querySelectorAll(".two-color-container__div");
const tools = document.querySelectorAll(".tool-container__tool");

const modalContainer = document.querySelector(".section-detail");
const modalCloseButton = document.querySelector(
  ".detail-container__container--close"
);

let currentColor = "transparent";
let currentTool = "";

modalCloseButton.addEventListener("click", () => {
  modalContainer.classList.add("hidden");
});

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    tools.forEach((tool) =>
      tool.classList.remove("tool-container__tool--active")
    );
    tool.classList.add("tool-container__tool--active");
    currentTool = tool.dataset.tool;

    if (currentTool === "brush") {
      pixels.forEach((pixel) => {
        pixel.addEventListener("click", () => {
          pixel.style.backgroundColor = currentColor;
        });
      });
    } else if (currentTool === "color") {
      colors.forEach((color) => {
        color.addEventListener("click", () => {
          currentColor = color.dataset.color;
        });
      });
    } else if (currentTool === "erase") {
      pixels.forEach((pixel) => {
        pixel.addEventListener("click", () => {
          pixel.style.backgroundColor = "transparent";
        });
      });
    }
  });
});
