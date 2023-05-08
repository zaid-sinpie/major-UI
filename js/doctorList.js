let doctorsList = {};

const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

const displayProfiles = () => {
  if (isObjectEmpty(doctorsList)) {
    return alert("Give the test first");
  }
  for (let i = 0; i < doctorsList.length; i++) {
    const element = document.createElement("div");
    const nameElement = document.createElement("p");
    const text = document.createTextNode(`Name: ${doctorsList[i].name}`);
    nameElement.appendChild(text);
  }
};
