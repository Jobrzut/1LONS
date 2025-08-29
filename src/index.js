const content = document.querySelector(".content");

// Pobranie danych do zmiennej

let planLekcji;

fetch("../plan-lekcji.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        "Wystąpił błąd podczas pobierania pliku JSON: " + response.statusText
      );
    }
    return response.json();
  })
  .then((data) => {
    planLekcji = data;
    console.log(planLekcji);
    showAllClasses(planLekcji);
  })
  .catch((error) => {
    console.error("Nie udało się pobrać danych:", error);
  });

// Wyświetlanie przycisku dla każdej sali

function showAllClasses(plan) {
  content.innerHTML = "";
  const classroomButtonsDiv = document.createElement("div");
  classroomButtonsDiv.className = "classroom_buttons";
  for (const key in plan) {
    const classroomButton = document.createElement("button");
    classroomButton.textContent = key;
    classroomButton.addEventListener("click", () => {
      displayClassroomTimeTable(key, plan);
    });
    classroomButtonsDiv.appendChild(classroomButton);
  }
  content.appendChild(classroomButtonsDiv);
}

// Wyświetlanie pojedynczej

function displayClassroomTimeTable(classroom, plan) {
  content.innerHTML = "";

  const goBackButton = document.createElement("button");
  goBackButton.textContent = "Wróć";
  goBackButton.addEventListener("click", () => {
    showAllClasses(plan);
  });

  content.appendChild(goBackButton);

  const classroomsTimetable = plan[classroom];
  const lessonsByTime = {};

  classroomsTimetable.forEach((lekcja) => {
    if (!lessonsByTime[lekcja.dzien]) {
      lessonsByTime[lekcja.dzien] = {};
    }
    lessonsByTime[lekcja.dzien][lekcja.godzina] = lekcja.klasa;
  });

  const daysOrder = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];

  const daysOfWeek = Object.keys(lessonsByTime).sort((a, b) => {
    return daysOrder.indexOf(a) - daysOrder.indexOf(b);
  });

  const timeToMinutes = (timeString) => {
    const [startHour, startMinute] = timeString
      .split("-")[0]
      .trim()
      .split(":")
      .map(Number);
    return startHour * 60 + startMinute;
  };

  const uniqueHours = [
    ...new Set(classroomsTimetable.map((lekcja) => lekcja.godzina)),
  ].sort((a, b) => {
    return timeToMinutes(a) - timeToMinutes(b);
  });

  const table = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  headerRow.innerHTML =
    "<th>Godzina</th>" + daysOfWeek.map((day) => `<th>${day}</th>`).join("");
  tableHead.appendChild(headerRow);

  uniqueHours.forEach((hour) => {
    const row = document.createElement("tr");
    const hourCell = document.createElement("td");
    hourCell.textContent = hour;
    row.appendChild(hourCell);

    daysOfWeek.forEach((day) => {
      const cell = document.createElement("td");
      if (lessonsByTime[day] && lessonsByTime[day][hour]) {
        cell.textContent = lessonsByTime[day][hour];
      } else {
        cell.textContent = "";
      }
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });

  table.appendChild(tableHead);
  table.appendChild(tableBody);
  content.appendChild(table);
}
