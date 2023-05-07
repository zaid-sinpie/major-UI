const anxietyFormElement = document.querySelector(".anxiety-form");
const depressionFormElement = document.querySelector(".depression-form");
const stressFormElement = document.querySelector(".stress-form");

let anxietyScore = -1;
let depressionScore = -1;
let stressScore = -1;

const countPositives = (formElement) => {
  let i = 1;
  let count = 0;
  while (formElement.elements[`question${i}`]) {
    if (formElement.elements[`question${i}`].value === "Yes") count++;
    i++;
  }
  return count;
};

const sendScores = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/student/score");
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
  anxietyScore = -1;
  depressionScore = -1;
  stressScore = -1;
};

anxietyFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(countPositives(anxietyFormElement));
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.assign("../pages/login.html");
    return;
  }

  anxietyScore = countPositives(anxietyFormElement);

  // redirect to next quiz
  if (depressionScore === -1)
    window.location.assign("../pages/depressionQuiz.html");
  if (stressScore === -1) window.location.assign("../pages/stressQuiz.html");
  sendScores();
});

stressFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.assign("../pages/login.html");
    return;
  }
  stressScore = countPositives(stressFormElement);

  if (depressionScore === -1)
    window.location.assign("../pages/depressionQuiz.html");
  if (anxietyScore === -1) window.location.assign("../pages/anxietyQuiz.html");
  sendScores();
});
depressionFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.assign("../pages/login.html");
    return;
  }
  depressionScore = countPositives(depressionFormElement);

  if (stressScore === -1) window.location.assign("../pages/stressQuiz.html");
  if (anxietyScore === -1) window.location.assign("../pages/anxietyQuiz.html");
  sendScores();
});
