let n = 6;
const targetIndex = (n % 10) + 1;

const elements = document.querySelectorAll("body *");

elements.forEach((element, index) => {
  element.addEventListener("click", function () {
    if (index === targetIndex) {
      const targetElement = document.getElementById(element.id);
      targetElement.classList.toggle("highlight");
    } else if (index === targetIndex + 1) {
      const targetElement = document.querySelector(`#${element.id}`);

      targetElement.classList.toggle("highlight-green");
    }
  });
});

const img = document.getElementById("odesa-img");

document.getElementById("add-img").addEventListener("click", function () {
  img.style.display = "block";
});

document.getElementById("increase-img").addEventListener("click", function () {
  img.width += 70;
});

document.getElementById("decrease-img").addEventListener("click", function () {
  if (img.width > 70) {
    img.width -= 70;
  }
});

document.getElementById("remove-img").addEventListener("click", function () {
  img.style.display = "none";
});
