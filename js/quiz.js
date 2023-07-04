const type = window.localStorage.getItem("type");
if (type != "STUDENT") {
  
  if (type === "PARENT") openModal('Only students can access this page, you are logged in as Parent', () => window.location.assign("../pages/index_parent.html"));
  if (type === "DOCTOR") openModal('Only students can access this page, you are logged in as Doctor', () => window.location.assign("../pages/docProfile.html"));
  if (type === "TEACHER") openModal('Only students can access this page, you are logged in as Teacher', window.location.assign("../pages/index_teacher.html"));
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
    // localStorage.setItem('doctorsList', data.doctorsList)
    // doctorsList = data.doctorList;
    openModal(data.message, () => {})
    for (let index = 0; index < data.doctorList.length; index++) {
      const element = data.doctorList[index];
      console.log(element);
      localStorage.setItem(`doctor${index}`, element._id);
    }
    // displayProfiles();
    window.location.assign("/pages/doctorList.html");
  } catch (err) {
    console.log(err);
  }
};
