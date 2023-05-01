const teacherKeySpan = document.querySelector("#teacher-key");
const detailsDiv = document.querySelector(".details");
const TEACHER = "TEACHER";

const getTeacherDetails = async () => {
  const userId = window.localStorage.getItem("userId");
  const token = window.localStorage.getItem("token");
  const email = window.localStorage.getItem("email");
  const type = window.localStorage.getItem("type");
  if (!type || !userId || !email || !token)
    return window.location.assign("../pages/login.html");
  if (type != TEACHER) {
    alert("Only teachers can view this page");
    return window.location.assign("../index.html");
  }
  console.log(userId, token, email, type);
  try {
    const response = await fetch(
      `http://localhost:8000/api/teacher/detail?token=${token}`,
      {
        method: "POST",
        body: JSON.stringify({
          token,
          email,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.status != 200) return alert(data.message);
    console.log(data);
    for (let i = 0; i < data.teacher.students.length; i++) {
      const studentNode = document.createElement("p");
      const node = document.createTextNode(
        `Name: ${data.teacher.students[i].name}`
      );
      studentNode.appendChild(node);
      detailsDiv.appendChild(studentNode);
    }
    teacherKeySpan.textContent = data.teacher.teacherKey;
  } catch (e) {
    console.log(e);
  }
};

getTeacherDetails();
