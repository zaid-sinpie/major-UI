const depressionFormElement = document.querySelector(".depression-form");

if (!("anxietyScore" in localStorage)) {
  openModal('Please answer anxiety quiz first', () => window.location.assign('/pages/anxietyQuiz.html'))
}

depressionFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(depressionScore, anxietyScore, stressScore);
  const token = window.localStorage.getItem("token");

  if (!token) {
    return window.location.assign("/pages/login.html");
  }

  depressionScore = countPositives(depressionFormElement);
  localStorage.setItem("depressionScore", depressionScore);

  window.location.assign("/pages/stressQuiz.html");
});
