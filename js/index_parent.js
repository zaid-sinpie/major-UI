const listBtn = document.querySelector(".btn");

const getChildrenDetails = async () => {
  // const id = localStorage.getItem('userId')
  const response = await fetch(
    "http://localhost:8000/api/parent/detail?token=" +
      localStorage.getItem("token"),
    {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
        userId: localStorage.getItem("userId"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  const parent = data.parent;
  const agePara = document.querySelector('.age')
  agePara.textContent = 'Age: 24'
  const namePara = document.querySelector('.name')
  namePara.textContent = 'Name: ' + parent.name;
  const parentKeyPara = document.querySelector('.parent-key')
  parentKeyPara.textContent = 'Parent Key: ' + parent.parentKey
  // return data.parent.children[0];
};
// const provideDoctorList = async () => {
//   const child = await getChildrenDetails();
//   if (child.isHealthy) {
//     openModal("You're child doesn't have any mental health issue")
//   } else {
//     window.location.assign("/pages/doctorList.html");
//   }
// };
getChildrenDetails()
// listBtn.addEventListener("click", provideDoctorList);
