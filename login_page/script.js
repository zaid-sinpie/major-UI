let isLoggedIn = false;

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

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // check type of login
  type = "";
  if (studentLink.classList.contains(activeClassName)) type = STUDENT;
  else if (doctorLink.classList.contains(activeClassName)) type = DOCTOR;
  else if (teacherLink.classList.contains(activeClassName)) type = TEACHER;
  else if (parentLink.classList.contains(activeClassName)) type = PARENT;

  // get login details
  const username = loginForm.elements["username"].value;
  const password = loginForm.elements["password"].value;
  const email = loginForm.elements["email"].value;
  try {
    // sending request to backend
    const response = await fetch("http://localhost:8000/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        type,
        email,
      }),
    });

    // evaluating error/success message
    const data = await response.json();
    console.log(data);
    window.localStorage.setItem("loggedIn", true);
    window.location.replace("/");
  } catch (e) {
    console.log(e);
  }
});