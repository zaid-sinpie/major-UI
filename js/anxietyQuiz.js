const anxietyFormElement = document.querySelector(".anxiety-form");
anxietyFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(depressionScore, anxietyScore, stressScore);
  console.log(countPositives(anxietyFormElement));
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.assign("../pages/login.html");
    return;
  }

  anxietyScore = countPositives(anxietyFormElement);
  window.localStorage.setItem("anxietyScore", anxietyScore);
  // redirect to next quiz
  if (!("depressionScore" in localStorage))
    return window.location.assign("/pages/depressionquiz.html");
  if (!("stressScore" in localStorage))
    return window.location.assign("/pages/stressQuiz.html");
  sendScores();
});
