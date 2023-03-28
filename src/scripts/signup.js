import { createUser, getUser, authenticationUser } from "./requests.js"


async function renderSignup(){

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
    const loginBtn = document.querySelector("#login")
    const backBtn = document.querySelector("#back_home")

    homeBtn.addEventListener("click", () => {
        window.location.replace("/")
    })

    loginBtn.addEventListener("click", () => {
        window.location.replace("/src/pages/login.html")
    })

    backBtn.addEventListener("click", (event) => {
        event.preventDefault()
        window.location.replace("/")
    })
}

function createNewUser(){

    const inputs = document.querySelectorAll(".form__container > input")
    const select = document.querySelector("#select_level")
    const button = document.querySelector("#signup")
    const newUser = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            newUser[input.name] = input.value
        })

        newUser[select.name] = select.value

        const request = await createUser(newUser)

        return request
    })
}

renderSignup()
redirectPage()
createNewUser()
