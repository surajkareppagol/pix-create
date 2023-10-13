"use strict";

/*********************************************
 *  Navigation
 *********************************************/

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

/*********************************************
 *  Tool Bar
 *********************************************/

const tools = document.querySelectorAll(".tool-container__tool");

/*********************************************
 *  Middle Bar
 *********************************************/

const templates = document.querySelectorAll(".template-container");
const templateSizeEight = document.querySelector(".template-container__8");
const templateSizeSixteen = document.querySelector(".template-container__16");

/*********************************************
 *  Insert Pixel Boxes
 *********************************************/

for (let i = 0; i < 64; i++) {
  const pixelElement = document.createElement("div");
  pixelElement.innerHTML = "&nbsp;";
  pixelElement.classList.add("pixel");
  pixelElement.classList.add("pixel__8");

  templateSizeEight.append(pixelElement);
}

for (let i = 0; i < 256; i++) {
  const pixelElement = document.createElement("div");
  pixelElement.innerHTML = "&nbsp;";
  pixelElement.classList.add("pixel");
  pixelElement.classList.add("pixel__16");

  templateSizeSixteen.append(pixelElement);
}

const pixels = document.querySelectorAll(".pixel");

/*********************************************
 *  Side Bar
 *********************************************/

const colors = document.querySelectorAll(".two-color-container__div");
const selectedTool = document.querySelector(".selected__tool");
const switchColorTool = document.querySelector(".selected-color-tool__tool");
const selectedColorPrimary = document.querySelector(
  ".selected__color--primary"
);
const selectedColorSecondary = document.querySelector(
  ".selected__color--secondary"
);

/*********************************************
 *  Variables
 *********************************************/

let primaryColor = "#000";
let secondaryColor = "#fff";
let currentColor = primaryColor;
let currentTool = "";
let currentTemplate = "8";
let selectedPixels = [];

/*********************************************
 *  Modals
 *********************************************/

navSupport.addEventListener("click", () => {
  supportModalContainer.classList.remove("hidden");
});

detailModalCloseButton.addEventListener("click", () => {
  detailModalContainer.classList.add("hidden");
});

navTemplate.addEventListener("click", () => {
  templateOptionsContainer.classList.toggle("hidden");
});

supportModalCloseButton.addEventListener("click", () => {
  supportModalContainer.classList.add("hidden");
});

/*********************************************
 *  Select Template
 *********************************************/

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

/*********************************************
 *  Switch Color
 *********************************************/

switchColorTool.addEventListener("click", () => {
  let tempColor = primaryColor;
  primaryColor = secondaryColor;
  secondaryColor = tempColor;
  selectedColorPrimary.style.backgroundColor = primaryColor;
  selectedColorSecondary.style.backgroundColor = secondaryColor;
  currentColor = primaryColor;
});

/*********************************************
 *  Select Tool
 *********************************************/

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    tools.forEach((tool) =>
      tool.classList.remove("tool-container__tool--active")
    );
    tool.classList.add("tool-container__tool--active");
    currentTool = tool.dataset.tool;
    selectedTool.setAttribute("name", tool.getAttribute("name"));
    selectedTool.setAttribute("title", tool.getAttribute("title"));

    selectedPixels.forEach((pixel) => {
      pixel.style.border = "1px solid #000";
    });
    selectedPixels = [];
  });
});

/*********************************************
 *  Select Color
 *********************************************/

colors.forEach((color) => {
  color.addEventListener("click", () => {
    if (
      currentColor != color.dataset.color &&
      (currentTool === "color" || currentTool === "hover")
    ) {
      currentColor = color.dataset.color;
      secondaryColor = primaryColor;
      primaryColor = currentColor;
      selectedColorPrimary.style.backgroundColor = primaryColor;
      selectedColorSecondary.style.backgroundColor = secondaryColor;
    }

    if (currentTool === "multi") {
      selectedPixels.forEach((pixel) => {
        pixel.style.backgroundColor = color.dataset.color;
        pixel.style.border = "0.01px solid #000";
      });

      selectedPixels = [];
    }
  });
});

/*********************************************
 *  Select Pixel
 *********************************************/

templates.forEach((template) =>
  template.addEventListener("click", (event) => {
    if (event.target.classList.value.includes("pixel")) {
      const pixel = event.target;
      if (currentTool === "brush") pixel.style.backgroundColor = currentColor;
      if (currentTool === "erase") pixel.style.backgroundColor = "transparent";
      if (currentTool === "multi") {
        selectedPixels.push(pixel);
        pixel.style.border = "2px solid #0000ff";
      }
    }
  })
);

templates.forEach((template) =>
  template.addEventListener("mouseover", (event) => {
    if (
      currentTool === "hover" &&
      event.target.classList.value.includes("pixel")
    ) {
      event.target.style.backgroundColor = currentColor;
    }
  })
);

/*********************************************
 *  EOF
 *********************************************/
