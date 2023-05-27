const submitBtn = document.querySelector("form button");

const inputs = document.querySelectorAll(
  ".question input[value='OFTEN']:checked"
);

console.log(inputs);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    document.querySelectorAll(".question input[value='OFTEN']:checked").length
  ) {
    window.location.assign("/pages/warning.html");
  } else {
    window.location.assign("/pages/congrats.html");
  }
});
