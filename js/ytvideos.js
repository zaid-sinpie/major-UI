const submitBtn = document.querySelector("form button");
const inputs = document.querySelectorAll("form input[value='yes']");

console.log(submitBtn);
console.log(inputs);

for (let i = 0; i < inputs.length; i++) {
  if (inputs[i].value === "yes") console.log(inputs[i].checked);
}

const getNumberofYesCheckedInputs = () => {
  let num = 0;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      num++;
      console.log(inputs[i].checked);
    }
  }
  return num;
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const numberOfYes = getNumberofYesCheckedInputs();
  if (numberOfYes > 0) {
    window.location.assign("/pages/parterquizes.html");
  } else {
    window.location.assign("/pages/congrats.html");
  }
});
