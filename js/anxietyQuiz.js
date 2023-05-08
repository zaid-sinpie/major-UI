const anxietyFormElement = document.querySelector(".anxiety-form");
anxietyFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(depressionScore, anxietyScore, stressScore);
  console.log(countPositives(anxietyFormElement));
  const token = window.localStorage.getItem("token");
  if (!token) {
    return window.location.assign("../pages/login.html");
  }

  anxietyScore = countPositives(anxietyFormElement);
  

  window.location.assign("/pages/depressionquiz.html");
});
