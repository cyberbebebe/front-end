// Завдання 1
document
  .getElementById("dataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Очищення попередніх повідомлень про помилки
    const errorContainer = document.getElementById("errors");
    errorContainer.innerHTML = "";
    errorContainer.style.display = "none";

    // Отримання значень
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const faculty = document.getElementById("faculty").value.trim();
    const birthdate = document.getElementById("birthdate").value.trim();
    const address = document.getElementById("address").value.trim();

    // Регулярні вирази
    const nameRegex =
      /^([А-ЯІЇЄҐа-яіїєґ]|[A-Za-z])+\s([А-ЯІЇЄҐA-Z])\.\s?([А-ЯІЇЄҐA-Z])\.$/; // Прізвище І.Б.
    const phoneRegex = /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/; // (123)-456-78-90
    const facultyRegex = /^[А-ЯІЇЄҐа-яіїєґA-Za-z\s]{2,}$/; // ФІОТ
    const birthdateRegex = /^\d{2}\.\d{2}\.\d{4}$/; // ДД.ММ.РРРР
    const addressRegex = /^м\.\s[А-ЯІЇЄҐа-яіїєґA-Za-z\s]+$/; // м. Місто

    // Перевірка
    let valid = true;
    const fields = [
      {
        regex: nameRegex,
        value: name,
        field: "name",
        error: "Неправильний формат ПІБ. Приклад: Прізвище І.Б.",
      },
      {
        regex: phoneRegex,
        value: phone,
        field: "phone",
        error: "Неправильний формат телефону. Приклад: (123)-456-78-90",
      },
      {
        regex: facultyRegex,
        value: faculty,
        field: "faculty",
        error: "Неправильний формат факультету. Приклад: ФІОТ",
      },
      {
        regex: birthdateRegex,
        value: birthdate,
        field: "birthdate",
        error: "Неправильний формат дати народження. Приклад: 20.10.2010",
      },
      {
        regex: addressRegex,
        value: address,
        field: "address",
        error: "Неправильний формат адреси. Приклад: м. Київ",
      },
    ];

    let errorMessages = [];

    fields.forEach(({ regex, value, field, error }) => {
      const input = document.getElementById(field);
      if (!regex.test(value)) {
        input.style.borderColor = "red";
        valid = false;
        errorMessages.push(error);
      } else {
        input.style.borderColor = "#ccc";
      }
    });

    // Результат
    if (valid) {
      document.getElementById("outputData").innerText = `ПІБ: ${name}
            Телефон: ${phone}
            Факультет: ${faculty}
            Дата народження: ${birthdate}
            Адреса: ${address}`;

      document.getElementById("output").style.display = "block";
    } else {
      // Сховати блок з правильними даними
      document.getElementById("output").style.display = "none";

      // Очистити попередні повідомлення про помилки
      errorContainer.innerHTML = "";

      // Вивід повідомлень про помилки
      errorMessages.forEach((msg) => {
        const errorItem = document.createElement("p");
        errorItem.textContent = msg;
        errorItem.style.color = "red";
        errorContainer.appendChild(errorItem);
      });
      errorContainer.style.display = "block";
    }
  });

//Завдання 2
//Варіант

const VARIANT_NUMBER = 6;

// Таблиця
const table = document.getElementById("interactiveTable");
const rows = 6;
const cols = 6;
let count = 1;

// Генерація таблиці
for (let i = 0; i < rows; i++) {
  const row = document.createElement("tr");
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement("td");
    cell.textContent = count;
    cell.dataset.number = count; // Для зручності зберігаємо номер
    row.appendChild(cell);
    count++;
  }
  table.appendChild(row);
}

// Генерація випадкового кольору
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Вибраний користувачем колір
let selectedColor = "#FF0000";
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("change", (event) => {
  selectedColor = event.target.value;
});

// Події для клітинок
table.addEventListener("mouseover", (event) => {
  const cell = event.target;
  if (cell.tagName === "TD" && +cell.dataset.number === VARIANT_NUMBER) {
    cell.style.backgroundColor = getRandomColor();
  }
});

table.addEventListener("click", (event) => {
  const cell = event.target;
  if (cell.tagName === "TD" && +cell.dataset.number === VARIANT_NUMBER) {
    cell.style.backgroundColor = selectedColor;
  }
});

table.addEventListener("dblclick", (event) => {
  const cell = event.target;
  if (cell.tagName === "TD") {
    const rowIndex = cell.parentElement.rowIndex; // Індекс рядка
    const colIndex = cell.cellIndex; // Індекс колонки

    // Прямокутник: всі клітинки, починаючи з вибраної
    for (let i = rowIndex; i < rows; i++) {
      for (let j = colIndex; j < cols; j++) {
        const targetCell = table.rows[i].cells[j];
        targetCell.style.backgroundColor = selectedColor; // Вибраний колір
      }
    }
  }
});
