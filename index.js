const btn = document.querySelector(".call-to-action");

const STUDENT = "STUDENT";
const TEACHER = "TEACHER";
const DOCTOR = "DOCTOR";
const PARENT = "PARENT";

btn.addEventListener("click", async (e) => {
  // e.preventDefault();
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const email = window.localStorage.getItem("email");
  const type = window.localStorage.getItem("type");
  if (isLoggedIn && email && type) {
    if (type === DOCTOR) window.location.assign("/pages/docProfile.html");
    else if (type === TEACHER) window.location.assign("/pages/ytvideos.html");
    else if (type === PARENT) window.location.assign("/pages/ytvideos.html");
    else if (type === STUDENT) window.location.assign("/pages/quiz.html");
  } else {
    window.location.assign("/pages/login.html");
  }
});
