"use strict";

/*********************************************
 *  Main
 *********************************************/

const pixels = document.querySelectorAll(".pixel");
const colors = document.querySelectorAll(".two-color-container__div");
const tools = document.querySelectorAll(".tool-container__tool");

const selectedTool = document.querySelector(".selected__tool");
const switchTool = document.querySelector(".selected-color-tool__tool");
const selectedColorPrimary = document.querySelector(
  ".selected__color--primary"
);
const selectedColorSecondary = document.querySelector(
  ".selected__color--secondary"
);
const detailModalContainer = document.querySelector(".section-detail");
const detailModalCloseButton = document.querySelector(
  ".detail-container__container--close"
);

const supportModalContainer = document.querySelector(".section-support");
const supportModalCloseButton = document.querySelector(
  ".support-container__container--close"
);

const navTemplate = document.querySelector(".nav-main__li--template");
const navSupport = document.querySelector(".nav-main__li--support");
const templateOptionsContainer = document.querySelector(
  ".template-option-container"
);
const templateOptions = document.querySelectorAll(
  ".template-option-container__text"
);
const templates = document.querySelectorAll(".template-container");
const templateSizeEight = document.querySelector(".template-container__8");
const templateSizeSixteen = document.querySelector(".template-container__16");

let primaryColor = "#000";
let secondaryColor = "#fff";
let currentColor = primaryColor;
let currentTool = "";
let currentTemplate = "8";

navSupport.addEventListener("click", () => {
  supportModalContainer.classList.remove("hidden");
});

detailModalCloseButton.addEventListener("click", () => {
  detailModalContainer.classList.add("hidden");
});

supportModalCloseButton.addEventListener("click", () => {
  supportModalContainer.classList.add("hidden");
});

navTemplate.addEventListener("click", () => {
  templateOptionsContainer.classList.toggle("hidden");
});

templateOptions.forEach((template) => {
  template.addEventListener("click", () => {
    templateOptions.forEach((template) => {
      template.classList.remove("link-option");
    });
    template.classList.add("link-option");
    currentTemplate = String(Number.parseInt(template.textContent));

    if (currentTemplate == "8") {
      templates.forEach((template) => {
        template.classList.add("hidden");
      });

      templateSizeEight.classList.remove("hidden");
    }

    if (currentTemplate == "16") {
      templates.forEach((template) => {
        template.classList.add("hidden");
      });

      templateSizeSixteen.classList.remove("hidden");
    }
  });
});

switchTool.addEventListener("click", () => {
  let tempColor = primaryColor;
  primaryColor = secondaryColor;
  secondaryColor = tempColor;
  selectedColorPrimary.style.backgroundColor = primaryColor;
  selectedColorSecondary.style.backgroundColor = secondaryColor;
  currentColor = primaryColor;
});

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    tools.forEach((tool) =>
      tool.classList.remove("tool-container__tool--active")
    );
    tool.classList.add("tool-container__tool--active");
    currentTool = tool.dataset.tool;
    selectedTool.setAttribute("name", tool.getAttribute("name"));

    colors.forEach((color) => {
      color.addEventListener("click", () => {
        if (currentColor != color.dataset.color && currentTool === "color") {
          currentColor = color.dataset.color;
          secondaryColor = primaryColor;
          primaryColor = currentColor;
          selectedColorPrimary.style.backgroundColor = primaryColor;
          selectedColorSecondary.style.backgroundColor = secondaryColor;
        }
      });
    });

    pixels.forEach((pixel) => {
      pixel.addEventListener("click", () => {
        if (currentTool === "brush") pixel.style.backgroundColor = currentColor;
      });
    });

    pixels.forEach((pixel) => {
      pixel.addEventListener("click", () => {
        if (currentTool === "erase")
          pixel.style.backgroundColor = "transparent";
      });
    });
  });
});

/*********************************************
 *  EOF
 *********************************************/
