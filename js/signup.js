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
const parentKeyInput = document.querySelector("#parent-key");
const teacherKeyInput = document.querySelector("#teacher-key");

const STUDENT = "STUDENT";
const TEACHER = "TEACHER";
const DOCTOR = "DOCTOR";
const PARENT = "PARENT";
const activeClassName = "active";

const removeParentTeacherInputs = () => {
  parentKeyInput.classList.add("invisible");
  teacherKeyInput.classList.add("invisible");
};

const addParentTeacherInputs = () => {
  parentKeyInput.classList.remove("invisible");
  teacherKeyInput.classList.remove("invisible");
};

// Setting event listeners for each login type link
studentLink.addEventListener("click", function (e) {
  e.preventDefault();

  addParentTeacherInputs();
  studentLink.classList.add("active");
  teacherLink.classList.remove("active");
  doctorLink.classList.remove("active");
  parentLink.classList.remove(activeClassName);
});

teacherLink.addEventListener("click", function (e) {
  e.preventDefault();
  removeParentTeacherInputs();
  studentLink.classList.remove("active");
  doctorLink.classList.remove("active");
  teacherLink.classList.add("active");
  parentLink.classList.remove(activeClassName);
});

doctorLink.addEventListener("click", (e) => {
  e.preventDefault();
  removeParentTeacherInputs();
  studentLink.classList.remove("active");
  teacherLink.classList.remove("active");
  doctorLink.classList.add("active");
  parentLink.classList.remove(activeClassName);
});

parentLink.addEventListener("click", (e) => {
  e.preventDefault();
  removeParentTeacherInputs();
  studentLink.classList.remove(activeClassName);
  teacherLink.classList.remove(activeClassName);
  doctorLink.classList.remove(activeClassName);
  parentLink.classList.add(activeClassName);
});

const studentSubmission = async () => {
  const name = loginForm.elements["username"].value;
  const password = loginForm.elements["password"].value;
  const email = loginForm.elements["email"].value;
  const parentKey = loginForm.elements["parentKey"].value;
  const teacherKey = loginForm.elements["teacherKey"].value;

  if (!name || !password || !email || !parentKey || !teacherKey)
    alert("Fill all details");
  try {
    const respone = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
        email,
        parentKey,
        teacherKey,
        type: "STUDENT",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await respone.json();
    window.localStorage.setItem("token", data.user.token);
    window.localStorage.setItem("email", data.user.email);
    window.localStorage.setItem("name", data.user.name);
    window.localStorage.setItem("userId", data.user._id);

    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const doctorSubmission = async () => {
  const name = loginForm.elements["username"].value;
  const password = loginForm.elements["password"].value;
  const email = loginForm.elements["email"].value;

  if (!name || !password || !email) alert("Fill all details");
  try {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
        email,
        type: "DOCTOR",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    window.localStorage.setItem("token", data.user.token);
    window.localStorage.setItem("email", data.user.email);
    window.localStorage.setItem("userId", data.user._id);
    window.localStorage.setItem("name", data.user.name);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const teacherSubmission = async () => {
  const name = loginForm.elements["username"].value;
  const password = loginForm.elements["password"].value;
  const email = loginForm.elements["email"].value;

  if (!name || !password || !email) alert("Fill all details");
  try {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
        email,
        type: "TEACHER",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    window.localStorage.setItem("token", data.user.token);
    window.localStorage.setItem("email", data.user.email);
    window.localStorage.setItem("userId", data.user._id);
    window.localStorage.setItem("name", data.user.name);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const parentSubmission = async () => {
  const name = loginForm.elements["username"].value;
  const password = loginForm.elements["password"].value;
  const email = loginForm.elements["email"].value;

  if (!name || !password || !email) alert("Fill all details");
  try {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
        email,
        type: "PARENT",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    window.localStorage.setItem("token", data.user.token);
    window.localStorage.setItem("email", data.user.email);
    window.localStorage.setItem("userId", data.user._id);
    window.localStorage.setItem("name", data.user.name);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  type = "";
  if (studentLink.classList.contains(activeClassName)) studentSubmission();
  else if (doctorLink.classList.contains(activeClassName)) doctorSubmission();
  else if (teacherLink.classList.contains(activeClassName)) teacherSubmission();
  else if (parentLink.classList.contains(activeClassName)) parentSubmission();
});
