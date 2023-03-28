import { getUser,
    authenticationUser,
    getProfileInfo,
    updateUserInfo,
    getAllCoworkers,
    getDepartment } from "./requests.js"    

function logout(){

    const logoutBtn = document.querySelector("#logout")

    logoutBtn.addEventListener("click", () => {
        localStorage.clear()
        window.location.replace("/")
    })
}

async function validateUserPage(){

    const user = getUser()
    const {is_admin} = await authenticationUser()

   if(user && is_admin){
    window.location.replace("/src/pages/admin.html");
   } else if(!user){
    window.location.replace("/src/pages/login.html")
   }
}

async function renderUserInfos(){

    const userName = document.createElement("h2")
    const pencil = document.createElement("img")

    const sectionUser = document.querySelector(".section__user--details")
    const inputsModal = document.querySelectorAll(".modal__form > input")
    const userInfos = await getProfileInfo()

    const { username, email, professional_level, kind_of_work } = userInfos

    sectionUser.innerHTML = ""

    userName.innerText = username
    pencil.src = "../assets/img/editar.svg"
    pencil.alt = "Editar Informações"

    sectionUser.append(userName, pencil)

    const divInfos = createUserInfos(email, professional_level, kind_of_work)

    sectionUser.appendChild(divInfos)

    inputsModal.forEach(input => {

        if(input.name === "username"){
            input.value = username
        } else if(input.name === "email"){
            input.value = email
        } else if(input.name === "password"){
            input.value = ""
        }
    })

    renderModal()
}

function createUserInfos(email, professional_level, kind_of_work){

    const divUserInfos = document.createElement("div")
    const userEmail = document.createElement("span")
    const userLevel = document.createElement("span")
    const userWork = document.createElement("span")

    divUserInfos.classList.add("div__user--datos")
    userEmail.innerText = email
    userLevel.innerText = professional_level
    userLevel.classList.add("user__level")
    userWork.innerText = kind_of_work
    userWork.classList.add("user__work")

    divUserInfos.append(userEmail, userLevel, userWork)

    return divUserInfos
}

function renderModal(){

    const modal = document.querySelector(".modal__container")
    const pen = document.querySelector(".section__user--details > img")

    pen.addEventListener("click", () =>{
        modal.showModal()
    })

    closeModal()
}

function closeModal(){

    const modal = document.querySelector(".modal__container")
    const closeBtn = document.querySelector(".close__btn")

    closeBtn.addEventListener("click", () => {
        modal.close()
    })
}

export function editUserInfos(){

    const inputs = document.querySelectorAll(".modal__form > input")
    const editBtn = document.querySelector("#edit_profile")
    const modal = document.querySelector(".modal__container")
    const editedUser = {}

    editBtn.addEventListener("click", async (event) =>{
        event.preventDefault()

        inputs.forEach(input => {
        
            editedUser[input.name] = input.value;
        
            renderUserInfos()
        })
        
        modal.close()
        
        const request = await updateUserInfo(editedUser)
        
        return request   
    })
}

async function withOrWithoutDepartment(){

    const sectionJob = document.querySelector(".section__job--container")
    const listContainer = document.querySelector(".list__container")
    const profileLogged = await getProfileInfo()
    

    if(profileLogged.department_uuid === null){

        listContainer.style = "display: none;"

        const noDepartmentMessage = document.createElement("h2")
        noDepartmentMessage.innerText = `Você ainda não foi contratado`

        sectionJob.appendChild(noDepartmentMessage)
    }else{
        
        renderCompanyDepartmentName()
    }
}

async function renderCompanyDepartmentName(){

    const sectionJob = document.querySelector(".section__job--container")

    const companyAndDepartment = await getDepartment()
    const profileLogged = await getProfileInfo()

    const idDepartmentUser = profileLogged.department_uuid
    const companyName = companyAndDepartment.name
    const departmentsCompany = companyAndDepartment.departments

    departmentsCompany.forEach( department => {
        
        const { uuid, name } = department

        if(idDepartmentUser === uuid){

            sectionJob.insertAdjacentHTML("afterbegin", `<h3>${companyName} - ${name}</h3>`)

            renderUserCoworkers()
        }
    })
}

async function renderUserCoworkers(){

    const listCoworkers = document.querySelector(".list__container")
    const cowokers = await getAllCoworkers()
    const profileLogged = await getProfileInfo()

    const [{users}] = cowokers

    if(users.length > 1){

        users.forEach(user => {
    
            if(user.uuid !== profileLogged.uuid){
    
                const li = document.createElement("li")
                const userName = document.createElement("h4")
                const level = document.createElement("span")
    
                li.classList.add("list__item")
                userName.innerText = user.username
                level.innerText = user.professional_level
        
                li.append(userName, level)
        
                listCoworkers.appendChild(li)
            }
        })
    }else{
        listCoworkers.insertAdjacentHTML("beforeend", `<h2>Seu departamento não possui funcionários além de você</h2>`)
    }

}

logout()
validateUserPage()
renderUserInfos()
editUserInfos()
withOrWithoutDepartment()
