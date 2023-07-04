const detailsDiv = document.querySelector(".details");

const PARENT = "PARENT";

const getParentDetails = async () => {
  const type = window.localStorage.getItem("type");
  const email = window.localStorage.getItem("email");
  const userId = window.localStorage.getItem("userId");
  const token = window.localStorage.getItem("token");
  if (!type || !userId || !token || !email)
    return window.location.assign("../pages/login.html");
  if (type != PARENT) {
    return openModal('Only parent can access this page', () => window.location.assign('../index.html'))
  }
  try {
    const response = await fetch("http://localhost:8000/api/parent/detail", {
      method: "POST",
      body: JSON.stringify({
        token,
        email,
        userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const node = document.createElement("p");
    const keyNode = document.createTextNode(
      `Parent's key: ${data.parent.parentKey}`
    );
    node.appendChild(keyNode);
    detailsDiv.appendChild(node);
    for (let i = 0; i < data.parent.children.length; i++) {
      const childNode = document.createElement("p");
      const content = document.createTextNode(
        `Name: ${data.parent.children[i].name}`
      );
      childNode.appendChild(content);
      detailsDiv.appendChild(childNode);
    }
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

getParentDetails();
