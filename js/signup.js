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
const signUpBtn = document.querySelector("#signup-form-submit-btn");
const tagInput = document.querySelector("#tag");
const genderInput = document.querySelector("#gender");

const STUDENT = "STUDENT";
const TEACHER = "TEACHER";
const DOCTOR = "DOCTOR";
const PARENT = "PARENT";
const activeClassName = "active";

const removeParentTeacherInputs = () => {
  parentKeyInput.classList.add("invisible");
  teacherKeyInput.classList.add("invisible");
  tagInput.classList.remove("invisible");
  genderInput.classList.remove("invisible");
};

const addParentTeacherInputs = () => {
  parentKeyInput.classList.remove("invisible");
  teacherKeyInput.classList.remove("invisible");
  tagInput.classList.add("invisible");
  genderInput.classList.add("invisible");
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
  doctorLink.classList.add(activeClassName);
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
    window.localStorage.setItem("type", STUDENT);
    window.location.assign("/pages/quiz.html");
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const doctorSubmission = async () => {
  const name = loginForm.elements["username"].value;
  const password = loginForm.elements["password"].value;
  const email = loginForm.elements["email"].value;
  const tags = loginForm.elements["tags"].value.split(",");
  const gender = loginForm.elements["gender"].value;

  if (!name || !password || !email) alert("Fill all details");
  try {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
        email,
        type: "DOCTOR",
        tags,
        gender,
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
    window.localStorage.setItem("type", DOCTOR);
    window.location.assign("/pages/docProfile.html");
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
    window.localStorage.setItem("type", TEACHER);
    console.log(data);
    window.location.assign("/pages/ytvideos.html");
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
    if (response.status != 200) return alert("Wrong details");
    window.localStorage.setItem("token", data.user.token);
    window.localStorage.setItem("email", data.user.email);
    window.localStorage.setItem("userId", data.user._id);
    window.localStorage.setItem("name", data.user.name);
    window.localStorage.setItem("type", PARENT);
    console.log(data);
    window.location.assign("/pages/ytvideos.html");
  } catch (e) {
    console.log(e);
  }
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  type = "";
  if (studentLink.classList.contains(activeClassName)) studentSubmission();
  else if (doctorLink.classList.contains(activeClassName)) doctorSubmission();
  else if (teacherLink.classList.contains(activeClassName)) teacherSubmission();
  else if (parentLink.classList.contains(activeClassName)) parentSubmission();
});

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (studentLink.classList.contains(activeClassName)) studentSubmission();
  else if (doctorLink.classList.contains(activeClassName)) doctorSubmission();
  else if (teacherLink.classList.contains(activeClassName)) teacherSubmission();
  else if (parentLink.classList.contains(activeClassName)) parentSubmission();
});
