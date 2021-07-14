const username = document.getElementById("username");
const error = document.getElementById("error");
const result = document.getElementById("result");
const form = document.querySelector("#form");
const token = localStorage.getItem("token");
window.addEventListener("load", async () => {
  console.log("loaded");

  username.innerHTML = localStorage.getItem("username");
  //   const loginButton = document.getElementById("login");

  const url_postCategory =
    "https://stocka-zuri-api.herokuapp.com/api/category/";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    const data = {
      name: category,
      description: description,
    };

    console.log("working");

    await postCategory(url_postCategory, data); // await repsonse since it takes some time to get data.
  });
  // const login = document.getElementsByTagName('login');
});
async function postCategory(url = "", post_data = {}) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
     "Authorization": "Bearer " + token,
    },
    body: JSON.stringify(post_data),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.status_code === 401) {
        console.log("Unauthorize");
        error.innerHTML = "Unauthorize: Token may have expired. Login";
      } else if (response.status_code === 400) {
          console.log("Unauthorize");
        error.innerHTML = "Conflicts: Category already exist. Try another";
      } else {
          error.style.color = "green";
        error.innerHTML = "success posting category. Try another :-)";
      }
    })
    .catch((error) => console.log(error));

  //   return response.json();
}