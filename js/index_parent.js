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
  return data.parent.children[0];
};
const provideDoctorList = async () => {
  const child = await getChildrenDetails();
  if (child.isHealthy) {
    openModal("You're child doesn't have any mental health issue")
  } else {
    window.location.assign("/pages/doctorList.html");
  }
};

listBtn.addEventListener("click", provideDoctorList);
