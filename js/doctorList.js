const listDiv = document.querySelector(".doctor-list");

const getAllRecommendedDoctors = async () => {
  const doctorList = [];
  let i = 0;
  while (`doctor${i}` in localStorage) {
    const doctorId = localStorage.getItem(`doctor${i}`);
    const response = await fetch(
      `http://localhost:8000/api/doctor/${doctorId}`
    );
    const data = await response.json();
    const doctor = await data.doctor;
    doctorList.push(doctor);
    i++;
  }
  return doctorList;
};

const deleteAllDoctorsFromLocalStorage = () => {
  let i = 0;
  while (`doctor${i}` in localStorage) {
    localStorage.removeItem(`doctor${i}`);
  }
};

const ListOutAllDoctors = async () => {
  const doctorList = await getAllRecommendedDoctors();
  console.log(doctorList);
  for (let index = 0; index < doctorList.length; index++) {
    const element = doctorList[index];
    const doctorDiv = document.createElement("div");
    const namePara = document.createElement("p");
    const nameText = document.createTextNode(`Name: ${element.name}`);
    namePara.appendChild(nameText);
    doctorDiv.appendChild(namePara);
    const emailPara = document.createElement("p");
    const emailText = document.createTextNode(`Email: ${element.email}`);
    emailPara.appendChild(emailText);
    doctorDiv.appendChild(emailPara);
    const tagsPara = document.createElement("p");
    let tagText = "";
    for (let i = 0; i < element.tags.length; i++) {
      tagText += element.tags[i];
      if (i != element.tags.length - 1) {
        tagText += ",";
      }
    }
    tagText = document.createTextNode("Specializes in: " + tagText);
    tagsPara.appendChild(tagText);
    doctorDiv.appendChild(tagsPara);
    listDiv.appendChild(doctorDiv);
  }

  deleteAllDoctorsFromLocalStorage();
};

ListOutAllDoctors();
