const stressFormElement = document.querySelector(".stress-form");

stressFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(depressionScore, anxietyScore, stressScore);
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.assign("/pages/login.html");
    return;
  }
  stressScore = countPositives(stressFormElement);
  localStorage.setItem("stressScore", stressScore);
  if (!("anxietyScore" in localStorage))
    return window.location.assign("/pages/anxietyQuiz.html");
  if (!("depressionScore" in localStorage))
    return window.location.assign("/pages/depressionquiz.html");
  sendScores();
});
