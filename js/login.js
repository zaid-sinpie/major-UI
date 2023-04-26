// Selecting HTML elements
const studentLink = document.querySelector("#student-link");
const teacherLink = document.querySelector("#teacher-link");
const doctorLink = document.querySelector("#doctor-link");
const parentLink = document.querySelector("#parent-link");
const loginForm = document.querySelector("#login-form");
const forgotPassword = document.querySelector("#forgot-password");
const loginBtn = document.querySelector("#login-btn");
const flashElement = document.getElementById("flash");

const STUDENT = "STUDENT";
const TEACHER = "TEACHER";
const DOCTOR = "DOCTOR";
const PARENT = "PARENT";
const activeClassName = "active";

// Setting event listeners for each login type link
studentLink.addEventListener("click", function (e) {
  e.preventDefault();

  studentLink.classList.add("active");
  teacherLink.classList.remove("active");
  doctorLink.classList.remove("active");
  parentLink.classList.remove(activeClassName);
});

teacherLink.addEventListener("click", function (e) {
  e.preventDefault();

  studentLink.classList.remove("active");
  doctorLink.classList.remove("active");
  teacherLink.classList.add("active");
  parentLink.classList.remove(activeClassName);
});

doctorLink.addEventListener("click", (e) => {
  e.preventDefault();

  studentLink.classList.remove("active");
  teacherLink.classList.remove("active");
  doctorLink.classList.add("active");
  parentLink.classList.remove(activeClassName);
});

parentLink.addEventListener("click", (e) => {
  e.preventDefault();

  studentLink.classList.remove(activeClassName);
  teacherLink.classList.remove(activeClassName);
  doctorLink.classList.remove(activeClassName);
  parentLink.classList.add(activeClassName);
});

const studentSubmission = async () => {
  const email = loginForm.elements["email"].value;
  const password = loginForm.elements["password"].value;
  if (!email || !password) alert("Fill all details");
  try {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const parentSubmission = async () => {
  const email = loginForm.elements["email"].value;
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (studentLink.classList.contains(activeClassName)) studentSubmission();
  else if (doctorLink.classList.contains(activeClassName)) doctorSubmission();
  else if (teacherLink.classList.contains(activeClassName)) teacherSubmission();
  else if (parentLink.classList.contains(activeClassName)) parentSubmission();
});
