const content = document.querySelector(".content");

// Pobranie danych do zmiennej

let planLekcji;

fetch('../plan-lekcji.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Wystąpił błąd podczas pobierania pliku JSON: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    planLekcji = data;
    console.log(planLekcji);
    showAllClasses(planLekcji);
  })
  .catch(error => {
    console.error('Nie udało się pobrać danych:', error);
  });

 // Wyświetlanie przycisku dla każdej sali 

 function showAllClasses(plan) {
    const classroomButtonsDiv = document.createElement("div");
    classroomButtonsDiv.className = "classroom_buttons";
    for (const key in plan) {
        const classroomButton = document.createElement("button");
        classroomButton.textContent = key;
        classroomButtonsDiv.appendChild(classroomButton);
    }
    content.appendChild(classroomButtonsDiv);
 }

 // Wyświetlanie pojedynczej tabeli

 content.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" ) {
        const selectedClassroom = e.target.textContent;
        
    }
 });