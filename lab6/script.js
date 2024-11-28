let userDataBuffer = null;

document.getElementById("loadUsers").addEventListener("click", fetchUsers);
document.getElementById("downloadUsers").addEventListener("click", saveJson);
document
  .getElementById("customUsers")
  .addEventListener("click", loadCustomJson);

function fetchUsers() {
  fetch("https://randomuser.me/api/?results=5")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Помилка завантаження даних");
      }
      return response.json();
    })
    .then((data) => {
      userDataBuffer = data; // Зберігаємо дані у буфер
      displayUsers(data.results);
    })
    .catch((error) => {
      console.error("Помилка:", error);
      alert("Не вдалося завантажити дані");
    });
}

function displayUsers(users) {
  const container = document.getElementById("userContainer");
  container.innerHTML = ""; // Очищуємо попередній контент

  users.forEach((user) => {
    // Створення картки для користувача
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.innerHTML = `
                    <img src="${user.picture.large}" alt="Фото">
                    <h3>${user.name.first} ${user.name.last}</h3>
                    <p>Місто: ${user.location.city}</p>
                    <p>Email: ${user.email}</p>
                    <p>Телефон: ${user.phone}</p>
                `;

    container.appendChild(userCard);
  });
}

function saveJson() {
  if (!userDataBuffer) {
    alert("Дані ще не завантажені або не згенеровані.");
    return;
  }

  const jsonStr = JSON.stringify(userDataBuffer, null, 2); // Форматуємо JSON із відступами
  const blob = new Blob([jsonStr], { type: "application/json" }); // Створюємо об'єкт Blob
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob); // Генеруємо тимчасове посилання
  link.download = "users.json"; // Встановлюємо ім'я файлу
  link.click(); // Імітуємо натискання

  // Очищуємо ресурс
  URL.revokeObjectURL(link.href);
}

function loadCustomJson() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (Array.isArray(data)) {
            displayUsers(data); // Використовуємо дані з файлу
          } else if (data.results) {
            displayUsers(data.results); // Якщо JSON має формат results
          } else {
            alert("Файл не відповідає очікуваному формату");
          }
        } catch (error) {
          console.error("Помилка парсингу JSON:", error);
          alert("Не вдалося завантажити файл. Перевірте формат JSON.");
        }
      };
      reader.readAsText(file);
    }
  });
  input.click(); // Відкриваємо провідник
}
