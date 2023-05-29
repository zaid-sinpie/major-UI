const ageP = document.querySelector(".age");
const nameP = document.querySelector(".name");
const specialitiesP = document.querySelector(".specialities");
const ratingP = document.querySelector(".rating");
const treatedP = document.querySelector(".no_of_patients");
const appointBtn = document.querySelector(".btn");

const getDoctor = async () => {
  const urlString = window.location.href.toLowerCase();
  const url = new URL(urlString);
  const id = url.searchParams.get("id");
  console.log(id);
  const response = await fetch("http://localhost:8000/api/doctor/" + id);
  const data = await response.json();
  console.log(data);
  return data.doctor;
};

displayDoctor = async () => {
  const data = await getDoctor();
  nameP.textContent = `Name: ${data.name}`;
  ageP.textContent = `Age: ${data.age || 12}`;
  let specialities = "";
  for (let i = 0; i < data.tags.length; i++) {
    specialities += data.tags[i];
    if (i != data.tags.length - 1) specialities += ",";
  }
  specialitiesP.textContent = `Specialities: ${specialities}`;
  const numberOfPatientsTreated = Math.floor(Math.random() * 200);
  treatedP.textContent = `Number of patients operated: ${
    numberOfPatientsTreated > 100 ? "100+" : numberOfPatientsTreated
  }`;
  const rating = (Math.random() * 5 + 1).toFixed(1);
  ratingP.textContent = `Rating: ${rating}`;
  if (localStorage.getItem("type") === "DOCTOR")
    appointBtn.classList.add("invisible");
};

displayDoctor();
