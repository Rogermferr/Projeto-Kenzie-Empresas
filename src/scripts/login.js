import { loginUser, getUser, authenticationUser } from "./requests.js"

async function renderLogin(){

  const user = getUser()
  
    if(user){
      const {is_admin} = await authenticationUser()

      if(user && !is_admin){
      window.location.replace("/src/pages/user.html")
      } else if(user){
      window.location.replace("/src/pages/admin.html")
      } 
  }
}


function redirectPage(){

    const homeBtn = document.querySelector("#home")
    const signupBtn = document.querySelector("#signup")
    const backBtn = document.querySelector("#back_signup")

    homeBtn.addEventListener("click", () => {
      window.location.replace("/")
    })

    signupBtn.addEventListener("click", () => {
      window.location.replace("/src/pages/signup.html")
    })

    backBtn.addEventListener("click", (event) => {
      event.preventDefault()
      window.location.replace("/src/pages/signup.html")
    })
}

function login(){

  const inputs = document.querySelectorAll(".form__container > input");
  const button = document.querySelector("#login");
  const user = {};

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    inputs.forEach((input) => {
      user[input.name] = input.value;
    });

    const request = await loginUser(user);

    if(!request.error){

      localStorage.setItem("@kenzieEnterprises:userToken", JSON.stringify(request));
    }

  })
}

renderLogin()
login()
redirectPage()