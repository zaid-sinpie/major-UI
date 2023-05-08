const type = window.localStorage.getItem("type");
if (type != "STUDENT") {
  alert("Only students can access this page");
  if (type === "PARENT") window.location.assign("../pages/index_parent.html");
  if (type === "DOCTOR") window.location.assign("../pages/docProfile.html");
  if (type === "TEACHER") window.location.assign("../pages/index_teacher.html");
}

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
    const token = window.localStorage.getItem("token");
    const depressionScore = localStorage.getItem("depressionScore");
    const anxietyScore = localStorage.getItem("anxietyScore");
    const stressScore = localStorage.getItem("stressScore");
    const type = localStorage.getItem("type");

    const response = await fetch(
      `http://localhost:8000/api/student/score?token=${token}`,
      {
        method: "POST",
        body: JSON.stringify({
          token,
          depressionScore,
          anxietyScore,
          stressScore,
          type,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    
    localStorage.removeItem("stressScore");
    localStorage.removeItem("depressionScore");
    localStorage.removeItem("anxietyScore");
  } catch (err) {
    console.log(err);
  }
  window.location.assign("/pages/parterquizes.html");
};
