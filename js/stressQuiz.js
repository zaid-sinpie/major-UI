const stressFormElement = document.querySelector(".stress-form");

if (!("anxietyScore" in localStorage)) {
  openModal("Please attempt anxiety quiz and then come back", () =>
    window.location.assign("/pages/anxietyQuiz.html")
  );
}

if (!("depressionScore" in localStorage)) {
  openModal("Please attempt depression quiz and then come back", () =>
    window.location.assign("/pages/depressionQuiz.html")
  );
}

stressFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(depressionScore, anxietyScore, stressScore);
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.assign("/pages/login.html");
    return;
  }
  stressScore = countPositives(stressFormElement);
  localStorage.setItem("stressScore", stressScore);

  sendScores();
});
