const depressionFormElement = document.querySelector(".depression-form");
depressionFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(depressionScore, anxietyScore, stressScore);
  const token = window.localStorage.getItem("token");

  if (!token) {
    return window.location.assign("/pages/login.html");
  }

  depressionScore = countPositives(depressionFormElement);
  localStorage.setItem("depressionScore", depressionScore);

  if (!("stressScore" in localStorage))
    return window.location.assign("/pages/stressQuiz.html");
  if (!("anxietyScore" in localStorage))
    return window.location.assign("/pages/anxietyQuiz.html");

  sendScores();
});
